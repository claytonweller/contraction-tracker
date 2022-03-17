import { Duration } from "luxon"

export const roundDuration = (seconds: number, format: string = 'mm:ss') => {
  return Duration.fromMillis(seconds * 1000).toFormat(format)
}