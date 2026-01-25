var deepqlearn = deepqlearn || { REVISION: 'ALPHA' };

(function(global) {
  "use strict";
  
  // An agent is in state0 and does action0
  // environment then assigns reward0 and provides new state, state1
  // Experience nodes store all this information, which is used in the
  // Q-learning update step
  class Experience {
    constructor(state0, action0, reward0, state1) {
      this.state0 = state0;
      this.action0 = action0;
      this.reward0 = reward0;
      this.state1 = state1;
    }
  }

  // A Brain object does all the magic.
  // over time it receives some inputs and some rewards
  // and its job is to set the outputs to maximize the expected reward
  class Brain {
    constructor(num_states, num_actions, opt = {}) {
      // in number of time steps, of temporal memory
      // the ACTUAL input to the net will be (x,a) temporal_window times, and followed by current x
      // so to have no information from previous time step going into value function, set to 0.
      this.temporal_window = opt.temporal_window ?? 1;                  // size of experience replay memory
      this.experience_size = opt.experience_size ?? 30000;              // number of examples in experience replay memory before we begin learning
      this.start_learn_threshold = opt.start_learn_threshold ?? Math.floor(Math.min(this.experience_size * 0.1, 1000));
      this.gamma = opt.gamma ?? 0.8;
      this.learning_steps_total = opt.learning_steps_total ?? 100000;   // number of steps we will learn for
      this.learning_steps_burnin = opt.learning_steps_burnin ?? 3000;   // how many steps of the above to perform only random actions (in the beginning)?
      this.epsilon_min = opt.epsilon_min ?? 0.05;                       // what epsilon value do we bottom out on? 0.0 => purely deterministic policy at end
      this.epsilon_test_time = opt.epsilon_test_time ?? 0.01;           // what epsilon to use at test time? (i.e. when learning is disabled)
      this.random_action_distribution = opt.random_action_distribution ?? [];
      
      // advanced feature. Sometimes a random action should be biased towards some values
      // for example in flappy bird, we may want to choose to not flap more often
      if (this.random_action_distribution.length && this.random_action_distribution.length !== num_actions) {
        throw new Error('random_action_distribution should be same length as num_actions.');
      }

      if (this.random_action_distribution.length) {
        const sum = this.random_action_distribution.reduce((a, b) => a + b, 0);
        if (Math.abs(sum - 1.0) > 0.0001) {
          throw new Error('random_action_distribution should sum to 1!');
        }
      }
      
      // states that go into neural net to predict optimal action look as
      // x0,a0,x1,a1,x2,a2,...xt
      // this variable controls the size of that temporal window. Actions are
      // encoded as 1-of-k hot vectors
      this.net_inputs = num_states * this.temporal_window + num_actions * this.temporal_window + num_states;
      this.num_states = num_states;
      this.num_actions = num_actions;
      this.window_size = Math.max(this.temporal_window, 2); // must be at least 2, but if we want more context even more
      this.state_window = new Array(this.window_size);
      this.action_window = new Array(this.window_size);
      this.reward_window = new Array(this.window_size);
      this.net_window = new Array(this.window_size);
      
      // create [state -> value of all possible actions] modeling net for the value function
      // Define layers for the network
      let layer_defs = opt.layer_defs || [
        { type: 'input', out_sx: 1, out_sy: 1, out_depth: this.net_inputs },
        ...((opt.hidden_layer_sizes ?? []).map(size => ({ type: 'fc', num_neurons: size, activation: 'relu' }))),
        { type: 'regression', num_neurons: num_actions }
      ];

      if (layer_defs[0].type !== 'input' || layer_defs[layer_defs.length - 1].type !== 'regression') {
        throw new Error('First layer must be input layer and last layer must be regression!');
      }

      if (layer_defs[0].out_depth !== this.net_inputs) {
        throw new Error('Number of inputs must be num_states * temporal_window + num_actions * temporal_window + num_states!');
      }

      if (layer_defs[layer_defs.length - 1].num_neurons !== num_actions) {
        throw new Error('Number of regression neurons should be num_actions!');
      }

      this.value_net = new convnetjs.Net();
      this.value_net.makeLayers(layer_defs);
      
      // and finally we need a Temporal Difference Learning trainer!
      const tdtrainer_options = { learning_rate: 0.01, momentum: 0.0, batch_size: 64, l2_decay: 0.01, ...opt.tdtrainer_options };
      this.tdtrainer = new convnetjs.SGDTrainer(this.value_net, tdtrainer_options);
      
      // experience replay
      this.experience = [];
      
      // various housekeeping variables
      this.age = 0; // incremented every backward()
      this.forward_passes = 0; // incremented every forward()
      this.epsilon = 1.0; // controls exploration exploitation tradeoff. Should be annealed over time
      this.latest_reward = 0;
      this.last_input_array = [];
      this.average_reward_window = new cnnutil.Window(1000, 10);
      this.average_loss_window = new cnnutil.Window(1000, 10);
      this.learning = true;
    } 
    random_action() {
      if (this.random_action_distribution.length === 0) {
        return convnetjs.randi(0, this.num_actions);
      } else {
        const p = convnetjs.randf(0, 1.0);
        let cumprob = 0.0;
        for (let k = 0; k < this.num_actions; k++) {
          cumprob += this.random_action_distribution[k];
          if (p < cumprob) return k;
        }
      }
    }

    policy(s) {
      // compute the value of doing any action in this state
      // and return the argmax action and its value

      const svol = new convnetjs.Vol(1, 1, this.net_inputs);
      svol.w = s;
      const action_values = this.value_net.forward(svol);
      let maxk = 0, maxval = action_values.w[0];
      for (let k = 1; k < this.num_actions; k++) {
        if (action_values.w[k] > maxval) { maxk = k; maxval = action_values.w[k]; }
      }
      return { action: maxk, value: maxval };
    }
    
    getNetInput(xt) {
      let w = [...xt];
      for (let k = 0; k < this.temporal_window; k++) {
        w = w.concat(this.state_window[this.window_size - 1 - k]);
        const action1ofk = new Array(this.num_actions).fill(0.0);
        action1ofk[this.action_window[this.window_size - 1 - k]] = 1.0 * this.num_states;
        w = w.concat(action1ofk);
      }
      return w;
    }
    
    forward(input_array) {
      this.forward_passes++;
      this.last_input_array = input_array;

      let action;
      if (this.forward_passes > this.temporal_window) {
        const net_input = this.getNetInput(input_array);
        if (this.learning) {
          this.epsilon = Math.min(1.0, Math.max(this.epsilon_min, 1.0 - (this.age - this.learning_steps_burnin) / (this.learning_steps_total - this.learning_steps_burnin)));
        } else {
          this.epsilon = this.epsilon_test_time;
        }
        action = (convnetjs.randf(0, 1) < this.epsilon) ? this.random_action() : this.policy(net_input).action;
      } else {
        action = this.random_action();
      }

      this.net_window.shift();
      this.net_window.push(this.getNetInput(input_array));
      this.state_window.shift();
      this.state_window.push(input_array);
      this.action_window.shift();
      this.action_window.push(action);

      return action;
    }

    backward(reward) {
      this.latest_reward = reward;
      this.average_reward_window.add(reward);
      this.reward_window.shift();
      this.reward_window.push(reward);

      if (!this.learning) return;

      this.age++;
      if (this.forward_passes > this.temporal_window + 1) {
        const e = new Experience(this.net_window[this.window_size - 2], this.action_window[this.window_size - 2], this.reward_window[this.window_size - 2], this.net_window[this.window_size - 1]);
        if (this.experience.length < this.experience_size) {
          this.experience.push(e);
        } else {
          this.experience[convnetjs.randi(0, this.experience_size)] = e;
        }
      }

      if (this.experience.length > this.start_learn_threshold) {
        let avcost = 0.0;
        for (let k = 0; k < this.tdtrainer.batch_size; k++) {
          const re = convnetjs.randi(0, this.experience.length);
          const e = this.experience[re];
          const x = new convnetjs.Vol(1, 1, this.net_inputs);
          x.w = e.state0;
          const maxact = this.policy(e.state1);
          const r = e.reward0 + this.gamma * maxact.value;
          const ystruct = { dim: e.action0, val: r };
          const loss = this.tdtrainer.train(x, ystruct);
          avcost += loss.loss;
        }
        avcost /= this.tdtrainer.batch_size;
        this.average_loss_window.add(avcost);
      }
    }

    visSelf(elt) {
      elt.innerHTML = ''; // Clear the element first
      const brainvis = document.createElement('div');
      const desc = document.createElement('div');
      desc.innerHTML = `
        experience replay size: ${this.experience.length}<br>
        exploration epsilon: ${this.epsilon}<br>
        age: ${this.age}<br>
        average Q-learning loss: ${this.average_loss_window.get_average()}<br>
        smooth-ish reward: ${this.average_reward_window.get_average()}<br>
      `;
      brainvis.appendChild(desc);
      elt.appendChild(brainvis);
    }
}

global.Brain = Brain;
})(deepqlearn);

(function(lib) {
  "use strict";
  if (typeof module === "undefined" || typeof module.exports === "undefined") {
    window.deepqlearn = lib; // In ordinary browser attach library to window
  } else {
    module.exports = lib; // In Node.js
}
})(deepqlearn);