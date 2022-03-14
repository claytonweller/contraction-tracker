import { DateTime } from "luxon";
import { addToAllAndLastHour } from "../../../utils/calculate-labor-values/add-to-all-and-last-hour";

describe('addToAllAndLastHour', ()=>{
  const now = DateTime.now()
  const baseCalculated = {all:[1], lastHour:[1]}
  const value = 123
  
  describe('when the span is in the last hour', ()=>{
    const span = {
      startTime: now.minus({minutes:2}).toISO(),
      endTime: now.toISO()
    }
    const result = addToAllAndLastHour(baseCalculated, value, span)

    it('should add the value to all', ()=>{
      expect(result.all[1]).toBe(value)
    })
    it('should add the value to the lastHour', ()=>{
      expect(result.lastHour[1]).toBe(value)
    })
  })

  describe('when the span is NOT in the last hour', ()=>{
    const span = {
      startTime: now.minus({minutes:61}).toISO(),
      endTime: now.minus({minutes:60}).toISO()
    }
    const result = addToAllAndLastHour(baseCalculated, value, span)
    it('should add the value to all', ()=>{
      expect(result.all[1]).toBe(value)
    })
    it('should NOT add the value to the lastHour', ()=>{
      expect(result.lastHour[1]).toBe(undefined)
    })
  })
})