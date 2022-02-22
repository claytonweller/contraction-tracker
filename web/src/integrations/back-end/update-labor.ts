import { ILabor } from "../../../../types/Labor";

export function updateLabor(integration: (message: string) => void, labor: ILabor): ILabor {
  integration(`updateLabor --- ${labor}`)
  return labor
}