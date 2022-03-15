import { updateActiveLabor } from "../../../../integrations/dyanmo/labors-table/update-active"
import { defaultLabor } from "../../../../utils/default-labor"
import { createMockClient } from "./mockClient";

describe('updateActiveLabor', ()=>{
  const baseParams = {TableName: 'value'}
  const activeLabor = { ...defaultLabor(), endTime: undefined}
  const inactiveLabor = {...defaultLabor(), endTime:'It Exists'}

  afterEach(()=> jest.clearAllMocks())

  describe('when no labors exist for the user', ()=>{
    const existingLabors = []
    const mockClient = createMockClient({existingLabors})
    let error
    beforeEach(async ()=>{
      try{
        await updateActiveLabor({updatedLabor: inactiveLabor}, mockClient, baseParams)
      } catch (e){
        error = e
      }
    })
    
    it('should get the existing labors for the user', ()=>{
      expect(mockClient.get).toHaveBeenCalledWith({
        Key: {userId: inactiveLabor.userId}, 
        ...baseParams
      })
    })

    it('should throw an error', ()=>{
      expect(error).toEqual(new Error(`No labors for user - ${inactiveLabor.userId}`))
    })
  
    it('should NOT add the new labor to the the user\'s labors', ()=>{
      expect(mockClient.put).not.toHaveBeenCalled()
    }) 
  })

  describe('when there are no ACTIVE labors for the user', ()=>{
    const existingLabors = [inactiveLabor]
    const mockClient = createMockClient({existingLabors})
    let error
    beforeEach(async ()=>{
      try{
        await updateActiveLabor({updatedLabor: inactiveLabor}, mockClient, baseParams)
      } catch (e){
        error = e
      }
    })
    
    it('should get the existing labors for the user', ()=>{
      expect(mockClient.get).toHaveBeenCalledWith({
        Key: {userId: inactiveLabor.userId}, 
        ...baseParams
      })
    })

    it('should throw an error', ()=>{
      expect(error).toEqual(new Error(`No active labors for user - ${inactiveLabor.userId}`))
    })
  
    it('should NOT add the new labor to the the user\'s labors', ()=>{
      expect(mockClient.put).not.toHaveBeenCalled()
    }) 
  })

  describe('where there is an active labor for the user', ()=>{
    const existingLabors = [activeLabor]
    const mockClient = createMockClient({existingLabors})
    let result
    beforeEach(async ()=>{
      result = await updateActiveLabor({updatedLabor: inactiveLabor}, mockClient, baseParams)
    })
    
    it('should get the existing labors for the user', ()=>{
      expect(mockClient.get).toHaveBeenCalledWith({
        Key: {userId: inactiveLabor.userId}, 
        ...baseParams
      })
    })
  
    it('should add the new labor to the the user\'s labors', ()=>{
      expect(mockClient.put).toHaveBeenCalledWith({
        "Item": {
          // The labors array is the same length as before the update!
          "labors": [ inactiveLabor ], 
          "userId": inactiveLabor.userId
        }, 
        ...baseParams
      })
    })
  
    it('should return the updated labor', ()=>{
      expect(result).toBe(inactiveLabor)
    })
  })
})