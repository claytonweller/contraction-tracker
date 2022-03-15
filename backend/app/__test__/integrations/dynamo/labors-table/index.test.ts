import { labor } from "../../../../integrations/dyanmo/labors-table"

describe('laborTable', ()=>{
  const mockClient = {} as unknown as AWS.DynamoDB.DocumentClient
  const laborTable = labor(mockClient)
  const expectedOperations = ['create', 'updateActive', 'get']
  const operationNames = Object.keys(laborTable)
  expectedOperations.forEach((operationName) =>{
    it(`should surface ${operationName}`, ()=>{
      expect(operationNames.includes(operationName)).toBe(true)
    })
  })
})