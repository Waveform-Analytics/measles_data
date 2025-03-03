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



