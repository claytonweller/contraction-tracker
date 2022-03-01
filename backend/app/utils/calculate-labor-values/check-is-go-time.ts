import { DateTime } from "luxon"
import { ICalculatedLabor } from "../../types/CalculatedLabor"
import { ILabor } from "../../types/Labor"

export function checkIsGoTime(
  labor: ILabor, 
  contraction: ICalculatedLabor['contraction'], 
  rest: ICalculatedLabor['rest']
): boolean {
  const contractionsAreLongEnough = contraction.averageDuration > 60
  const restsAreShortEnough = rest.averageDuration < 360 
  return contractionsAreLongEnough && restsAreShortEnough && checkLaborIsLongEnough(labor)
}

function checkLaborIsLongEnough(labor:ILabor): boolean {
  const completedContractions = labor.contractions.filter(contraction => contraction.endTime)
  const lastCompletedContraction = completedContractions[completedContractions.length - 1]
  if(!lastCompletedContraction?.endTime) return false
  const startOfLabor = DateTime.fromISO(labor.startTime)
  const endOfLastContraction = DateTime.fromISO(lastCompletedContraction.endTime)
  const durationOfLabor = endOfLastContraction.diff(startOfLabor, 'minutes').minutes
  return durationOfLabor > 60
}