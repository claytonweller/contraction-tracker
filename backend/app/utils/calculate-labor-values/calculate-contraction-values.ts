import { ILabor } from "../../types/Labor"
import { ICalculatedLabor } from "../../types/CalculatedLabor"
import { calculateAverage } from "./calculate-average"
import { extractDurations } from "./extract-durations"
import { extractIntensities } from "./extract-intensities"

export function calculateContractionValues(labor: ILabor): ICalculatedLabor['contraction'] {
  const { contractions } = labor

  const { lastHour: lastHourIntensities, all: intensities } = extractIntensities(contractions)
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