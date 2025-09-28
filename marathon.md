---
title: Marathon 2025
pagetitle: How to Run an Above Average Marathon
description: Marathon training plan, and personal success tips
keywords: Marathon, running, data science, analytics
author: Jordan Barker
toc: true
---

## Goal

I set out to run an above average marathon. I defined that as being in the top 50% of male runners, and luckily, [Madison Marathon](https://madisonmarathon.org/) publishes past results online, so I was able to scrap this and generate some summary statistics to narrow in on the target.

<div class="table-title">
Male Runner Results — 2024 Madison Marathon
</div>

| Time Bracket | Number of Runners | Percentage |
|--------------|-------------------|------------|
| Sub-3:00     | 71                | 5.8%       |
| Sub-3:30     | 233               | 19.1%      |
| Sub-4:00     | 519               | 42.5%      |
| Sub-4:30     | 827               | 67.7%      |
| Sub-5:00     | 1,018             | 83.3%      |

## AI Coach

I've used Garmin's built-in coaching tools in the past, but the max distance for a race is a half-marathon, so I needed to look elsewhere.  

I built my own coaching tool by gathering marathon training articles and papers to give an LLM the latest context. With that primer, I passed it my latest running data and got personalized workouts.  

Here is an example of a workout that was generated through this process:

![AI generated workout plan for Sunday](Assets/marathon/sunday_workout.png)  

## Shoes {#shoes}

Here is my running shoe history for the year:

1. Fresh Foam 680v8 for $68.56, retired at 688.7 miles  
2. Fresh Foam 680v8 for $63.99, retired at 442.4 miles  
3. Fresh Foam X Kaiha Road for $83.69  

The typical recommendation is to retire shoes after 300–500 miles. You can still get use out of older shoes, but the risk of injury increases. My second pair of shoes were retired 250 miles sooner than the previous pair due to a shin splint injury.  

[RunRepeat.com's blog on shoes for shin splints](https://runrepeat.com/guides/best-shin-splints-running-shoes#shin-splints-and-running)

### Carbon Plates

Expensive and completely optional, I opted for race shoes that had carbon-fiber plates to get the 2–3% improvement on race time. Unfortunately, they don't last as long as standard shoes. The "pop" diminishes after about 100 to 140 miles so you need to be strategic about breaking them in. I utilized them for some marathon-pace efforts about 4 weeks prior to the race, as well as a long distance run (>10 miles) two weeks prior to the race.  


## Diet {#diet}

Elite marathoners train their gut as much as their legs. The goal is to be able to consume 60–90+ grams of carbohydrates per hour.

Consider run nutrition for anything above 75 mins. It increases recovery, delays fatigue, improves GI distress, and helps with training adaptations.  

Natural sources and commercial products both work well. Both can cause GI discomfort, and both should be incorporated at easy efforts and hard efforts multiple times. Natural sources can be more challenging to carry, so is it realistic outside of training? Dates, bananas, applesauce.  

Practice your long run pre-fueling strategy. Find something for almost all long runs and use it pre-marathon. Do not change this fueling strategy on the day of the race.  

### Hydration {#hydration}
For water intake, “drink to thirst” will usually suffice. If you want to get more precise, cooler conditions call for ~0.4 L/h, while hot weather is about ~0.8 L/h or more.

### Electrolytes {#electrolytes}
This is largely individual dependent as well as race conditions. I targeted 600 mg of sodium per hour and made my electrolyte mix at home following [LMNT's recipe](https://drinklmnt.com/pages/ingredients#facts):

- 2,500 mg sodium chloride (for 1,000 mg sodium)  
- 385 mg potassium chloride (for 200 mg potassium)  
- 390 mg magnesium malate **or** 265 mg di-magnesium malate (for 60 mg magnesium)  

### Carbs

The carbs are typically a mix of glucose and fructose in roughly a 2:1 ratio. I started training with plain old granulated sugar, which has a 1:1 ratio.

I made my own running gel/juice to get 90g/hr. I added 60g granulated sugar + 30g maltodextrin and added water as needed. I prefer a more watery mix than normal gels. I also typically add 100mg of caffeine and 200mg of l-theanine and electrolytes like LMNT.  

<div class="table-title">
  Glucose:Fructose Profile of Common Sweeteners
</div>

| Sweetener                        | Approx G:F Ratio | Notes                                                                                  |
|----------------------------------|------------------|----------------------------------------------------------------------------------------|
| Sucrose (table/white/brown sugar)| 1:1              | Splits to equal glucose and fructose.                                                  |
| Maple syrup                      | 1:1              | Minor free glucose/fructose; effectively 1:1 after digestion.                          |
| Honey                            | 0.6–1:1          | Varies by floral source; often fructose-heavy.                                         |
| Agave syrup                      | 0.2–0.7:1        | Brand/process dependent.                                                               |
| High-fructose corn syrup         | 0.8–1.4:1        | "HFCS 42" and "HFCS 55" refer to fructose compositions of 42% and 55% respectively.    |
| Corn syrup / Brown rice syrup    | 1:0              | Essentially no fructose; use as the “glucose side.”                                    |
| Maltodextrin                     | 1:0              | Low osmolality vs simple sugars; great for bottles.                                    |
| Dextrose                         | 1:0              | Pure glucose; fast transporter (SGLT1).                                                |
| Fructose (powder)                | 0:1              | Use to balance mixes toward targeted ratios.                                           |


### Pre-Race & Race Nutrition

- **Day Before:** Normal meals that are carb-rich (noodles, rice, potatoes).  
- **Night Before:** Bagels + peanut butter & honey, 1–2 bananas, large sports drink like Powerade.  
- **3 Hours Before:** 1–2 bagels with light PB *or* large muffin.  
- **45 Minutes Before:** Honey Stinger waffle or granola bar (familiar fuel that has been used on runs).  
- **10–15 Minutes Before:** 40g caffeinated gel.  
- **During Race (every 5K or so):** ~25g of carbs  


## Injuries
> "Out of 300 runners, 126 (42%) reported at least one injury during the training period. 
> The most common injuries included medial tibial stress syndrome (24%), iliotibial band syndrome (19%), and plantar fasciitis (15%). 
> Injury incidence was significantly higher in runners exceeding 50 km/week without strength training (p=0.03). 
> Participants who followed structured warm-up and strength training routines had a 35% lower injury rate (p=0.01). 
> Footwear replacement within 500-700 km was associated with reduced injury occurrence (p=0.04)."
> <div class="source"> [Injury Incidence and Prevention Strategies Among Amateur Marathon Runners: A Prospective Cohort Study](https://www.icr-heart.com/article/injury-incidence-and-prevention-strategies-among-amateur-marathon-runners-a-prospective-cohort-study-2510/#:~:text=analysis%20included%20chi,marathon%20runners%20are%20at%20a) </div>