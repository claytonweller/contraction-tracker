import { calculateContractionValues } from "../app/utils/calculate-labor-values/calculate-contraction-values";
import { defaultLabor } from "../app/utils/default-labor";

describe('calculateContractionValues', () => {
  const result = calculateContractionValues(defaultLabor())
  it('should correctly calculate the values', () => {
    expect(result).toEqual({
         "averageDuration": 90,
         "averageIntensity": 1.5,
         "durations":  [
           60,
           120,
         ],
         "intensities": [
           1,
           2,
         ],
       })
  })
})