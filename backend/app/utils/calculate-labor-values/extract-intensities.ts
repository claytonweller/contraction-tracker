import { IContraction } from "../../types/Contraction"
import { addToAllAndLastHour } from "./add-to-all-and-last-hour"

export function extractIntensities(contractions: IContraction[]) {
  return contractions.reduce((calculated, contraction): any => {
    const { intensity, endTime } = contraction
    if (!endTime || !intensity) return calculated
    return addToAllAndLastHour(calculated, intensity, contraction)
  }, { lastHour: [] as number[], all: [] as number[] })
}