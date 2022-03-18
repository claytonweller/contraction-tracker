import * as d3 from "d3";
import React, { useEffect } from 'react'

const plotGraph = () => {
  const dataset1 = [
    [1, 1], [12, 20], [24, 36],
    [32, 50], [40, 70], [50, 100],
    [55, 106], [65, 123], [73, 130],
    [78, 134], [83, 136], [89, 138],
    [100, 140]
  ] as [number, number][]

  // const dataset2 = dataset1.map((d) => [(d[0] * d[0]) * .04, (d[1] + 30) * .85]) as [number, number][]

  const masterSet = [dataset1]
  const width = window.innerWidth - 120;
  const height = 50;
  const margin = 5;
  const padding = 5;
  const adj = 0;

  const svg = d3.select('div#container')
    .append('svg')
    .attr('preserveAspectRatio', "xMinYMin meet")
    .attr("viewBox", "-"
      + adj + " -"
      + adj + " "
      + (width) + " "
      + (height + adj * 3))
    .style("padding", padding)
    .style("margin", margin)
    .style("height", '15vh')
    .style("width", width)
    .classed("svg-content", true);

  const xScale = d3.scaleLinear()
    .range([0, width])
    .domain([0, 101])
  const yScale = d3.scaleLinear()
    .rangeRound([height, 0])
    .domain([0, 140])

  // const yaxis = d3.axisLeft(yScale);
  const xaxis = d3.axisBottom(xScale);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xaxis);

  // svg.append("g")
  //   .attr("class", "axis")
  //   .call(yaxis);

  const line = d3.line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))

  const lines = svg.selectAll("lines")
    .data(masterSet)
    .enter()
    .append("g");

  lines.append('path')
    .attr('d', (d) => line(d))
}

export default function Graphs() {

  useEffect(() => {
    plotGraph()
    return () => { (d3.selectAll('.svg-content').remove()) }
  })
  return (
    <div id="container" className="svg-container" />
  )
}