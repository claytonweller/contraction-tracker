import { DateTime } from "luxon";
import { ILabor } from "../../types/Labor";

export const defaultLabor = (userId:string = "1"): ILabor => {
  const startTime = DateTime.now().toISO()
  return {
    userId,
    startTime,
    endTime: undefined,
    contractions: [],
    calculated: {
      isGoTime: false,
      contractionsAreLongEnough: false, 
      restsAreShortEnough: false, 
      laborIsLongEnough: false,
      contraction: {
        averageDuration: 0,
        averageIntensity: 0,
        averageDurations: [],
        durations: [],
        intensities: []
      },
      rest: {
        currentDuration: 0,
        averageDuration: 0,
        durations: [],
      }
    },
    bishopScore: 0
  }
}