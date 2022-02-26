import { ILabor } from "../../../types/Labor";
import { IBaseDynamoParams } from "../index";
import { getLabors } from "./get";

export async function updateActiveLabor(
  params: { updatedLabor: ILabor, userId: string },
  client: AWS.DynamoDB.DocumentClient,
  baseParams: IBaseDynamoParams
): Promise<ILabor> {
  const { userId, updatedLabor } = params
  const existingLabors = await getLabors({ userId }, client, baseParams)
  if (!existingLabors.length) throw new Error(`No labors for user - ${userId}`)

  const labors = [...existingLabors]
  const lastLabor = labors.pop()
  if (lastLabor?.endTime) throw new Error(`No active labors for user - ${userId}`)

  const Item = {
    userId: "123",
    labors: [...labors, updatedLabor]
  };
  const laborInfo = { ...baseParams, Item };
  await client.put(laborInfo).promise()
  return updatedLabor
}