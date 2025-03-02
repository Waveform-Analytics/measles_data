---
theme: [air, alt]
toc: false
---

# Measles in the US over time
## Exploring measles cases and vaccination rates in the United States

Measles was declared eliminated in the United States in 2000, but in recent years, cases have started to 
rise again. Using data on measles cases and vaccination rates, we can get a better understanding 
of what's happening and better interpret what we see and hear from the current administration and from the media. 


```js
import {timeline, timeline_recent}  from "./components/timeline.js";
```

```js
// Load data and convert strings to numbers
const measles_raw = await FileAttachment("./data/measles_data.csv").csv({typed: true});
const measles = measles_raw.map(d => ({
  ...d,
  year: +d.year,
  cases: +d.cases
}));
```

<div class="card">
${resize((width) => timeline(measles, {width, height: 200} ))}
</div>

<div class="card">
${resize((width) => timeline_recent(measles, {width, height: 200} ))}
</div>


## Data Source

[https://www.cdc.gov/measles/data-research/index.html](https://www.cdc.gov/measles/data-research/index.html) - downloaded on 1 March 2025



<!-- ```js
// Show data array for QC / comment this out
display(measles)
```  -->