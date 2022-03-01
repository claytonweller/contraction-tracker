import { IContraction } from "../../types/Contraction"
import { ILabor } from "../../types/Labor"
import { ICalculatedLabor } from "../../types/CalculatedLabor"
import { calculateAverage } from "./calculate-average"
import { extractDurations } from "./extract-durations"
import { addToAllAndLastHour } from "./add-to-all-and-last-hour"

export function calculateContractionValues(labor: ILabor): ICalculatedLabor['contraction'] {
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
  }, { lastHour: [] as number[], all: [] as number[] })
}