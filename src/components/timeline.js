import * as Plot from "npm:@observablehq/plot";

export function timeline(cases, {width, height} = {}) {
  return Plot.plot({
    title: "Measles Cases: 1985-2025",
    width,
    height,
    y: {
      grid: true,
      label: "Cases",
      tickFormat: (x) => `${x / 1000}k`
    },
    marks: [
      Plot.barX(cases, {
        x: "year",
        y: "cases",
        fill: "era",
        sort: {x: "descending"},
        inset: 2
      })
    ],
    color: {
      legend: true,
      domain: ["part1", "part2"],
      range: ["#e41a1c", "#377eb8"]
    }
  });
}


export function timeline_recent(cases, {width, height} = {}) {
  return Plot.plot({
    title: "Measles cases: 2010-2025",
    width,
    height,
    y: {
      grid: true,
      label: "Cases",
      domain: [0, 1500],
      tickFormat: (x) => `${x / 1000}k`
    },
    x: {domain: [2010, 2025]},
    marks: [
      Plot.barX(cases, {
        x: "year",
        y: "cases",
        fill: "era",
        sort: {x: "descending"},
        inset: 2
      })
    ],
    color: {
      legend: true,
      domain: ["part1", "part2"],
      range: ["#e41a1c", "#377eb8"]
    }
  });
}
