import { DateTime } from "luxon"
import { IContraction } from "../../types/Contraction"
import { addToAllAndLastHour } from "./add-to-all-and-last-hour"
import { IRest } from "./calculate-rest-values"

export function extractDurations(spans: (IContraction | IRest)[]) {
  return spans.reduce((calculated, span): any => {
    const { endTime, startTime } = span
    if (!endTime) return calculated
    const duration = calculateDuration(startTime, endTime)
    if (duration <= 0) return calculated
    return addToAllAndLastHour(calculated, duration, span)
  }, { lastHour: [], all: [] })
}

function calculateDuration(startTime: string, endTime?: string): number {
  if (!endTime) return 0
  const start = DateTime.fromISO(startTime)
  const end = DateTime.fromISO(endTime)
  return end.diff(start, 'seconds').seconds
}