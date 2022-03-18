import { calculateContractionValues } from "../../../utils/calculate-labor-values/calculate-contraction-values";
import { defaultLabor } from "../../../utils/default-labor";

describe('calculateContractionValues', () => {
  it('should correctly format the calculated Values', () => {
    const result = calculateContractionValues(defaultLabor())
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
         "averageDurations":[90]
       })
  })
})