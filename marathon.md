---
title: Marathon 2025
pagetitle: How to Run an Above Average Marathon
description: Marathon training plan, and personal success tips
keywords: Marathon, running, data science, analytics
author: Jordan Barker
toc: true
---

## Goal
In January 2025, I set out to run a marathon. Then the competative side of me kicked in, and I upped the goal to be *above average*.
I defined that formally as being in the top 50% of male runners. Luckily, [Madison Marathon](https://madisonmarathon.org/) publishes past results online so I was able to generate some summary statistics to narrow in on the target.

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

I've used Garmin's built-in coaching tools in the past, but the max distance for a race is a half-marathon, so I needed to improvise. There are [plenty](https://www.halhigdon.com/training/marathon-training/) [of](https://marathonhandbook.com/trainingplans/marathon-training-plans/) [great](https://www.mymottiv.com/marathon-training-plan) marathon training plans online, but I wanted more autonomy and adaptability. 

### Limitations

It's useful to note the biggest downsides of using an AI coach compared to what an expert human coach could provide.

1. They 

### Data

I built my own coaching tool by gathering marathon training articles and papers to give an LLM the latest context. With that primer, I passed it my latest running data and got personalized workouts.  

:::{.note}
Weeks until marathon: 2
VO₂ Max (Running): 58
Lactate Threshold Pace (min:sec/mi): 7:36
Lactate Threshold HR: 174

Current estimated race paces:
| Race         | Est. Race Pace   | Est. Race Time   |
|--------------|------------------|------------------|
| 5K           | 6:29             | 0:20:08          |
| 10K          | 6:54             | 0:42:53          |
| HalfMarathon | 7:15             | 1:35:06          |
| Marathon     | 7:58             | 3:28:46          |

Weekly mileage for the last 12 weeks:
| week_start   | week_end   |   mileage |   z1_min |   z2_min |   z3_min |   z4_min |   z5_min |   rolling_avg |   pct_change |
|--------------|------------|-----------|----------|----------|----------|----------|----------|---------------|--------------|
| 2025-07-28   | 2025-08-03 |     48.97 |    24.74 |   132.89 |   181.87 |    99.38 |     5.86 |        nan    |       nan    |
| 2025-08-04   | 2025-08-10 |     63.55 |    39.07 |   193.68 |   272.68 |    96.98 |     1.7  |         56.26 |        29.77 |
| 2025-08-11   | 2025-08-17 |     60.23 |    53.5  |   239.87 |   179.64 |   101.04 |     2.48 |         61.89 |        -5.22 |
| 2025-08-18   | 2025-08-24 |     54.59 |    57.56 |   192.19 |   180.64 |    74.45 |     4.53 |         57.41 |        -9.36 |
| 2025-08-25   | 2025-08-31 |     41.22 |    27.56 |   108.71 |   189.06 |    44.9  |     0    |         47.9  |       -24.49 |
| 2025-09-01   | 2025-09-07 |     13.08 |    50.95 |    28.96 |    38.9  |    12.13 |     0    |         27.15 |       -68.27 |
| 2025-09-08   | 2025-09-14 |     15.81 |    21.13 |    50.54 |    55.59 |    33.19 |     0    |         14.44 |        20.87 |
| 2025-09-15   | 2025-09-21 |     22.13 |    63.81 |    82.61 |    79.21 |     8.33 |     0    |         18.97 |        39.97 |
| 2025-09-22   | 2025-09-28 |     30.43 |    42.25 |    88.62 |   159.35 |     1.33 |     0    |         26.28 |        37.51 |
| 2025-09-29   | 2025-10-05 |     41.52 |    47.68 |   143    |   182.8  |    23.1  |     5.85 |         35.98 |        36.44 |
| 2025-10-06   | 2025-10-12 |     43.66 |    23.96 |   187.84 |   152.41 |    37.3  |     0    |         42.59 |         5.15 |
| 2025-10-13   | 2025-10-19 |     44.4  |    43.68 |   181.39 |   138.66 |    42.37 |     0    |         44.03 |         1.69 |

Daily mileage for the last 2 weeks:
| date       |   mileage |   z1_min |   z2_min |   z3_min |   z4_min |   z5_min |
|------------|-----------|----------|----------|----------|----------|----------|
| 2025-10-09 |      7.19 |     6    |    41.33 |    21    |     0    |        0 |
| 2025-10-10 |     10.03 |     6.88 |    38.15 |    15.82 |    29.02 |        0 |
| 2025-10-11 |      5.5  |     2.03 |    42.62 |     9.43 |     0    |        0 |
| 2025-10-12 |     15.69 |     0.57 |    22.45 |   101.96 |     8.28 |        0 |
| 2025-10-13 |      1.05 |     5.07 |     7.9  |     0.25 |     0    |        0 |
| 2025-10-14 |     13.48 |     0.96 |    14.27 |    58.77 |    35.46 |        0 |
| 2025-10-15 |      1.01 |     8.11 |     4.05 |     0    |     0    |        0 |
| 2025-10-16 |      9.37 |    16.27 |    37.44 |    32.02 |     1.35 |        0 |
| 2025-10-17 |      4.16 |     4.77 |     5.33 |    21.45 |     5.56 |        0 |
| 2025-10-18 |     14.21 |     6.4  |   101.74 |    24.55 |     0    |        0 |
| 2025-10-19 |      1.12 |     2.1  |    10.66 |     1.62 |     0    |        0 |
| 2025-10-20 |      6.85 |     5.11 |    15.84 |    43.6  |     0    |        0 |
| 2025-10-21 |      7.71 |     2.4  |    42.65 |    27.24 |     0    |        0 |
:::

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

Expensive and completely optional, carbon-fiber plated shoes can give a 2–3% improvement on race time. Unfortunately, they don't last as long as standard shoes. The "pop" diminishes after about 100 to 140 miles so you need to be strategic about breaking them in. Due to the durability limitations, it's generally advised to just wear them for marathon-pace efforts about 4 weeks prior to the race, as well as a long distance run (>10 miles) two weeks prior to the race.

I ended up opting out on carbon plates since I was already ahead of my goal, and the improvement wouldn't have made enough of a difference for me.

## Diet {#diet}

The best marathoners train their gut as much as their legs. Consider practicing run nutrition for any runs longer than 75 mins. It increases recovery, delays fatigue, improves GI distress, and helps with training adaptations.  

Natural sources and commercial products both work well. Both can cause GI discomfort, and both should be incorporated at easy efforts and hard efforts multiple times. Natural sources (dates, bananas, applesauce) can be more challenging to carry, so is it realistic outside of training? 

Practice your long run pre-fueling strategy. Find something for almost all long runs and use it pre-marathon. Do not change this fueling strategy on the day of the race.  

### Carbs

The goal is to be able to consume 90+ grams of carbohydrates per hour. To accomplish this, you can use a mix of glucose and fructose. 

> There is no optimal ratio. The ratio that is optimal will change depending on amounts ingested. If 90 g/h is ingested it should be around 2:1, but if more is ingested, for example 120 g/h, 1:1 is likely better.
> [https://www.mysportscience.com/post/the-optimal-ratio-of-carbohydrates]

Transporters: Glucose uses SGLT1; fructose uses GLUT5. 

The carbs are typically a mix of glucose and fructose in roughly a 2:1 ratio. I started training with plain old granulated sugar, which has a 1:1 ratio. 

"Similar metabolic effects can be achieved via the ingestion of sucrose [...] because intestinal absorption is unlikely to be limited by sucrose hydrolysis." [https://www.mdpi.com/2072-6643/9/4/344]

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
| Fructose (powder)                | 0:1              | Use to balance mixes toward targeted ratios.                                           |

### Electrolytes {#electrolytes}
This is largely individual dependent as well as race conditions. I targeted 600 mg of sodium per hour and made my electrolyte mix at home following [LMNT's recipe](https://drinklmnt.com/pages/ingredients#facts):

- 2,500 mg sodium chloride (for 1,000 mg sodium)  
- 385 mg potassium chloride (for 200 mg potassium)  
- 390 mg magnesium malate **or** 265 mg di-magnesium malate (for 60 mg magnesium)  

### Hydration {#hydration}
For water intake, “drink to thirst” will usually suffice. If you want to get more precise, cooler conditions call for ~0.4 L/h, while hot weather is about ~0.8 L/h or more.

### Pre-Race & Race Nutrition

- **Day Before:** Normal meals that are carb-rich (noodles, rice, potatoes).  
- **Night Before:** Bagels + peanut butter & honey, 1–2 bananas, large sports drink like Powerade.  
- **3 Hours Before:** 1–2 bagels with light PB *or* large muffin.  
- **45 Minutes Before:** Honey Stinger waffle or granola bar (familiar fuel that has been used on runs).  
- **10–15 Minutes Before:** 40g caffeinated gel.  
- **During Race (every 5K or so):** ~25g of carbs  

## Injuries

Running injuries are extremely common in marathon runners. Higher training volumes generally increases the injury risk among runners with amateuers being more susceptible to injuries as they increase mileage and are less likely to follow proper a strength training program.

> "Out of 300 runners, 126 (42%) reported at least one injury during the training period. 
> The most common injuries included medial tibial stress syndrome (24%), iliotibial band syndrome (19%), and plantar fasciitis (15%). 
> Injury incidence was significantly higher in runners exceeding 50 km/week without strength training (p=0.03). 
> Participants who followed structured warm-up and strength training routines had a 35% lower injury rate (p=0.01). 
> Footwear replacement within 500-700 km was associated with reduced injury occurrence (p=0.04)."
> <div class="source"> [Injury Incidence and Prevention Strategies Among Amateur Marathon Runners: A Prospective Cohort Study](https://www.icr-heart.com/article/injury-incidence-and-prevention-strategies-among-amateur-marathon-runners-a-prospective-cohort-study-2510/#:~:text=analysis%20included%20chi,marathon%20runners%20are%20at%20a) </div>

> 9 out of 10 reported a running related injury or illness symptom at some time during the 16-week study period (n = 161)
> <div class="source"> [Running Themselves Into the Ground? Incidence, Prevalence, and Impact of Injury and Illness in Runners Preparing for a Half or Full Marathon](https://pubmed.ncbi.nlm.nih.gov/31213161/#:~:text=Results%3A%20%20Of%20the%20161,of%20illness%20symptoms%20peaked%20at) </div>

> Running-related injuries were reported in 53.6% (n = 28) of elite runners and 34.6% of recreational runners (n = 254)
> <div class="source"> [Exploring the Relationship between Running-Related Technology Use and Running-Related Injuries: A Cross-Sectional Study of Recreational and Elite Long-Distance Runners](https://pmc.ncbi.nlm.nih.gov/articles/PMC10970008/#sec3-healthcare-12-00642) </div>

> 75% of elite marathon runners reported running-related musculoskeletal pain in the last 12 months (n = 199)
> <div class="source"> [PREVALENCE OF MUSCULOSKELETAL PAIN IN MARATHON RUNNERS WHO COMPETE AT THE ELITE LEVEL](https://pubmed.ncbi.nlm.nih.gov/26900507/#:~:text=presence%2C%20location%20and%20intensity%20of,musculoskeletal%20pain) </div>