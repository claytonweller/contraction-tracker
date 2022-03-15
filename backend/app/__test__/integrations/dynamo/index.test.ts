import { dynamo } from "../../../integrations/dyanmo";

describe('dynamo integration', ()=>{
  const expectedTables = ['labor']
  const tableNames = Object.keys(dynamo)
  expectedTables.forEach((tableName) =>{
    it(`should allow access to ${tableName}`, ()=>{
      expect(tableNames.includes(tableName)).toBe(true)
    })
  })
})