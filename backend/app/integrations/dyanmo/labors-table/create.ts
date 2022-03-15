import { ILabor } from "../../../types/Labor";
import { IBaseDynamoParams } from "../index";
import { getLabors } from "./get";

export async function createLabor(
  params: { newLabor: ILabor },
  client: AWS.DynamoDB.DocumentClient,
  baseParams: IBaseDynamoParams
): Promise<ILabor> {
  const { newLabor } = params
  const {userId} = newLabor
  const labors = await getLabors({ userId }, client, baseParams)
  console.warn(labors)
  const Item = {
    userId,
    labors: [...labors, newLabor]
  };
  const laborInfo = { ...baseParams, Item };
  await client.put(laborInfo).promise()
  return newLabor
}