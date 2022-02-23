import { ILabor } from "../../../../types/Labor";

export function updateLabor(integration: (message: string) => void, labor: ILabor): ILabor {
  integration(`updateLabor --- ${JSON.stringify(labor)}`)
  return labor
}