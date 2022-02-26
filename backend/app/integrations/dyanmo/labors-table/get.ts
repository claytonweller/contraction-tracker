import { ILabor } from "../../../types/Labor";
import { IBaseDynamoParams } from "../index";

export async function getLabors(
  params: { userId: string },
  client: AWS.DynamoDB.DocumentClient,
  baseParams: IBaseDynamoParams
): Promise<ILabor[]> {
  const { userId } = params;
  const getParams = {
    ...baseParams,
    Key: { userId }
  }
  const response = await client.get(getParams).promise()
  const existingLabors: ILabor[] = response?.Item?.labors || []
  return existingLabors
}