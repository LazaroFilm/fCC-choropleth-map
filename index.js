const educationURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countyURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

let countyData;
let educationData;

// d3.select("#title").append("h2").text("USA Education Data");

const canvas = d3.select("#canvas");
const tooltip = d3.select("#tooltip");
const legend = d3.select("#legend").attr("width", 130).attr("height", 80);

// draws the map from the GeoJSON data
let drawMap = () => {
  canvas
    .selectAll("paths")
    .data(countyData)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("fill", (countyDataItem) => {
      let id = countyDataItem["id"];
      let county = educationData.find((county) => {
        return county["fips"] === id;
      });
      let percentage = county["bachelorsOrHigher"];
      if (percentage <= 15) {
        return "tomato";
      } else if (percentage <= 30) {
        return "orange";
      } else if (percentage <= 45) {
        return "lightgreen";
      } else {
        return "limegreen";
      }
    })
    .attr("data-fips", (countyDataItem) => {
      return countyDataItem["id"];
    })
    .attr("data-education", (countyDataItem) => {
      let id = countyDataItem["id"];
      let county = educationData.find((county) => {
        return county["fips"] === id;
      });
      let percentage = county["bachelorsOrHigher"];
      return percentage;
    })
    .on("mouseover", (countyDataItem) => {
      tooltip.transition().style("visibility", "visible");
      let id = countyDataItem.target["__data__"].id;
      let county = educationData.find((county) => {
        return county["fips"] === id;
      });
      console.log(county);
      tooltip.text(
        // "TEST COUNTY"
        `${county.fips} - ${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}`
      );
      tooltip.attr("data-education", county.bachelorsOrHigher);
    })
    .on("mouseout", () => {
      tooltip.transition().style("visibility", "hidden");
    });
};

// takes the Data from the links and turns them into usable GeoJSON arrays
// then calls for drawing the map form that data.A
d3.json(countyURL).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    countyData = topojson.feature(data, data.objects.counties).features;
    // console.log("county:", countyData);
    d3.json(educationURL).then((data, error) => {
      if (error) {
        console.log(error);
      } else {
        educationData = data;
        // console.log("education:", educationData);
        drawMap();
      }
    });
  }
});

// // generating county fips
// const countyFips = (countyDataItem) => {
//   let id = countyDataItem["id"];
//   let county = educationData.find((county) => {
//     return county["fips"] === id;
//   });
//   console.log(county);
//   return county;
// };

// making the legend
const drawLegend = (position, color, range) => {
  legend //
    .append("rect")
    .attr("x", 10)
    .attr("y", position * 15)
    .attr("width", 10)
    .attr("height", 10)
    .attr("stroke", "black")
    .attr("fill", color);
  legend //
    .append("text")
    .attr("x", 25)
    .attr("y", position * 15 + 10)
    .text(range);
};
drawLegend(1, "tomato", "less than 15");
drawLegend(2, "orange", "15 to 30");
drawLegend(3, "lightgreen", "20 to 45");
drawLegend(4, "limegreen", "more than 45");
