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
      newLabor: ILabor
    ): Promise<ILabor> => createLabor({ newLabor }, client, baseParams),
    updateActive: async (
      updatedLabor: ILabor
    ): Promise<ILabor> => updateActiveLabor({ updatedLabor }, client, baseParams),
    getLabors: async (userId: string): Promise<ILabor[]> => getLabors({ userId }, client, baseParams)
  }
}

