import { createLabor } from "../../../../integrations/dyanmo/labors-table/create"
import { defaultLabor } from "../../../../utils/default-labor"
import { createMockClient } from "../mockClient";

describe('createLabor', ()=>{
  const existingLabors = [defaultLabor()]
  const newLabor = {...defaultLabor(), endTime:'It Exists'}
  const mockClient = createMockClient({existingLabors})

  const baseParams = {TableName: 'value'}

  let result
  beforeEach(async ()=>{
    result = await createLabor({newLabor}, mockClient, baseParams)
  })

  afterEach(()=> jest.clearAllMocks())

  it('should get the existing labors for the user', ()=>{
    expect(mockClient.get).toHaveBeenCalledWith({
      Key: {userId: newLabor.userId}, 
      ...baseParams
    })
  })

  it('should add the new labor to the the user\'s labors', ()=>{
    expect(mockClient.put).toHaveBeenCalledWith({
      "Item": {
        "labors": [
          ...existingLabors,
          newLabor
        ], 
        "userId": newLabor.userId
      }, 
      ...baseParams
    })
  })

  it('should return the new labor', ()=>{
    expect(result).toBe(newLabor)
  })
})