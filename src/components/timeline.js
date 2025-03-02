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
    x: {
      label: "Year",
      tickFormat: d => d.toString()
    },
    marks: [
      Plot.areaY(cases, {  // Background area
        x: "year",
        y: "cases",
        fill: "#f0f0f0",
        fillOpacity: 0.8,
        stroke: "none"
      }),
      Plot.ruleX(cases, {  // Stems
        x: "year",
        y: "cases",
        stroke: d => d.year >= 2010 ? "#377eb8" : "#e41a1c",
        strokeWidth: 2
      }),
      Plot.dot(cases, {    // Dots
        x: "year",
        y: "cases",
        tip: true,
        stroke: d => d.year >= 2010 ? "#377eb8" : "#e41a1c",
        fill: "white",
        strokeWidth: 2,
        r: 3,
        title: d => `Year: ${d.year}\nCases: ${d.cases.toLocaleString()}`
      }),
      Plot.rect([
        {
          x1: 2009.5,
          x2: 2025.5,
          y1: 0,
          y2: 12000
        }
      ], {
        x1: "x1",
        x2: "x2",
        y1: "y1",
        y2: "y2",
        stroke: "#666",
        strokeWidth: 1,
        strokeDasharray: "3,3",
        fill: "#377eb8",
        fillOpacity: 0.1
      }),
      Plot.text([
        {
          x: 2017.5,
          y: 13000,
          text: "Detail view below ↓"
        }
      ], {
        x: "x",
        y: "y",
        text: "text",
        fontSize: 10,
        fill: "#666",
        stroke: "white",
        strokeWidth: 3,
        strokeLinejoin: "round",
        strokeLinecap: "round",
        dx: 0,
        dy: 0
      })
    ],
    color: {
      legend: true,
      domain: ["1985-2009", "2010-2025"],
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
    x: {
      domain: [2010, 2025],
      label: "Year",
      tickFormat: d => d.toString()
    },
    marks: [
      Plot.areaY(cases, {  // Background area
        x: "year",
        y: "cases",
        fill: "#f0f0f0",
        fillOpacity: 0.8,
        stroke: "none"
      }),
      Plot.ruleX(cases, {  // Stems
        x: "year",
        y: "cases",
        stroke: "#377eb8",
        strokeWidth: 2
      }),
      Plot.dot(cases, {    // Dots
        x: "year",
        y: "cases",
        tip: true,
        stroke: "#377eb8",
        fill: "white",
        strokeWidth: 2,
        r: 3,
        title: d => `Year: ${d.year}\nCases: ${d.cases.toLocaleString()}`
      })
    ]
  });
}
