import { IBackendRequest } from ".";
import { ILabor } from "../../../types/Labor";
import { defaultLabor } from "../../utils/default-labor";

export async function createLabor(
  makeRequest: IBackendRequest, userId: string
): Promise<ILabor> {
  const labor = defaultLabor(userId)
  const createdLabor = await makeRequest<ILabor>({
    path:'/labor/create',
    body: JSON.stringify(labor)
  })
  return createdLabor
}