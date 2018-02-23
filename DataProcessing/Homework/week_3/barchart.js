//Onload function to wait untileverything is loaded
window.onload = function(){
var svgwidth = 960
    svgheight = 500
    source = "https://cdn.knmi.nl/knmi/map/page/klimatologie/gegevens/maandgegevens/mndgeg_240_rh24.txt";

//Initialize complete Monthnames for Mouseover
var Monthnames = ["January", "February", "March", "April", "May", "June"
                  , "July", "August", "September", "October", "November"
                  , "December"]

//Webpage title
d3.select("head").append("title")
    .html("Rain in Schiphol 1971");

//Link to CSS file
d3.select("head").append("link")
    .attr("rel", "stylesheet")
    .attr("type", "text/css")
    .attr("href", "barchart.css");

//Title
d3.select("body").append("div").append("h1")
    .html("Average rainfall in Schiphol, 1971")
    .attr("class", "Title");

//Append svg element
d3.select("body").append("div")
    .append("svg")
    .attr("width", svgwidth)
    .attr("height", svgheight)
    .attr("class", "graph");

//Append Link to Datasource
d3.select("body").append("div")
    .attr("class", "link")
    .append("a")
    .attr("href", source)
    .html("Datasource");

// Define and append the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


//Select SVG element and set margins, width and height
var svg = d3.select("body").select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

//Initialize scales for x and y (ordinal and linear)
var x = d3.scaleBand().rangeRound([0,width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

//Append g
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Load in the data
d3.json("data.json",function(data){
  //Set domain and range
  x.domain(data.map(function(d) { return d.Date; }));
  //Rain is divided by ten so its in mm and not 0.1 mm
  y.domain([0, d3.max(data, function(d) { return parseInt(d.Rain)/10; })]);

  //Append x axis
  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  //Append y-axis and label
  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("x", -20)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Rain in mm");

  //Append the bars for the barchart and pair them with data
  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Date); })
      .attr("y", function(d) { return y(parseInt(d.Rain)/10); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(parseInt(d.Rain)/10); })

      //Interactivity
      .on("mouseover", function(d, i) {
          //Tooltip
          div.transition()
              .duration(200)
              .style("opacity", .9);
          //Set text for Tooltip
          div.html("Average rain in " + Monthnames[i] + ":" + "<br>"
                      + parseInt(d.Rain)/10 + " mm")
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px")
          //Changing the bars colors
          d3.select(this).transition()
              .duration(200)
              .style("fill","blue");
          })
      .on("mouseout", function(d) {
          //Tooltip
          div.transition()
              .duration(500)
              .style("opacity", 0)
          //Bars
          d3.select(this).transition()
              .duration(500)
              .style("fill","#7FDBFF");
          });
});
}
