const d3 = require("d3");
const topojson = require("topojson-server");
const topology = topojson.topology({ foo: geojson });

const usEducationData =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const usCountyData =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

console.log("Hello JS");

d3.select("body").append("h2").text("Hello D3");

// d3.geoAlbersUsa().scale(1300).translate([487.5, 305]);

d3.append()
  .enter()
  .append("line")
  .attr("x1", 100)
  .attr("y1", 200)
  .attr("x2", 100)
  .attr("y2", 200);
