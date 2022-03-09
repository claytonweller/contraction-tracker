import { IBackendRequest } from ".";
import { ILabor } from "../../../types/Labor";
import { defaultLabor } from "../../utils/default-labor";

export async function getLabors(
  makeRequest: IBackendRequest, userId: string
): Promise<ILabor[]> {
  const labors = await makeRequest<ILabor[]>({
    path:`/labor/create?userId=${userId}`,
    method: 'GET'
  })
  return labors
}