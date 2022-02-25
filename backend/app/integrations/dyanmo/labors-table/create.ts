import { ILabor } from "../../../types/Labor";
import { IBaseDynamoParams } from "../index";

export async function createLabor(newLabor: ILabor, client: AWS.DynamoDB.DocumentClient, baseParams: IBaseDynamoParams): Promise<ILabor> {
  const getParams = {
    ...baseParams,
    Key: {
      userId: "123"
    }
  }
  const response = await client.get(getParams).promise()
  const existingLabors = response?.Item?.labors || []
  const Item = {
    userId: "123",
    labors: [...existingLabors, newLabor]
  };
  const laborInfo = { ...baseParams, Item };
  await client.put(laborInfo).promise()
  return newLabor
}