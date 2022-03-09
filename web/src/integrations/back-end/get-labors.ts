import { IBackendRequest } from ".";
import { ILabor } from "../../../types/Labor";

export async function getLabors(
  makeRequest: IBackendRequest, userId: string
): Promise<ILabor[]> {
  const labors = await makeRequest<ILabor[]>({
    path:`/labor/get?userId=${userId}`,
    method: 'GET'
  })
  return labors
}