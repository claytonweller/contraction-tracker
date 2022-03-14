import { DateTime } from "luxon"
import { ICalculatedLabor } from "../../types/CalculatedLabor"
import { ILabor } from "../../types/Labor"

export function checkIsGoTime(
  labor: ILabor, 
  contraction: ICalculatedLabor['contraction'], 
  rest: ICalculatedLabor['rest']
): boolean {
  // all of these values assume a First time labor/pregnancy
  const contractionsAreLongEnough = contraction.averageDuration > 60
  const restsAreShortEnough = rest.averageDuration < 180 
  return contractionsAreLongEnough && restsAreShortEnough && checkLaborIsLongEnough(labor)
}

function checkLaborIsLongEnough(labor:ILabor): boolean {
  const endTimes = labor.contractions
    .filter(contraction => contraction.endTime)
    .map(c => c.endTime as string) // Because of the filter these will always be defined
  const lastEndTime = endTimes[endTimes.length - 1]
  const startOfLabor = DateTime.fromISO(labor.startTime)
  const endOfLastContraction = DateTime.fromISO(lastEndTime)
  const durationOfLabor = endOfLastContraction.diff(startOfLabor, 'minutes').minutes
  return durationOfLabor > 60
}