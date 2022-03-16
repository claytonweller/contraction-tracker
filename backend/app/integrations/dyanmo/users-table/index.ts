import { IBaseDynamoParams } from '../'

const baseParams: IBaseDynamoParams = {
  TableName: 'usersTable'
}

export function connectToUserTable(client: AWS.DynamoDB.DocumentClient) {
  return {
    create: async (): Promise<any> => console.warn('CreateUser', baseParams),
    update: async (): Promise<any> => console.warn('UpdateUser', baseParams),
    get: async (): Promise<any> => console.warn('GetUser', baseParams),
  }
}
