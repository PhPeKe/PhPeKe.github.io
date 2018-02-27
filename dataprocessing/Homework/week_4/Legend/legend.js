//Onload function to wait untileverything is loaded
window.onload = function(){
var svgwidth = 960
    svgheight = 500
    colors = ["#ffffb2","#fecc5c","#fd8d3c","#f03b20","#bd0026","black"]
    rectsize = 20
    names = ["std.dev","0 < 1", "1 < 2", "2 < 3","3 < 4", "4 < 5","missing data"];

//Webpage title
d3.select("head").append("title")
    .html("SVG legend");

//Link to CSS file
d3.select("head").append("link")
    .attr("rel", "stylesheet")
    .attr("type", "text/css")
    .attr("href", "legend.css");

//Title
d3.select("body").append("div").append("h1")
    .html("Just a legend")
    .attr("class", "Title");

//Append svg element
d3.select("body").append("div").append("svg")
    .attr("width", svgwidth)
    .attr("height", svgheight)
    .attr("class", "graph");

//Select SVG element and set margins, width and height
var svg = d3.select("svg"),
    //Adjust margin at the right side for legend
    margin = {top: 20, right: 40, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

//Append g
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Append colored squares
g.selectAll(".legend")
    .data(colors)
    .enter().append("rect")
      .attr("class", "legend")
      .style("fill", function(d)  {return d;})
      .attr("x",0 )//width - margin.right)
      .attr("y",function(d, i) {return i * rectsize ;})
      .attr("height",rectsize)
      .attr("width",rectsize);

//Append labels for colors
d3.select("g").selectAll(".text")
    .data(names)
    .enter().append("text")
      .attr("class","text")
      .attr("x", rectsize + 10) // (width - margin.right) + rectsize + 10)
      .attr("y", function(d, i) {return i * rectsize - 4 ;})
      //.attr("dy", "0.20em")
      .text(function(d) { return d});

//Initialize scales for x and y (ordinal and linear)
var x = d3.scaleBand().rangeRound([0,width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);
/*
//Append g
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
*/
//Load in the data
//d3.json("data.json",function(data){

  //Add relevant code here

//});
}
