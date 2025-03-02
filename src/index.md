---
theme: [air, alt]
toc: false
---

# Measles in the US over time
## Exploring measles cases and vaccination rates in the United States

Measles was declared eliminated in the United States in 2000, but this highly contagious disease continues to appear in outbreaks. This chart shows the number of measles cases reported annually across the country from 1985 to 2025. The visualization offers two views: a long-term perspective spanning four decades, and a closer look at more recent years (2010-2025). By examining these trends, we can see how vaccination rates, policy changes, and public health responses have influenced the presence of this preventable disease in our communities.

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



```js
// Show data array for QC / comment this out
display(measles)
``` 