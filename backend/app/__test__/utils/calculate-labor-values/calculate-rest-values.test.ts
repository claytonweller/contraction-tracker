import { DateTime } from "luxon";
import { calculateRestValues } from "../../../utils/calculate-labor-values/calculate-rest-values";
import { defaultLabor } from "../../../utils/default-labor";

describe('calculateRestValues', () => {
  it('should correctly format the claculated values', () => {
    const result = calculateRestValues(defaultLabor())
    expect(result).toEqual({
         averageDuration: 270,
         currentDuration: 1080,
         durations:  [
           300,
           240,
         ]
    })
  })

  describe('when a contraction is currently in progress', ()=>{
    const contractions = [{startTime:  DateTime.now().toISO()}]
    const result = calculateRestValues(defaultLabor({contractions}))
    it('should not return a currentDuration', ()=>{
      expect(result.currentDuration).toBeUndefined()
    })
  })
})