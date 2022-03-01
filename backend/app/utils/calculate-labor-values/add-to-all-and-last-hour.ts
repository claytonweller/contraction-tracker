import { DateTime } from "luxon"
import { IContraction } from "../../types/Contraction"

export function addToAllAndLastHour(
  calculated: { all: number[], lastHour: number[] },
  newValue: number,
  contraction: IContraction
) {
  const all = [...calculated.all, newValue]
  const lastHour = isInLastHour(contraction)
    ? [...calculated.lastHour, newValue]
    : calculated.lastHour
  return { all, lastHour }
}

function isInLastHour(contraction: IContraction): boolean {
  const start = DateTime.fromISO(contraction.startTime)
  return DateTime.now().diff(start, 'minutes').minutes < 60
}