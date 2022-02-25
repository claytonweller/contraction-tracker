import { createLabor } from "./create";
import { ILabor } from "../../../types/Labor";
import { IBaseDynamoParams } from '../'

const baseParams: IBaseDynamoParams = {
  TableName: 'laborsTable'
}

export function labor(client: AWS.DynamoDB.DocumentClient) {
  return {
    create: async (labor: ILabor): Promise<ILabor> => createLabor(labor, client, baseParams)
  }
}

