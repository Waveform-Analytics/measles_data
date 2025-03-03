---
theme: [air, alt]
toc: false
---

<style>
.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.key-points {
  background-color: #f8f9fa;
  border-left: 4px solid #0d6efd;
  border-radius: 4px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.key-points h2 {
  color: #0d6efd;
  margin-top: 0;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.key-points ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.key-points li {
  position: relative;
  padding-left: 1.5em;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.key-points li:before {
  content: "•";
  position: absolute;
  left: 0.5em;
  color: #0d6efd;
}

.key-points li:last-child {
  margin-bottom: 0;
}
</style>

<!-- Main content container -->
<div class="content">

# The Resurgence of Measles in the United States
## 2 March 2025
---

Measles was officially declared eliminated in the United States in 2000—a massive public health achievement. But today, the disease is making a comeback.

So why is a preventable disease resurging? The short answer: **declining vaccination rates and political decisions that threaten public health**.

Measles cases have been rising steadily over the past decade, and **2025's early numbers suggest this year could far exceed previous years**. The reason isn't a mystery. Fewer children are getting vaccinated due to misinformation, weakened vaccine policies, and growing distrust in public health recommendations - often fueled by political figures and celebrities. 

## Key Facts About the Resurgence
<div class="key-points">
  <h2>Key Facts About the Measles Resurgence</h2>

  - [Measles](https://www.cdc.gov/measles/index.html) was eliminated in 2000, but [outbreaks](https://pmc.ncbi.nlm.nih.gov/articles/PMC5727570/) are now [increasing](https://www.kff.org/quick-take/u-s-measles-outbreaks-a-new-abnormal-in-a-time-of-vaccine-hesitancy/). 
  - In 2025 so far, the numbers already look [much higher](https://www.cdc.gov/measles/data-research/index.html) than the same period last year.
  - Most measles cases occur in [unvaccinated](https://www.cidrap.umn.edu/measles/texas-measles-outbreak-rises-146-cases) individuals. In the latest data, 95% of cases were in people with no known vaccination history.
  - Hospitalization rates are high. About 1 in 5 measles cases in 2025 has required hospitalization.
  - Vaccination rates are declining, especially in certain states. Many states have fallen below the [95%](https://time.com/7262314/measles-cases-united-states-rise-worldwide-outlook/) vaccination threshold needed for herd immunity.
  - Political rhetoric and misinformation are fueling the problem. High-profile figures like RFK Jr. are pushing anti-vaccine messaging that [directly contributes](https://www.health.ny.gov/press/releases/2025/2025-02-27_measles.htm) to lower immunization rates and increased outbreaks.

</div>

---

## Historical Trends (1985–2025)
**The takeaway**: *Measles cases plummeted after vaccines became widely available, but outbreaks have returned as vaccination rates decline.*

<div class="card">
${resize((width) => timeline(measles, {width, height: 200} ))}
</div>

- **1989**: The CDC recommended a second dose of the MMR vaccine.
- **2000**: Measles was declared eliminated in the U.S.
- **2019**: A record-high outbreak occurred, primarily in unvaccinated communities.
- **2025**: Cases are rising faster than in previous years.

## Recent Trends (2000–2025)
**The takeaway**: *After measles was eliminated in 2000, cases remained low for nearly two decades—until they started rising again in the late 2010s. Now, post-pandemic disruptions and lower vaccine confidence have led to a concerning increase in cases.*

<div class="card">
${resize((width) => timeline_recent(measles, {width, height: 200} ))}
</div>

- **2014** & **2019** saw major outbreaks linked to vaccine hesitancy.
- The **COVID-19** pandemic disrupted childhood vaccinations, creating a ripple effect.
- **2025**: A new peak is forming, surpassing past outbreaks.

## Weekly Cases in 2023–2025
**The takeaway**: *Measles cases in 2025 are already outpacing previous years—suggesting we're heading for a worse outbreak than in 2023 or 2024*.

<div class="card">
  ${viewTypeInput}
  ${resize((width) => weekly(measles_weekly, {
    width, 
    height: 300, 
    cumulative: viewType[0] === "Show cumulative cases"
  }))}
</div>

---

## The Role of Vaccine Decline: Why Measles is Back

Measles outbreaks don't just happen randomly—they occur when vaccination rates drop below the herd immunity threshold of 95%. That's the percentage of people who need to be vaccinated to prevent widespread outbreaks.

Unfortunately, vaccination rates have been steadily declining, especially in certain states where policies have weakened school vaccine requirements.

The following visualizations highlight how these declining rates are directly fueling the rise in measles cases. 

### Kindergarten Vaccination Rates (2009–2024)

**The takeaway**: *The percentage of kindergartners receiving the MMR vaccine has dropped nationwide, with some states falling well below the critical 95% threshold.*

<div class="card">
${resize((width) => vax_lines(vax_yearly, measles, {width, height: 300}))}
</div>

- **2009–2015**: MMR vaccination rates remained steady around 95%.
- **2016–2019**: A slight decline began, as misinformation campaigns gained traction.
- **2020–2022**: The COVID-19 pandemic disrupted routine childhood vaccinations.
- **2023–2024**: Some states are now below 90%, increasing the risk of outbreaks.

💡 The lower the vaccination rate, the easier it is for measles to spread.

### State-by-State Vaccine Decline

**The takeaway**: *Not all states are equally at risk—some have seen much sharper declines in vaccination rates due to policy changes and misinformation.*

<div class="card">

${resize((width) => vax(vax_by_fips, states))}
</div>

- States that have maintained strong [vaccine mandates](https://www.kff.org/coronavirus-covid-19/issue-brief/headed-back-to-school-in-2024-an-update-on-childrens-routine-vaccination-trends/) (e.g., California, New York) have kept rates near 95%.
- States that have expanded vaccine [exemptions](https://www.npr.org/sections/shots-health-news/2025/02/28/nx-s1-5312088/measles-texas-outbreak-contagious-spread) (e.g., Texas, Florida, Idaho) have seen the sharpest declines.
- Some communities have rates below 85%, [well below](https://www.healthline.com/health-news/texas-measles-outbeak-low-vaccination-rates) the safety threshold.


💡 The biggest outbreaks in recent years have occurred in states with the most [exemptions](https://pmc.ncbi.nlm.nih.gov/articles/PMC9037455/).

---

## What You Can Do

The rise of measles isn't just a random phenomenon — it's the result of declining vaccination rates and policy failures. Here are the key steps you can take to protect public health:

### 1. Get Vaccinated
- Check your vaccination status with your doctor
- Get two doses of the MMR vaccine for full protection
- If you're an adult, a simple blood test can confirm your immunity

### 2. Stay Informed
- Trust reliable sources like the [CDC](https://www.cdc.gov/measles/), [WHO](https://www.who.int/health-topics/vaccines), and [American Academy of Pediatrics](https://www.aap.org/en/patient-care/immunizations/)
- Be skeptical of sensational claims about vaccines
- Share accurate information with your community

### 3. Support Public Health
- Know your state's vaccine laws
- Contact representatives to support strong vaccine policies
- Protect those who can't get vaccinated by maintaining herd immunity


---
## Data Source
[https://www.cdc.gov/measles/data-research/index.html](https://www.cdc.gov/measles/data-research/index.html) - downloaded on 1 March 2025

</div>

<!-- Data / Analysis / Prep  -->
```js
// Import visualization components
import {timeline, timeline_recent} from "./components/timeline.js";
import {weekly} from "./components/weekly.js";
import {vax, vax_lines} from "./components/vax.js";

// Load and process annual measles data
const measles_raw = await FileAttachment("./data/measles_data.csv").csv({typed: true});
const measles = measles_raw.map(d => ({
  ...d,
  year: +d.year,
  cases: +d.cases
}));

// Load and process weekly measles data
const measles_weekly_raw = await FileAttachment("./data/weekly_cases.csv").csv({typed:true});
const measles_weekly = measles_weekly_raw.map(d => ({
  ...d,
  cases: +d.cases,
  years_of_data: +d.years_of_data
}));

// Load and process US states geographic data
import * as topojson from "topojson-client";
const us = await FileAttachment("./data/counties-albers-10m.json").json();
const states = topojson.feature(us, us.objects.states);
const nation = topojson.feature(us, us.objects.nation);
const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
const statemap = new Map(states.features.map(d => [d.id, d]));

// Load and process vaccination trends data
const vax_trends_raw = await FileAttachment("./data/vax.csv").csv({typed:true});
const vax_trends = vax_trends_raw.map(d => ({
  ...d,
  percent_change: +d.percent_change
}));

// Create vaccination data map by FIPS codes
const vax_by_fips = new Map();
for (const state of states.features) {
  const stateName = state.properties.name;
  const stateData = vax_trends.find(d => d.geography === stateName);
  if (stateData) {
    vax_by_fips.set(state.id, stateData.percent_change);
  }
}

// Load yearly vaccination data
const vax_yearly_raw = await FileAttachment("./data/vax-yearly.csv").csv({typed:true});
const vax_yearly = vax_yearly_raw.map(d => ({
  ...d, 
  percent_change: +d.percent_change,
  year: +d.year,
}));

// Add toggle for cumulative cases view
const viewTypeInput = Inputs.checkbox(["Show cumulative cases"]);
const viewType = Generators.input(viewTypeInput);
```


