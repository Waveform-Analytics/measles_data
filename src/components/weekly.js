import * as Plot from "npm:@observablehq/plot";

export function weekly(weekly_cases, {width = 900, height = 500, cumulative = false} = {}) {
  // Sort data by year and week
  const sorted_data = [...weekly_cases].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.week - b.week;
  });

  // Calculate cumulative cases for each year if needed
  let plot_data = sorted_data;
  if (cumulative) {
    const years = [...new Set(sorted_data.map(d => d.year))];
    const cumulative_data = [];
    
    for (const year of years) {
      let running_total = 0;
      const year_data = sorted_data.filter(d => d.year === year);
      
      for (const week of year_data) {
        running_total += week.cases;
        cumulative_data.push({
          ...week,
          cumulative_cases: running_total
        });
      }
    }
    plot_data = cumulative_data;
  }

  // Find the last 2025 data point
  const data_2025 = plot_data.filter(d => d.year === 2025);
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
      label: cumulative ? "Cumulative Cases" : "Weekly Cases",
      grid: true
    },
    color: {
      type: "categorical",
      legend: true,
      label: "Year"
    },
    marks: [
      Plot.line(plot_data, {
        x: "week",
        y: cumulative ? "cumulative_cases" : "cases",
        stroke: d => d.year.toString(),
        strokeWidth: 1.5,
      }),
      // Regular dots
      Plot.dot(plot_data, {
        x: "week",
        y: cumulative ? "cumulative_cases" : "cases",
        tip: true,
        stroke: d => d.year.toString(),
        fill: d => d.year.toString(),
        r: 3,
        strokeWidth: 1.5,
        title: d => `Week: ${d.week}\n${cumulative ? "Total" : "Weekly"} Cases: ${cumulative ? d.cumulative_cases : d.cases}`
      }),
      // Special last 2025 dot
      Plot.dot(plot_data.filter(d => d.year === 2025 && d.week === last_week_2025), {
        x: "week",
        y: cumulative ? "cumulative_cases" : "cases",
        tip: false,
        stroke: d => d.year.toString(),
        fill: "white",
        r: 5,
        strokeWidth: 1.5,
        title: d => `Week: ${d.week}\n${cumulative ? "Total" : "Weekly"} Cases: ${cumulative ? d.cumulative_cases : d.cases}`
      })
    ],
    marginLeft: 60,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 40
  });
}