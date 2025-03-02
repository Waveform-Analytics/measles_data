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
  cases: +d.cases
}));
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

coming soon... 

- Overall trends across the country since 2009
- State-by-state trends since 2009 (map)


## Data Source

[https://www.cdc.gov/measles/data-research/index.html](https://www.cdc.gov/measles/data-research/index.html) - downloaded on 1 March 2025



</div>

<!-- ```js
display(measles_weekly)

``` -->