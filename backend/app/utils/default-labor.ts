import { DateTime } from "luxon";
import { ILabor } from "../types/Labor";

export const defaultLabor = (): ILabor => {
  const now = DateTime.now()
  return {
    userId: 1,
    startTime: now.minus({ minute: 30 }).toISO(),
    endTime: undefined,
    contractions: [
      {
        startTime: now.minus({ minute: 25 }).toISO(),
        endTime: now.minus({ minute: 24 }).toISO(),
        intensity: 1
      },
      {
        startTime: now.minus({ minute: 20 }).toISO(),
        endTime: now.minus({ minute: 18 }).toISO(),
        intensity: 2
      }

    ],
    calculated: {
      isGoTime: false,
      contraction: {
        averageDuration: 6000,
        averageIntensity: 1,
        durations: [],
        intensities: []
      },
      rest: {
        currentDuration: 6000,
        averageDuration: 6000,
        durations: [],
      }
    },
    bishopScore: 0
  }
}

