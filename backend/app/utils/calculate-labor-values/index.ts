import { ILabor } from "../../types/Labor"
import { ICalculatedLabor } from "../../types/CalculatedLabor"
import { calculateContractionValues } from "./calculate-contraction-values"

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


function calculateRestValues(labor: ILabor): ICalculatedLabor['rest'] {
  return {
    current: 1,
    average: 1,
    durations: [1]
  }
}