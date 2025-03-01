---
theme: [air]
toc: false
---

# Measles in the US over time
## Exploring measles cases and vaccination rates in the United States


```js
import {timeline, timeline_recent}  from "./components/timeline.js";
```

```js
// Load data
const measles =  await FileAttachment("./data/measles_data.csv").csv({typed: true});
```

<div class="card">
${resize((width) => timeline(measles, {width, height: 200} ))}
</div>

<div class="card">
${resize((width) => timeline_recent(measles, {width, height: 200} ))}
</div>


## Data Source

[https://www.cdc.gov/measles/data-research/index.html](https://www.cdc.gov/measles/data-research/index.html) - downloaded on 1 March 2025


<!-- 
```js
// Show data array for QC / comment this out
display(measles)
```  -->