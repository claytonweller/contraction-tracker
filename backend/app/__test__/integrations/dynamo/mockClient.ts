import { ILabor } from "../../../types/Labor"
import { defaultLabor } from "../../../utils/default-labor"

export const fakeAWSPromise = (output)=>{
  return {promise:() => new Promise(resolve => resolve(output))}
}

export const createMockClient = (params: {existingLabors?: ILabor[]} = {})=>{
  const {
    existingLabors = [defaultLabor()]
  } = params;

  return{
    get: jest.fn().mockImplementation(()=> fakeAWSPromise({Item:{labors:existingLabors}})),
    put: jest.fn().mockImplementation(()=> fakeAWSPromise('does not matter'))
  } as unknown as AWS.DynamoDB.DocumentClient
} 