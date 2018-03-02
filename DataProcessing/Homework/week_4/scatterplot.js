window.onload = function(){
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//I flipped the graph so it looks nicer and the legend has room
var x = d3.scale.linear()
    .range([width, 0]);
var y = d3.scale.linear()
    .range([0, height]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

d3.select("body").append("h1")
    .attr("class","title")
    .html("HPI-rank life-expectancy and well-beeing");

var svg = d3.select("body").append("svg")
    .attr("class", "graph")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Append div-element for tooltip
var tip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//Open data
d3.json("data.json",function(error,data){
  if (error) throw error;


  data.forEach(function(d) {
    d.rank = +d.rank;
    d.life_ex = +d.life_ex;
  });


  //Set domains
  x.domain(d3.extent(data, function(d) { return d.rank; })).nice();
  y.domain(d3.extent(data, function(d) { return d.life_ex; })).nice();

  //
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("HPI Rank");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Life expectancy")

  //Create dots with the data
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      //set dotsiye to well beeing ()* 1.5 for better visibility)
      .attr("r", function(d) { return d.well_b * 1.5;})
      .attr("cx", function(d) { return x(d.rank); })
      .attr("cy", function(d) { return y(d.life_ex); })
      .style("fill", function(d) { return color(d.region); });


  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d,i) { return d; });

  svg.select(".legend").append("text")
      .attr("x", width)
      .attr("y", 130)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text("Size of the dots: Wellbeing-score");

  svg.selectAll(".dot").on("mouseover", function(d, i) {
    tip.transition()
        .duration(200)
        .style("opacity", .9);
    tip.html( d.country + "'s rank on the HPI: " + d.rank + "<br>"
              + "Life expectancy: " + parseInt(d.life_ex) + " Years" + "<br>"
              + "Wellbeing-Score: " + d.well_b)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY + 27) + "px");
    d3.select(this).transition()
        .duration(500)
        .style("fill", "black");
  })

  .on("mouseout", function(d) {
    tip.transition()
        .duration(500)
        .style("opacity", 0)
    d3.select(this).transition()
        .duration(500)
        .style("fill", function (d) { return color(d.region);});
  });
});
}
