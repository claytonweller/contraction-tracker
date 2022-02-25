import { withErrorHandling } from "../../utils/with-error-handling"
import { defaultLabor } from "../../utils/default-labor"
import { dynamo } from "../../integrations/dyanmo"

async function createHandler(event) {
  console.log('CREATE', event)
  const result = await dynamo.labor.create(defaultLabor())
  return result
}

export const handler = withErrorHandling(createHandler)