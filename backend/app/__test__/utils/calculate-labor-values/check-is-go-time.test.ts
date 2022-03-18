import { DateTime } from "luxon";
import { checkGoTimeValues } from "../../../utils/calculate-labor-values/check-go-time-values";
import { defaultLabor } from "../../../utils/default-labor";

describe('checkGoTimeValues', ()=>{
  const baseContractionCalculations = {
    averageDuration: 1,
    averageIntensity: 1,
    durations: [1],
    intensities: [1],
    averageDurations:[1],
  }

  const baseRestClaculations = {
    averageDuration: 200,
    durations: [200],
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
        const result = checkGoTimeValues(longLabor, longContractions, shortRests)

        it('should be go-time', ()=>{
          expect(result.isGoTime).toBe(true)
        })

        Object.entries(result).forEach(([key, value]) =>{
          it(`should have true for ${key}`, ()=> expect(value).toBe(true))
        })
      })

      describe('and the labor is NOT long enough', ()=>{
        const result = checkGoTimeValues(defaultLabor(), longContractions, shortRests)
        it('should not be go-time', ()=>{
          expect(result.isGoTime).toBe(false)
        })
        it('should note that the labor is NOT long enough', ()=>{
          expect(result.laborIsLongEnough).toBe(false)
        })
      })
    })

    describe('and the rests are NOT short enough', ()=>{
      const result = checkGoTimeValues(defaultLabor(), longContractions, baseRestClaculations)
      it('should not be go-time', ()=>{
        expect(result.isGoTime).toBe(false)
      })

      it('should note that the rests are NOT short enough', ()=>{
        expect(result.restsAreShortEnough).toBe(false)
      })
    })
  })

  describe('when the contractions are NOT long enough', ()=>{
    const result = checkGoTimeValues(defaultLabor(), baseContractionCalculations, baseRestClaculations)
    it('should not be go-time', ()=>{
      expect(result.isGoTime).toBe(false)
    })
    it('should note that the contractions are NOT long enough', ()=>{
      expect(result.contractionsAreLongEnough).toBe(false)
    })
  })
})