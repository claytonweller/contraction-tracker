import * as d3 from "d3";
import React, { useEffect } from 'react'
import { ILabor } from "../../../types/Labor";
import { IStateProps } from "../../utils/with-state";

export default function Graphs({ labor }: IStateProps) {
  useEffect(() => {
    plotGraph(labor)
    return () => { (d3.selectAll('.svg-content').remove()) }
  })
  return (
    <div id="container" className="svg-container" />
  )
}

const plotGraph = (labor: ILabor) => {
  const { calculated: { contraction } } = labor
  const durationData = contraction.durations.map((dur, i) => {
    return [i, dur] as [number, number]
  })
  const averageDurationData = contraction.averageDurations.map((dur, i) => {
    return [i, dur] as [number, number]
  })
  const tragetData = contraction.durations.map((dur, i) => [i, 60] as [number, number])
  const domain = calculateDomain(durationData)
  const width = window.innerWidth - 120;
  const height = 50;
  const graph = createGraph(width, height)
  const line = createLine(width, height, domain)
  addLineToGraph(graph, durationData, line, 'duration-line')
  addLineToGraph(graph, tragetData, line, 'target-line')
  addLineToGraph(graph, averageDurationData, line, 'average-duration-line')
}

function calculateDomain(durationData: [number, number][]) {
  return durationData.reduce((max, coord): { x: number, y: number } => {
    const x = coord[0] > max.x ? coord[0] : max.x
    const propposedYMax = coord[1] > max.y ? coord[1] : max.y
    const y = Math.max(propposedYMax, 65)
    return { x, y }
  }, { x: 1, y: 1 })
}

function createGraph(width: number, height: number) {
  const margin = 5;
  const padding = 5;
  const adj = 0;

  return d3.select('div#container')
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
}

function createLine(width: number, height: number, domain: { x: number, y: number }) {
  const xScale = d3.scaleLinear()
    .range([0, width])
    .domain([0, domain.x])

  const yScale = d3.scaleLinear()
    .rangeRound([height, 0])
    .domain([0, domain.y])

  return d3.line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))
}

function addLineToGraph(
  graph: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
  data: [number, number][],
  line: d3.Line<[number, number]>,
  className: string
) {
  graph.append('g')
    .data([data])
    .append('path')
    .attr('d', d => line(d))
    .attr('class', className)
}