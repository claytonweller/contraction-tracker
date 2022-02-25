import { createLabor } from "./create-labor"
import { updateLabor } from "./update-labor"
import { ILabor } from "../../../types/Labor"

const integration = (message: string) => console.warn('PlaceholderIntegration - ', message)

export const backend = {
  createLabor: () => createLabor(integration),
  updateLabor: (labor: ILabor) => updateLabor(integration, labor)
}