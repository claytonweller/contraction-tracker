import { DateTime } from "luxon";
import { extractIntensities } from "../../../utils/calculate-labor-values/extract-intensities";

describe('extractIntensities', ()=>{
  const now = DateTime.now()
  const validContraction = {
    startTime: now.minus({minute:2}).toISO(),
    endTime: DateTime.now().toISO(),
    intensity: 1
  }

  describe('when the contraction array is empty', ()=>{
    const result = extractIntensities([])
    it('should return empty arrays in the result', ()=>{
      expect(result).toEqual({lastHour:[], all:[]})
    })
  })

  describe('when the array contains a contraction without an end time', ()=>{
    const noEnd = {...validContraction, endTime: undefined}
    it('should not add that duration to the result', ()=>{
      const result = extractIntensities([noEnd])
      expect(result.all).toEqual([])
      expect(result.lastHour).toEqual([])
    })
    describe('and there are other, valid contractions', ()=>{     
      const result = extractIntensities([noEnd, validContraction])
      it('should still return the valid durations in the result', ()=>{
        expect(result.all.length).toEqual(1)
        expect(result.lastHour.length).toEqual(1)
      })
    })
  })

  describe('when the array contains a contraction without an intensity', ()=>{
    const noEnd = {...validContraction, intensity: undefined}
    it('should not add that duration to the result', ()=>{
      const result = extractIntensities([noEnd])
      expect(result.all).toEqual([])
      expect(result.lastHour).toEqual([])
    })
    describe('and there are other, valid contractions', ()=>{     
      const result = extractIntensities([noEnd, validContraction])
      it('should still return the valid durations in the result', ()=>{
        expect(result.all.length).toEqual(1)
        expect(result.lastHour.length).toEqual(1)
      })
    })
  })

  // TODO I might want this to be true...

  // describe('when the array contains a contraction where the start is after the end', ()=>{
  //   const invalidContraction = {
  //     endTime: DateTime.now().minus({minute:2}).toISO(),
  //     startTime: DateTime.now().toISO()
  //   }
  //   it('should not add that duration to the result', ()=>{
  //     const result = extractIntensities([invalidContraction])
  //     expect(result.all).toEqual([])
  //     expect(result.lastHour).toEqual([])
  //   })
  //   describe('and there are other, valid contractions', ()=>{
  //     it('should still return the valid durations in the result', ()=>{
  //       const result = extractIntensities([invalidContraction, validContraction])
  //       expect(result.all.length).toEqual(1)
  //       expect(result.lastHour.length).toEqual(1)
  //     })
  //   })
  // })

  describe('when it recieves multiple valid contractions', ()=>{
    const result = extractIntensities([validContraction, validContraction])
    it('should return inensities in an array', ()=>{
        expect(result.all[0]).toBe(1)
        expect(result.lastHour[0]).toBe(1)
    })
    it('should return results for all valid contractions', ()=>{
      expect(result.all.length).toBe(2)
      expect(result.lastHour.length).toBe(2)
    })
  })

  describe('when a contraction is older than 1 hour', ()=>{
    const startTime = DateTime.now().minus({hours:2})
    const oldContraction = {
      startTime:startTime.toISO(),
      endTime: startTime.plus({minutes:2}).toISO(),
      intensity: 1,
    }
    const result = extractIntensities([oldContraction])
    it('should include it in the all result', ()=>{
      expect(result.all).toEqual([1])
    })
    it('should NOT include it in the lastHour result', ()=>{
      expect(result.lastHour).toEqual([])
    })
  })
})