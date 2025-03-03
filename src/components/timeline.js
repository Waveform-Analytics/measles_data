import * as Plot from "npm:@observablehq/plot";

export function timeline(cases, {width, height} = {}) {
  return Plot.plot({
    title: "Measles Cases: 1985-2025",
    width,
    height,
    y: {
      grid: true,
      domain: [0, 37000],
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
        stroke: d => d.year >= 2000 ? "#e41a1c" : "#377eb8",
        strokeWidth: 2
      }),
      Plot.dot(cases, {    // Dots
        x: "year",
        y: "cases",
        tip: true,
        stroke: d => d.year >= 2000 ? "#e41a1c" : "#377eb8",
        fill: "white",
        strokeWidth: 2,
        r: 3,
        title: d => `Year: ${d.year}\nCases: ${d.cases.toLocaleString()}`
      }),

      Plot.rect([
        {
          x1: 1999.5,
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
        fill: "#e41a1c",
        fillOpacity: 0.1
      }),
      Plot.text([
        {
          x: 2012.5,
          y: 13300,
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
      }),

      // Add arrow pointing to 1989 peak
      Plot.arrow([
        {
          x1: 1989,
          x2: 1989,
          y1: 32000,
          y2: 20000,
        },
        // Add new arrow for 2000
        {
          x1: 2000,
          x2: 2000,
          y1: 32000,
          y2: 2000,
        }
      ], {
        x1: "x1",
        x2: "x2",
        y1: "y1",
        y2: "y2",
        stroke: "#666",
        strokeWidth: 1.5,
        bend: false
      }),

      // Add labels above arrows
      Plot.text([
        {
          x: 1989,
          y: 36000,
          text: "2nd dose\nrecommended",
          fontSize: 10,
          textAnchor: "middle"
        },
        {
          x: 2000,
          y: 36000,
          text: "Measles\neliminated in\nthe US",
          fontSize: 10,
          textAnchor: "middle"
        }
      ], {
        x: "x",
        y: "y",
        text: "text"
      })
    ],
    color: {
      legend: true,
      domain: ["1985-1999", "2000-2025"],
      range: ["#377eb8", "#e41a1c"]
    }
  });
}

export function timeline_recent(cases, {width, height} = {}) {
  const filtered_cases = cases.filter(d => d.year >= 2000);
  return Plot.plot({
    title: "Measles cases: 2000-2025",
    width,
    height,
    y: {
      grid: true,
      label: "Cases",
      domain: [0, 1800],
      tickFormat: (x) => `${x / 1000}k`
    },
    x: {
      domain: [2000, 2025],
      label: "Year",
      tickFormat: d => d.toString()
    },
    marks: [
      Plot.areaY(filtered_cases, {
        x: "year",
        y: "cases",
        fill: "#f0f0f0",
        fillOpacity: 0.8,
        stroke: "none"
      }),
      Plot.ruleX(filtered_cases, {
        x: "year",
        y: "cases",
        stroke: "#e41a1c",
        strokeWidth: 2
      }),
      Plot.dot(filtered_cases, {
        x: "year",
        y: "cases",
        tip: true,
        stroke: "#e41a1c",
        fill: "white",
        strokeWidth: 2,
        r: 3,
        title: d => `Year: ${d.year}\nCases: ${d.cases.toLocaleString()}`
      }),

      // Add arrow pointing to 2020
      Plot.arrow([
        {
          x1: 2020,
          x2: 2020,
          y1: 1600,
          y2: 100,
        }
      ], {
        x1: "x1",
        x2: "x2",
        y1: "y1",
        y2: "y2",
        stroke: "#666",
        strokeWidth: 1.5,
        bend: false
      }),

      // Add label above arrow
      Plot.text([
        {
          x: 2020,
          y: 1800,
          text: "COVID-19\npandemic onset",
          fontSize: 10,
          textAnchor: "middle"
        }
      ], {
        x: "x",
        y: "y",
        text: "text"
      })
    ]
  });
}
