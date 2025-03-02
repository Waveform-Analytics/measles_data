import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

export function vax(vax_by_fips, states, {width, height} = {}) {
  return Plot.plot({
    width: 975,
    height: 610,
    projection: "identity",
    style: {
      fontSize: "14px",
      backgroundColor: "white"
    },
    color: {
      type: "quantize",
      n: 9,
      domain: d3.extent([...vax_by_fips.values()]),
      scheme: "RdBu",  // Red-Blue diverging scheme since we have positive and negative changes
      label: "Change in vaccination rate (%)",
      legend: true
    },
    marks: [
      Plot.geo(states, {
        fill: d => vax_by_fips.get(d.id),
        stroke: "white",
        title: d => `${d.properties.name}: ${vax_by_fips.get(d.id)?.toFixed(1)}%`,
        tip: {
          fontSize: 16,
          fill: "white",
          stroke: "#ddd",
          strokeWidth: 1,
          padding: 8
        }
      })
    ]
  });
}

export function vax_lines(vax_yearly, measles_data, {width, height} = {}) {
  // Get domain for vaccination rates
  const [minVax, maxVax] = d3.extent([
    ...vax_yearly.map(d => d.ci_lower),
    ...vax_yearly.map(d => d.ci_upper),
    ...vax_yearly.map(d => d.estimate_pct)
  ]);

  return Plot.plot({
    title: "Kindergarten vaccination rates",
    width,
    height,
    x: {
      label: "Year",
      tickFormat: d => d.toString()
    },
    y: {
      label: "Vaccination Rate",
      tickFormat: d => d3.format(".0%")(d),
      domain: [Math.max(0, minVax - 0.02), Math.min(1, maxVax + 0.02)], // Add small padding but cap at 0-100%
      grid: true
    },
    marks: [
      // Confidence interval band
      Plot.areaY(vax_yearly, {
        x: "year",
        y1: "ci_lower",
        y2: "ci_upper",
        fill: "#74b9ff",
        fillOpacity: 0.2
      }),
      // Main trend line
      Plot.lineY(vax_yearly, {
        x: "year", 
        y: "estimate_pct",
        stroke: "#0984e3",
        strokeWidth: 3,
        tip: {
          fontSize: 16,
          fill: "white",
          stroke: "#ddd",
          strokeWidth: 1,
          padding: 8
        },
        title: d => `${d.year}\nVaccination Rate: ${(d.estimate_pct * 100).toFixed(1)}%\n95% CI: [${(d.ci_lower * 100).toFixed(1)}%, ${(d.ci_upper * 100).toFixed(1)}%]`
      })
    ],
    style: {
      fontSize: "14px",
      backgroundColor: "white"
    },
    marginBottom: 50
  });
}
