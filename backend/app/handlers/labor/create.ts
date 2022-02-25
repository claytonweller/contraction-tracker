import { withErrorHandling } from "../../utils/with-error-handling"
import { createLabor } from "../../integrations/dyanmo/labors-table/create"
import { defaultLabor } from "../../utils/default-labor"

async function createHandler(event) {
  console.log('CREATE', event)
  const result = await createLabor(defaultLabor())
  return result
}

export const handler = withErrorHandling(createHandler)