import { createHandler as createLaborHandler } from "../../../handlers/labor/create";
import { dynamo } from "../../../integrations/dyanmo";
import * as calculateLaborValues from "../../../utils/calculate-labor-values";
import { defaultLabor } from "../../../utils/default-labor";


describe('createLaborHandler', ()=>{
  const dynamoSpy = jest.spyOn(dynamo.labor, 'create')
  const calculateSpy = jest.spyOn(calculateLaborValues, 'calculateLaborValues')
  beforeEach(()=>{
    jest.clearAllMocks()
    calculateSpy.mockImplementation((input)=> input)
  })
  const validLabor = {...defaultLabor(), endTime: undefined}

  describe('when the body is incorrectly formatted', ()=>{
    const incorrect = {body:JSON.stringify({startTime:'123'})}
    let error 
    beforeEach(async ()=>{
      try {  
        await createLaborHandler(incorrect)
      } catch (e){
        error = e
      }
    })  
    
    it('should throw an error', ()=>{
      expect(error).toMatchSnapshot()
    })

    it('should not attempt to persist the labor', ()=>{
      expect(dynamoSpy).not.toHaveBeenCalled()
    })
  })

  describe('when the body is correctly formatted', ()=>{
    const correct = {body:JSON.stringify(validLabor)}

    describe('and the labor is successfully persisted', ()=>{
      let result
      beforeEach(async()=>{
        dynamoSpy.mockResolvedValue(validLabor)
        result = await createLaborHandler(correct)
      })
      it('should return a correctly formatted labor', ()=>{
        expect(result).toEqual(validLabor)
      })
      it('calculates the labor values', ()=>{
        expect(calculateSpy).toHaveBeenCalledWith(validLabor)
      })
      it('should have attempted to persist the labor', ()=>{
        expect(dynamoSpy).toHaveBeenCalledWith(validLabor)
      })
    })

    describe('and the labor is NOT successfully persisted', ()=>{
      const message = 'KABOOM!'
      let error 
      beforeEach(async ()=>{
        dynamoSpy.mockRejectedValue(message)
        try {  
          await createLaborHandler(correct)
        } catch (e){
          error = e
        }
      })  
      it('should throw an error', ()=>{
        expect(error).toBe(message)
      })
      it('calculates the labor values', ()=>{
        expect(calculateSpy).toHaveBeenCalledWith(validLabor)
      })
      it('should have attempted to persist the labor', ()=>{
        expect(dynamoSpy).toHaveBeenCalledWith(validLabor)
      })
    })
  })
})