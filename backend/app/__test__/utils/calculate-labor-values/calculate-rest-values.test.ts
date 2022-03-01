import { calculateRestValues } from "../../../utils/calculate-labor-values/calculate-rest-values";
import { defaultLabor } from "../../../utils/default-labor";

describe('calculateRestValues', () => {
  const result = calculateRestValues(defaultLabor())
  it('should correctly calculate the values', () => {
    expect(result).toEqual({
         averageDuration: 270,
         currentDuration: 1080,
         durations:  [
           300,
           240,
         ]
    })
  })
})