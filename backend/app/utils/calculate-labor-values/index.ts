import { ILabor } from "../../types/Labor"
import { ICalculatedLabor } from "../../types/CalculatedLabor"
import { calculateContractionValues } from "./calculate-contraction-values"

export function calculateLaborValues(labor: ILabor): ILabor {
  const contraction = calculateContractionValues(labor)
  const rest = calculateRestValues(labor)
  return {
    ...labor,
    calculated: {
      isGoTime: false,
      contraction,
      rest
    }
  }
}


function calculateRestValues(labor: ILabor): ICalculatedLabor['rest'] {
  return {
    currentDuration: 1,
    averageDuration: 1,
    durations: [1]
  }
}