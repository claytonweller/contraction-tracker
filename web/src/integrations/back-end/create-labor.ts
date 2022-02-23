import { ILabor } from "../../../../types/Labor";
import { defaultLabor } from "../../utils/default-labor";

export function createLabor(integration: (message: string) => void): ILabor {
  const labor = defaultLabor()
  integration(`CreateLabor -- ${JSON.stringify(labor)}`)
  return defaultLabor()
}