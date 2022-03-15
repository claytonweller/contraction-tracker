import { calculateLaborValues } from "../../../utils/calculate-labor-values";
import { defaultLabor } from "../../../utils/default-labor";

describe('calculateLaborValues', ()=>{
  const labor = calculateLaborValues(defaultLabor())
  it('correctly formats the calculated values', ()=>{
    expect(labor).toEqual({
      ...labor,
      calculated:{
        contraction:{
          averageDuration: 90,
          "averageIntensity": 1.5,
           "durations":  [
             60,
             120,
           ],
           "intensities":  [
             1,
             2,
           ],
         },
         "isGoTime": false,
         "rest":  {
           "averageDuration": 270,
           "currentDuration": 1080,
           "durations":  [
             300,
             240,
           ],
         },
       }
    })
  })
})