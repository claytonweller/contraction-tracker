import { connectToLaborTable } from "../../../../integrations/dyanmo/labors-table"

describe('connectToLaborTable', ()=>{
  const mockClient = {} as unknown as AWS.DynamoDB.DocumentClient
  const laborTable = connectToLaborTable(mockClient)
  const expectedOperations = ['create', 'updateActive', 'get']
  const operationNames = Object.keys(laborTable)
  expectedOperations.forEach((operationName) =>{
    it(`should surface ${operationName}`, ()=>{
      expect(operationNames.includes(operationName)).toBe(true)
    })
  })
})