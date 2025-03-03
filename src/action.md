---
theme: [air, alt]
toc: false
---

<link rel="stylesheet" href="styles.css">

<!-- Main content container -->
<div class="content">

# What You Can Do

The rise of measles isn't just a random phenomenon — it's the result of declining vaccination rates and policy failures. Here are the key steps you can take to protect public health:

## 1. Get Vaccinated
- Check your vaccination status with your doctor
- Get two doses of the MMR vaccine for full protection
- If you're an adult, a simple blood test can confirm your immunity

## 2. Stay Informed
- Trust reliable sources like the [CDC](https://www.cdc.gov/measles/), [WHO](https://www.who.int/health-topics/vaccines), and [American Academy of Pediatrics](https://www.aap.org/en/patient-care/immunizations/)
- Be skeptical of sensational claims about vaccines
- Share accurate information with your community

## 3. Support Public Health
- Know your state's vaccine laws
- Contact representatives to support strong vaccine policies
- Protect those who can't get vaccinated by maintaining herd immunity


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


