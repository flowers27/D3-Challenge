// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 700;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.csv("assets/data/data.csv").then(function(healthData) {
      healthData.forEach( data => {
          data.state = +data.state
          data.poverty = +data.poverty
          data.healthcare = +data.healthcare
          data.abbr = data.abbr;
          console.log("State:", data.state);
          console.log("Poverty:", data.poverty);
          console.log("Healthcare:", data.healthcare);
          console.log("State Abbr:", data.abbr);
          });
    
        
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(healthData, d => d.poverty)])
      .range([0, width]);
    
    var yLinearScale = d3.scaleLinear()
       .domain([0, d3.max(healthData, d => d.healthcare)])
       .range([height, 0]);


    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
    
    chartGroup.append("g")
      .call(leftAxis);


    var circlesGroup = chartGroup.selectAll("circle")
      .data(healthData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "20")
      .attr("fill", "purple")
      .attr("stroke-width", "3")
      .attr("stroke", "black")
      .attr("opacity", ".50");

stateab = healthData.map(element => element)
console.log(stateab)

    var label = chartGroup.selectAll()
        .data(stateab)
        .enter()
        .append("text")
        .text( (m) => {return m.abbr})
        .attr("x", (m) => (xLinearScale(m.poverty))-10)
        .attr("y", (m) => yLinearScale(m.healthcare))
        ;

    
    var toolTip = d3.tip()
      .attr("class", "toolTip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Poverty Level: ${d.poverty}<br>Lack of Healthcare: ${d.healthcare}`);

      });

    chartGroup.call(toolTip);

    circlesGroup.on("click", function(d) {
      toolTip.show(d, this);
      })

      .on("mouseout", function(d, index) {
          toolTip.hide(d);
      });

    // var labelsGroup = labelsGroup.append("text")
    //   .attr("transform", `translate(${width / 2}, ${height + 20})`);

    // var povertyLabel = labelsGroup.append("text")
    //   .attr("x", 0)
    //   .attr("y", 20)
    //   .attr("class", "axis-text-x")
    //   .classed("active", true)
    //   .text("In Poverty (%)");  

    // var ylabelsGroup = chartGroup.append("g");

    // var healthcareLabel = ylabelsGroup.append("text")
    //   .attr("transform", `translate(-40,${height / 2})rotate(-90)`)
    //   .attr("dy", "1em")
    //   .attr("class", "axis-text-y")
    //   .classed("axis-text", true)
    //   .attr("value", "healthcare")
    //   .classed("active", true)
    //   .text("Lack of  Healtcare (%)");  
  
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .classed("axis-text", true)
      .text("Lack of Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("axis-text", true)
      .text("In Poverty (%)");
}).catch(function(error) {
  console.log(error);

});
