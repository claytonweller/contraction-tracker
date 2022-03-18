import { DateTime } from "luxon";
import { checkIsGoTime } from "../../../utils/calculate-labor-values/check-is-go-time";
import { defaultLabor } from "../../../utils/default-labor";

describe('checkIsGoTime', ()=>{
  const baseContractionCalculations = {
    averageDuration: 1,
    averageIntensity: 1,
    durations: [1],
    intensities: [1],
    averageDurations:[1],
  }

  const baseRestClaculations = {
    averageDuration: 1,
    durations: [1],
  }
  describe('when the contractions are long enough', ()=>{
    const longContractions = {
      ...baseContractionCalculations,
      averageDuration:61 // one more than the threshold
    }
    
    describe('and the rests are short enough', ()=>{
      const shortRests = {
        ...baseRestClaculations,
        averageDuration: 179 // one less than the threshold
      }
      
      describe('and the labor is long enough', ()=>{
        const totalMinutesOfLabor = 61 // one more than the threshold
        const contractions = [{
          startTime: DateTime.now().minus({minutes:4}).toISO(),
          endTime: DateTime.now().toISO()
        }]
        const longLabor = defaultLabor({totalMinutesOfLabor, contractions})
        it('should return true', ()=>{
          expect(checkIsGoTime(longLabor, longContractions, shortRests)).toBe(true)
        })
      })

      describe('and the labor is NOT long enough', ()=>{
        it('should return false', ()=>{
          expect(checkIsGoTime(defaultLabor(), longContractions, shortRests))
        })
      })
    })

    describe('and the rests are NOT short enough', ()=>{
      it('should return false', ()=>{
        expect(checkIsGoTime(defaultLabor(), longContractions, baseRestClaculations))
      })
    })
  })

  describe('when the contraction are NOT long enough', ()=>{
    it('should return false', ()=>{
      expect(checkIsGoTime(defaultLabor(), baseContractionCalculations, baseRestClaculations))
    })
  })
})