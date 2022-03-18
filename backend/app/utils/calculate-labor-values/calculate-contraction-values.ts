import { ILabor } from "../../types/Labor"
import { ICalculatedLabor } from "../../types/CalculatedLabor"
import { calculateAverage } from "./calculate-average"
import { extractDurations } from "./extract-durations"
import { extractIntensities } from "./extract-intensities"

export function calculateContractionValues(labor: ILabor): ICalculatedLabor['contraction'] {
  const { contractions, calculated } = labor

  const { lastHour: lastHourIntensities, all: intensities } = extractIntensities(contractions)
  const { lastHour: lastHourDurations, all: durations } = extractDurations(contractions)
  const averageDuration = calculateAverage(lastHourDurations)
  const averageIntensity = calculateAverage(lastHourIntensities)
  const oldAverageDurations = calculated.contraction.averageDurations

  const averageDurations = oldAverageDurations.length < durations.length 
    ? [...oldAverageDurations, averageDuration ]
    : oldAverageDurations

  return {
    durations,
    intensities,
    averageDuration,
    averageDurations,
    averageIntensity,
  }
}