---
title: ""
date: "December 31, 2025"
description: Receiver fan automation project
keywords: AVR, receiver, fan, hack, DIY
author: Jordan Barker
---


## Intro

I recently picked up a beautiful Denon X4500H receiver that someone was selling locally to control my home theater setup. I am in awe of this machine after only using receivers made in the 90's. It should last me a very long time, assuming it is kept in good condition. One of the biggest causes of failure in a receiver is **overheating**, and my receiver sits inside my closed TV console drawer. This is a common setup, but a recipe for disaster.

Luckily my TV console has some holes in the bottom and back side so air can flow, but the drawer was still reaching temps over 80°F after a few hours of usage. Although that is a reasonable temperature, this made me uncomfortable. It's winter currently and could get much warmer in the summer or heat could build up after longer usage.

## Solution

There are several possible ways to go about fixing this. The most obvious is to move the receiver out of the TV console. It could go on top of the TV console, but aesthetically this was a no-go. Then I remembered I have an old Raspberry Pi 3 with a [temperature sensor](https://www.amazon.com/dp/B073F472JL) from a past project. I also extra PC fans laying around, surely the Pi could control those, right? As it turns out, not really. The fans [ARCTIC P14 Pro PST](https://www.amazon.com/dp/B0DPX94PSL) are 12 volts, and the Pi GPIO pins are 3.3V, so they can't directly drive a 12V fan's power/current. I'd need an intermediary circuit to power them.

In the process, I found that the fans could be powered by wiring them with an old power supply [like this](https://www.sparkfun.com/wall-adapter-power-supply-5vdc-2a-barrel-jack.html). Just cut-off the barrel jack to expose the wires, use a multimeter to confirm the positive and negative wires, then twist the bare wires together and screw on a wire nut to secure them. I had 3 fans rated at ~0.35A each, so I just had to make sure the power supply was rated greater than 1.05A. 

Now we have airflow! This was a good start since the fan only use 12w in total. Some quick math shows that this will cost about $23.13 to run this 24/7 for a full year at 22¢/kWh.

$$ 0.012 \text{ kW} * 8,760 \text{ hours/year} = 105.12 \text{ kWh/year} $$

$$ 105.12 * \$0.22 = \$23.13 \text{ /year} $$

Beyond that, the biggest downside is the subtle noise that can be heard when the speakers are not playing anything so I wasn't fully satisfied. 

After some more researching I found that the receiver has a 3.5mm 12v TRIGGER OUT port! With this, we can plug the fans into a [power relay](https://www.amazon.com/dp/B00WV7GMA2?ref=ppx_yo2ov_dt_b_fed_asin_title) that only provides power when the 12v signal is passed on. I picked up a two pack of [3.5mm Male Jack to Bare Wire](https://www.amazon.com/dp/B0BVQ21L6D?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1) cables for $8 to connect the receiver to the power relay.

## Result

The raspberry pi was pulled out of retirement to gather data. How can you confirm anything changed without data?


<!-- Convert to html -->
<!-- pandoc receiver_fan_hack.md -o receiver_fan_hack.html -s --section-divs --template=pandoc_template.html --mathjax -->
