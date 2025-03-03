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



# The Role of Vaccine Decline: Why Measles is Back

---

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

### State-by-State Vaccine Decline

**The takeaway**: *Not all states are equally at risk—some have seen much sharper declines in vaccination rates due to policy changes and misinformation.*

<div class="card">

${resize((width) => vax(vax_by_fips, states))}
</div>

- States that have maintained strong [vaccine mandates](https://www.kff.org/coronavirus-covid-19/issue-brief/headed-back-to-school-in-2024-an-update-on-childrens-routine-vaccination-trends/) (e.g., California, New York) have kept rates near 95%.
- States that have expanded vaccine [exemptions](https://www.npr.org/sections/shots-health-news/2025/02/28/nx-s1-5312088/measles-texas-outbreak-contagious-spread) (e.g., Texas, Florida, Idaho) have seen the sharpest declines.
- Some communities have rates below 85%, [well below](https://www.healthline.com/health-news/texas-measles-outbeak-low-vaccination-rates) the safety threshold.


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


