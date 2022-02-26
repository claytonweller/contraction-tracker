import { ILabor } from "../../../types/Labor";
import { IBaseDynamoParams } from "../index";
import { getLabors } from "./get";

export async function createLabor(
  params: { newLabor: ILabor, userId: string },
  client: AWS.DynamoDB.DocumentClient,
  baseParams: IBaseDynamoParams
): Promise<ILabor> {
  const { newLabor, userId } = params
  const labors = await getLabors({ userId }, client, baseParams)
  const Item = {
    userId,
    labors: [...labors, newLabor]
  };
  const laborInfo = { ...baseParams, Item };
  await client.put(laborInfo).promise()
  return newLabor
}