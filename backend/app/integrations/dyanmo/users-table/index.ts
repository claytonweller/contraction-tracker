import { IBaseDynamoParams } from '../'

const baseParams: IBaseDynamoParams = {
  TableName: 'usersTable'
}
const placeholderIntegration = (
  params, client, baseParams
) => console.warn(params, client, baseParams)

export function connectToUserTable(client: AWS.DynamoDB.DocumentClient) {
  return {
    create: async (params:any): Promise<any> => placeholderIntegration('CreateUser', client, baseParams),
    update: async (params:any): Promise<any> => placeholderIntegration('UpdateUser', client, baseParams),
    get: async (params:any): Promise<any> => placeholderIntegration('GetUser', client, baseParams),
  }
}
