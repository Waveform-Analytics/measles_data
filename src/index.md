---
theme: dashboard
toc: false
---

# Measles in the US over time
## Exploring measles cases and vaccination rates in the United States


```js
// Load data
const measles = await FileAttachment("data/measles_data.csv").csv({typed: true});
```






```js
// Show data array for QC / comment this out
display(measles)
``` 