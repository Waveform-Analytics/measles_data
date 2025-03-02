import * as Plot from "npm:@observablehq/plot";

export function weekly(weekly_cases, {width = 900, height = 500} = {}) {
  // Sort data by year and week
  const sorted_data = [...weekly_cases].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.week - b.week;
  });

  // Find the last 2025 data point
  const data_2025 = sorted_data.filter(d => d.year === 2025);
  const last_week_2025 = Math.max(...data_2025.map(d => d.week));

  return Plot.plot({
    width,
    height,
    x: {
      type: "linear",
      label: "Week of Year",
      domain: [1, 52],
      tickFormat: d => `Week ${d}`
    },
    y: {
      label: "Number of Cases",
      grid: true
    },
    color: {
      type: "categorical",
      legend: true,
      label: "Year"
    },
    marks: [
      Plot.line(sorted_data, {
        x: "week",
        y: "cases",
        stroke: d => d.year.toString(),
        strokeWidth: 1.5,
      }),
      // Regular dots
      Plot.dot(sorted_data, {
        x: "week",
        y: "cases",
        tip: true,
        stroke: d => d.year.toString(),
        fill: d => d.year.toString(),
        r: 3,
        strokeWidth: 1.5,
        title: d => `Week: ${d.week}\nCases: ${d.cases}`
      }),
      // Special last 2025 dot
      Plot.dot(sorted_data.filter(d => d.year === 2025 && d.week === last_week_2025), {
        x: "week",
        y: "cases",
        tip: false,
        stroke: d => d.year.toString(),
        fill: "white",
        r: 5,
        strokeWidth: 1.5,
        title: d => `Week: ${d.week}\nCases: ${d.cases}`
      })
    ],
    marginLeft: 60,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 40
  });
}