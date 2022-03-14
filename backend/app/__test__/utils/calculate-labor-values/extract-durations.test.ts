import { DateTime } from "luxon"
import { extractDurations } from "../../../utils/calculate-labor-values/extract-durations"

describe('extractDurations', ()=>{
  const validSpan = {
    startTime: DateTime.now().minus({minute:2}).toISO(),
    endTime: DateTime.now().toISO()
  }

  describe('when the span array is empty', ()=>{
    const result = extractDurations([])
    it('should return empty arrays in the result', ()=>{
      expect(result).toEqual({lastHour:[], all:[]})
    })
  })

  describe('when the array contains a span without an end time', ()=>{
    const noEnd = {startTime: DateTime.now().toISO()}
    it('should not add that duration to the result', ()=>{
      const result = extractDurations([noEnd])
      expect(result.all).toEqual([])
      expect(result.lastHour).toEqual([])
    })
    describe('and there are other, valid spans', ()=>{     
      const result = extractDurations([noEnd, validSpan])
      it('should still return the valid durations in the result', ()=>{
        expect(result.all.length).toEqual(1)
        expect(result.lastHour.length).toEqual(1)
      })
    })
  })

  describe('when the array contains a span where the start is after the end', ()=>{
    const invalidSpan = {
      endTime: DateTime.now().minus({minute:2}).toISO(),
      startTime: DateTime.now().toISO()
    }
    it('should not add that duration to the result', ()=>{
      const result = extractDurations([invalidSpan])
      expect(result.all).toEqual([])
      expect(result.lastHour).toEqual([])
    })
    describe('and there are other, valid spans', ()=>{
      it('should still return the valid durations in the result', ()=>{
        const result = extractDurations([invalidSpan, validSpan])
        expect(result.all.length).toEqual(1)
        expect(result.lastHour.length).toEqual(1)
      })
    })
  })

  describe('when it recieves multiple valid spans', ()=>{
    const result = extractDurations([validSpan, validSpan])
    it('should return durations in seconds', ()=>{
        expect(result.all[0]).toBe(120)
        expect(result.lastHour[0]).toBe(120)
    })
    it('should return results for all valid spans', ()=>{
      expect(result.all.length).toBe(2)
      expect(result.lastHour.length).toBe(2)
    })
  })

  describe('when a span is older than 1 hour', ()=>{
    const startTime = DateTime.now().minus({hours:2})
    const oldSpan = {
      startTime:startTime.toISO(),
      endTime: startTime.plus({minutes:2}).toISO()
    }
    const result = extractDurations([oldSpan])
    it('should include it in the all result', ()=>{
      expect(result.all).toEqual([120])
    })
    it('should NOT include it in the lastHour result', ()=>{
      expect(result.lastHour).toEqual([])
    })
  })
})