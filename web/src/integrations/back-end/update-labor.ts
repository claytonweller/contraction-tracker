import { IBackendRequest } from ".";
import { ILabor } from "../../../types/Labor";

export async function updateLabor(
  makeRequest: IBackendRequest, labor:ILabor
): Promise<ILabor> {
  const updatedLabor = await makeRequest<ILabor>({
    path:'/labor/update',
    body: JSON.stringify(labor)
  })
  return updatedLabor
}