
import { ILabor } from "../../types/Labor"
import { calculateContractionValues } from "./calculate-contraction-values"
import { calculateRestValues } from "./calculate-rest-values"
import { checkIsGoTime } from "./check-is-go-time"

export function calculateLaborValues(labor: ILabor): ILabor {
  const contraction = calculateContractionValues(labor)
  const rest = calculateRestValues(labor)
  const isGoTime = checkIsGoTime(labor, contraction, rest)
  return {
    ...labor,
    calculated: {
      contraction,
      rest,
      isGoTime, 
    }
  }
}


