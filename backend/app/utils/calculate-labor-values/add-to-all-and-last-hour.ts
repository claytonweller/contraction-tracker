import { DateTime } from "luxon"
import { IContraction } from "../../types/Contraction"
import { IRest } from "./calculate-rest-values"

export function addToAllAndLastHour(
  calculated: { all: number[], lastHour: number[] },
  newValue: number,
  span: IContraction | IRest
) {
  const all = [...calculated.all, newValue]
  const lastHour = isInLastHour(span)
    ? [...calculated.lastHour, newValue]
    : calculated.lastHour
  return { all, lastHour }
}

function isInLastHour(span: IContraction): boolean {
  const start = DateTime.fromISO(span.startTime)
  return DateTime.now().diff(start, 'minutes').minutes < 60
}