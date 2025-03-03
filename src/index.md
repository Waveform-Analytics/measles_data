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

<div class="content">

# Introduction: Measles Is Back, and It's No Accident
Measles was officially declared eliminated in the United States in 2000—a massive public health achievement. But today, the disease is making a comeback.

So why is a preventable disease resurging? The short answer: **declining vaccination rates and political decisions that threaten public health**.

Measles cases have been rising steadily over the past decade, and **2025's early numbers suggest this year could far exceed previous years**. The reason isn't a mystery. Fewer children are getting vaccinated due to misinformation, weakened vaccine policies, and growing distrust in public health recommendations—often fueled by political figures like Robert F. Kennedy Jr., who has made vaccine skepticism a core part of his campaign.

<div class="key-points">
  <h2>Key Facts About the Measles Resurgence</h2>
  <ul>
    <li>Measles was eliminated in 2000, but outbreaks are now increasing.</li>
    <li>In 2025 so far, there are .</li>
    <li>Most measles cases occur in unvaccinated individuals. In the latest data, 95% of cases were in people with no known vaccination history.</li>
    <li>Hospitalization rates are high. About 1 in 5 measles cases in 2025 has required hospitalization.</li>
    <li>Vaccination rates are declining, especially in certain states. Many states have fallen below the 95% vaccination threshold needed for herd immunity.</li>
    <li>Political rhetoric and misinformation are fueling the problem. High-profile figures like RFK Jr. are pushing anti-vaccine messaging that directly contributes to lower immunization rates and increased outbreaks.</li>
  </ul>
</div>

This page explores the numbers, the policies behind them, and why the resurgence of measles isn't just an unfortunate trend—it's a warning sign.

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

```js
const viewTypeInput = Inputs.checkbox(["Show cumulative cases"]);
const viewType = Generators.input(viewTypeInput);
```

<div class="card">
  ${viewTypeInput}
  ${resize((width) => weekly(measles_weekly, {
    width, 
    height: 300, 
    cumulative: viewType[0] === "Show cumulative cases"
  }))}
</div>

## Vaccination rates

Next, we're looking at trends from 2009-2024, based on vaccination rates for kindergartners in different states. 

<div class="card">
${resize((width) => vax(vax_by_fips, states))}
</div>

There is a lot of variability state to state in terms of changes in vaccination rates, and it's hard to see what's happening overall from the map. The next plot shows the nationwide
percentages, which takes into account the total population of kindergartners in each state. 
The shaded area indicates 95% confidence intervals.

<div class="carnd">
${resize((width) => vax_lines(vax_yearly, measles, {width, height: 300}))}
</div>

## Data Source

[https://www.cdc.gov/measles/data-research/index.html](https://www.cdc.gov/measles/data-research/index.html) - downloaded on 1 March 2025



</div>

<!-- ```js
display(statemap)
``` -->
