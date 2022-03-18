
import { ILabor } from "../../types/Labor"
import { calculateContractionValues } from "./calculate-contraction-values"
import { calculateRestValues } from "./calculate-rest-values"
import { checkGoTimeValues } from "./check-go-time-values"

export function calculateLaborValues(labor: ILabor): ILabor {
  const contraction = calculateContractionValues(labor)
  const rest = calculateRestValues(labor)
  const goTimeValues = checkGoTimeValues(labor, contraction, rest)
  return {
    ...labor,
    calculated: {
      contraction,
      rest,
      ...goTimeValues, 
    }
  }
}


