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

</style>

<div class="content">

# Measles in the US over time
## Exploring measles cases and vaccination rates in the United States

Measles was declared eliminated in the United States in 2000, but in recent years, cases have started to 
rise again. Using data on measles cases and vaccination rates, we can get a better understanding 
of what's happening and more clearly interpret what we see and hear from the current administration and from the media. 


```js
import {timeline, timeline_recent}  from "./components/timeline.js";
import {weekly} from "./components/weekly.js";
import {vax, vax_lines} from "./components/vax.js";
```

```js
// Load annual data
const measles_raw = await FileAttachment("./data/measles_data.csv").csv({typed: true});
const measles = measles_raw.map(d => ({
  ...d,
  year: +d.year,
  cases: +d.cases
}));
```

```js
// Load weekly data 
const measles_weekly_raw = await FileAttachment("./data/weekly_cases.csv").csv({typed:true});
const measles_weekly = measles_weekly_raw.map(d => ({
  ...d,
  cases: +d.cases,
  years_of_data: +d.years_of_data
}));
```

```js
// US states
import * as topojson from "topojson-client";

const us = await FileAttachment("./data/counties-albers-10m.json").json();
const states = topojson.feature(us, us.objects.states);
const nation = topojson.feature(us, us.objects.nation);
const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
const statemap = new Map(states.features.map(d => [d.id, d]))
```

```js
// Load vax trends data
const vax_trends_raw = await FileAttachment("./data/vax.csv").csv({typed:true});
const vax_trends = vax_trends_raw.map(d => ({
  ...d,
  percent_change: +d.percent_change
}));

// Create a Map connecting FIPS codes to percent_change values
const vax_by_fips = new Map();
for (const state of states.features) {
  const stateName = state.properties.name;
  const stateData = vax_trends.find(d => d.geography === stateName);
  if (stateData) {
    vax_by_fips.set(state.id, stateData.percent_change);
  }
}
```

```js
// Load yearly vaccination data (per state and overall)
const vax_yearly_raw = await FileAttachment("./data/vax-yearly.csv").csv({typed:true});
const vax_yearly = vax_yearly_raw.map(d => ({
  ...d, 
  percent_change: +d.percent_change,
  year: +d.year,

}))

```

<div class="card">
${resize((width) => timeline(measles, {width, height: 200} ))}
</div>

<div class="card">
${resize((width) => timeline_recent(measles, {width, height: 200} ))}

</div>

## Weekly cases comparison: 2023-2025

This plot shows, week to week, how the number of measles cases changed between 
2023-2025. Of course, the data from 2025 is still being collected. This chart is 
based on data downloaded from the CDC website on March 1st, 2025. The number
of cases is already out-pacing previous years.

<div class="card">
${resize((width) => weekly(measles_weekly, {width, height: 300}))}
</div>

## Vaccination rates

Next, we're looking at trends from 2009-2024, based on vaccination rates for kindergartners in different states. 

<div class="card">
${resize((width) => vax(vax_by_fips, states))}
</div>

There is a lot of variability state to state in terms of changes in vaccination rates, and it's hard to see what's happening overall from the map. The next plot shows the nationwide
percentages, which takes into account the total population of kindergartners in each state. 
The shaded area indicates 95% confidence intervals.

<div class="card">
${resize((width) => vax_lines(vax_yearly, measles, {width, height: 300}))}
</div>

## Data Source

[https://www.cdc.gov/measles/data-research/index.html](https://www.cdc.gov/measles/data-research/index.html) - downloaded on 1 March 2025



</div>

<!-- ```js
display(statemap)
``` -->
