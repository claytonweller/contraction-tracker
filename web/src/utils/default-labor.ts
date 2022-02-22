import { DateTime } from "luxon";
import { ILabor } from "../../../types/Labor";

export const defaultLabor = (): ILabor => ({
  userId: 1,
  startTime: DateTime.now().toISO(),
  endTime: undefined,
  contractions: [],
  calculated: {
    contraction: {
      averageDuration: 6000,
      averageIntensity: 1,
      durations: [],
      intensities: []
    },
    rest: {
      current: 6000,
      average: 6000,
      durations: [],
    }
  },
  bishopScore: 0
})