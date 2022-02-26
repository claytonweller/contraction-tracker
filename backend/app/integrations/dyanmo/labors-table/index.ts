import { createLabor } from "./create";
import { ILabor } from "../../../types/Labor";
import { IBaseDynamoParams } from '../'
import { updateActiveLabor } from "./update-active";
import { getLabors } from "./get";

const baseParams: IBaseDynamoParams = {
  TableName: 'laborsTable'
}

export function labor(client: AWS.DynamoDB.DocumentClient) {
  return {
    create: async (
      newLabor: ILabor, userId: string
    ): Promise<ILabor> => createLabor({ newLabor, userId }, client, baseParams),
    updateActive: async (
      updatedLabor: ILabor, userId: string
    ): Promise<ILabor> => updateActiveLabor({ updatedLabor, userId }, client, baseParams),
    getLabors: async (userId: string): Promise<ILabor[]> => getLabors({ userId }, client, baseParams)
  }
}

