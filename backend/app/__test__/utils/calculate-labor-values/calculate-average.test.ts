import { calculateAverage } from "../../../utils/calculate-labor-values/calculate-average";

describe('calculateAverage', ()=>{
  describe('when the array is empty',()=>{
    it('should return 0', ()=>{
      expect(calculateAverage([])).toBe(0)
    })
  })

  describe('when the array has number values', ()=>{
    it('should return the average of the values', ()=>{
      expect(calculateAverage([1,2,3])).toBe(2)
    })
  })
})