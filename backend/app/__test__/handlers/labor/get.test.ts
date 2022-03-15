import { getHandler as getLaborsHandler } from "../../../handlers/labor/get";
import { dynamo } from "../../../integrations/dyanmo";
import { defaultLabor } from "../../../utils/default-labor";

describe('updateLaborHandler', ()=>{
  const dynamoSpy = jest.spyOn(dynamo.labor, 'get')
  beforeEach(()=>{
    jest.clearAllMocks()
  })
  const validLabor = {...defaultLabor(), endTime: undefined}

  describe('when the body is incorrectly formatted', ()=>{
    const incorrect = {queryStringParameters:{noUserId: 'to be found'}}
    let error 
    beforeEach(async ()=>{
      try {  
        await getLaborsHandler(incorrect)
      } catch (e){
        error = e
      }
    })  
    
    it('should throw an error', ()=>{
      expect(error).toMatchSnapshot()
    })

    it('should not attempt to get labors', ()=>{
      expect(dynamoSpy).not.toHaveBeenCalled()
    })
  })

  describe('when the body is correctly formatted', ()=>{
    const userId = 'is present'
    const correct = {queryStringParameters:{userId}}

    describe('and the request for labors succeeds', ()=>{
      let result
      beforeEach(async()=>{
        dynamoSpy.mockResolvedValue([validLabor])
        result = await getLaborsHandler(correct)
      })
      it('should return a correctly formatted labor', ()=>{
        expect(result).toEqual([validLabor])
      })
      it('should have attempted to persist the labor', ()=>{
        expect(dynamoSpy).toHaveBeenCalledWith(userId)
      })
    })

    describe('and the request fails', ()=>{
      const message = 'KABOOM!'
      let error 
      beforeEach(async ()=>{
        dynamoSpy.mockRejectedValue(message)
        try {  
          await getLaborsHandler(correct)
        } catch (e){
          error = e
        }
      })  
      it('should throw an error', ()=>{
        expect(error).toBe(message)
      })
      it('should have attempted to persist the labor', ()=>{
        expect(dynamoSpy).toHaveBeenCalledWith(userId)
      })
    })
  })
})