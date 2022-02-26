import { ILabor } from "../types/Labor"
import { ICalculatedLabor } from "../types/CalculatedLabor"
import { DateTime } from "luxon"
import { IContraction } from "../types/Contraction"

export function calculateLaborValues(labor: ILabor): ILabor {
  const contraction = calculateContractionValues(labor)
  const rest = calculateRestValues(labor)
  return {
    ...labor,
    calculated: {
      contraction,
      rest
    }
  }
}

function calculateContractionValues(labor: ILabor): ICalculatedLabor['contraction'] {
  const { contractions } = labor

  const { lastHour: lastHourIntensities, all: intensities } = extractIntesities(contractions)
  const { lastHour: lastHourDurations, all: durations } = extractDurations(contractions)
  const averageDuration = calculateAverage(lastHourDurations)
  const averageIntensity = calculateAverage(lastHourIntensities)

  return {
    durations,
    intensities,
    averageDuration,
    averageIntensity
  }
}

function extractIntesities(contractions: IContraction[]) {
  return contractions.reduce((calculated, contraction): any => {
    const { intensity, endTime } = contraction
    if (!endTime || !intensity) return calculated
    return addToAllAndLastHour(calculated, intensity, contraction)
  }, { lastHour: [], all: [] })
}

function extractDurations(contractions: IContraction[]) {
  return contractions.reduce((calculated, contraction): any => {
    const { endTime, startTime } = contraction
    if (!endTime) return calculated
    const duration = calculateDuration(startTime, endTime)
    if (duration <= 0) return calculated
    return addToAllAndLastHour(calculated, duration, contraction)
  }, { lastHour: [], all: [] })
}}

function addToAllAndLastHour(
  calculated: { all: number[], lastHour: number[] },
  newValue: number,
  contraction: IContraction
) {
  const all = [...calculated.all, newValue]
  const lastHourDurations = isInLastHour(contraction)
    ? [...calculated.lastHour, newValue]
    : calculated.lastHour
  return { all, lastHourDurations }
}

function isInLastHour(contraction: IContraction): boolean {
  const start = DateTime.fromISO(contraction.startTime)
  return DateTime.now().diff(start, 'minutes').minutes < 60
}

function calculateAverage(arr: number[]): number {
  const total = arr.reduce((sum, duration) => sum + duration, 0)
  return total / arr.length
}

function calculateDuration(startTime: string, endTime?: string): number {
  if (!endTime) return 0
  const start = DateTime.fromISO(startTime)
  const end = DateTime.fromISO(endTime)
  return end.diff(start, 'seconds').seconds
}

function calculateRestValues(labor: ILabor): ICalculatedLabor['rest'] {
  return {
    current: 1,
    average: 1,
    durations: [1]
  }
}