---
theme: [air, alt]
toc: false
---

<link rel="stylesheet" href="styles.css">

<!-- Main content container -->
<div class="content">

# Measles cases: the data
---

## Historical Trends (1985–2025)
*Measles cases plummeted after vaccines became widely available, but outbreaks have returned as vaccination rates decline.*

<div class="card">
${resize((width) => timeline(measles, {width, height: 200} ))}
</div>

## Recent Trends (2000–2025)
*After measles was declared eliminated in the U.S. in 2000, cases remained low for nearly two decades. However, cases began rising in the late 2010s, driven by outbreaks in under-vaccinated communities and vaccine hesitancy. More recently, disruptions to routine immunizations during the COVID-19 pandemic and [declining](https://www.pbs.org/newshour/health/measles-cases-are-rising-in-the-u-s-heres-why-misinformation-about-the-vaccine-persists-today) [vaccine confidence](https://pmc.ncbi.nlm.nih.gov/articles/PMC10946219/) have contributed to a concerning increase in cases.*

<div class="card">
${resize((width) => timeline_recent(measles, {width, height: 200} ))}
</div>


## Weekly Cases in 2023–2025
*Measles cases in 2025 are already outpacing previous years—suggesting we're heading for a worse outbreak than in 2023 or 2024*.

<div class="card">
  ${viewTypeInput}
  ${resize((width) => weekly(measles_weekly, {
    width, 
    height: 300, 
    cumulative: viewType[0]
  }))}
</div>


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
const viewTypeInput = Inputs.checkbox(["← Show cumulative cases"]);
const viewType = Generators.input(viewTypeInput);
```



