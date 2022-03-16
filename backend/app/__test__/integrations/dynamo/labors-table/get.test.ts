import { getLabors } from "../../../../integrations/dyanmo/labors-table/get"
import { defaultLabor } from "../../../../utils/default-labor"
import { createMockClient, fakeAWSPromise } from "../mockClient";

describe('getLabors', ()=>{

  const baseParams = {TableName: 'value'}
  const userId = '123'

  afterEach(()=> {
    jest.clearAllMocks()
  })


  describe('when the response is empty', ()=>{
    const mockClient = createMockClient()
    mockClient.get = jest.fn().mockImplementation(()=> fakeAWSPromise({}))
    let result
    beforeEach(async ()=>{
      result = await getLabors({userId}, mockClient, baseParams)
    })
    it('should get the existing labors for the user', ()=>{
      expect(mockClient.get).toHaveBeenCalledWith({
        Key: {userId}, 
        ...baseParams
      })
    })
  
    it('should return an empty array', ()=>{
      expect(result).toEqual([])
    })
  })

  describe('when there is is no "labor" key on the response', ()=>{
    const mockClient = createMockClient()
    mockClient.get = jest.fn().mockImplementation(()=> fakeAWSPromise({Item:{}}))
    let result
    beforeEach(async ()=>{
      result = await getLabors({userId}, mockClient, baseParams)
    })
    it('should get the existing labors for the user', ()=>{
      expect(mockClient.get).toHaveBeenCalledWith({
        Key: {userId}, 
        ...baseParams
      })
    })
  
    it('should return an empty array', ()=>{
      expect(result).toEqual([])
    })
  })

  describe('when there are labors on the response', ()=>{
    const existingLabors = [defaultLabor()]
    const mockClient = createMockClient({existingLabors})
    let result
    beforeEach(async ()=>{
      result = await getLabors({userId}, mockClient, baseParams)
    })
    it('should get the existing labors for the user', ()=>{
      expect(mockClient.get).toHaveBeenCalledWith({
        Key: {userId}, 
        ...baseParams
      })
    })
  
    it('should return the labors', ()=>{
      expect(result).toBe(existingLabors)
    })
  })
})