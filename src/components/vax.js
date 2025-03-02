import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

export function vax(vax_by_fips, states, statemap, {width, height} = {}) {
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