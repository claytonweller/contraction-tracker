import { DateTime } from "luxon"
import { ICalculatedLabor } from "../../types/CalculatedLabor"
import { IContraction } from "../../types/Contraction"
import { ILabor } from "../../types/Labor"
import { calculateAverage } from "./calculate-average"
import { extractDurations } from "./extract-durations"

export function calculateContractionValues(labor: ILabor): ICalculatedLabor['rest'] {
  const { contractions, startTime } = labor

  const rests = calculateRests(contractions, startTime)
  const { lastHour: lastHourDurations, all: durations } = extractDurations(contractions)
  const averageDuration = calculateAverage(lastHourDurations)
  const currentRest = rests.filter(rest => !rest.endTime)[0]
  const currentDuration = currentRest
    ? DateTime.now().diff(DateTime.fromISO(currentRest.startTime), 'seconds').seconds
    : undefined
    
  return {
    durations,
    currentDuration,
    averageDuration,
  }
}

function calculateRests(contractions:IContraction[], laborStartTime: string):IRest[]{
  const rests: IRest[] = []
  for (let i = 0; i < contractions.length; i++) {
    const earlierContraction = contractions[i-1]
    const laterContraction = contractions[i]
    const startTime = earlierContraction?.endTime || laborStartTime  
    const endTime = laterContraction.startTime
    rests.push({startTime, endTime})
  }
  const finalContraction = contractions[contractions.length - 1]
  if(finalContraction.endTime) rests.push({startTime: finalContraction.endTime})
  return rests
}

export interface IRest {
  startTime:string , endTime?:string
}