import { dynamo } from "../../integrations/dyanmo"
import { withErrorHandling } from "../../utils/with-error-handling"

export async function createHandler(event) {
  const params = JSON.parse(event.body)
  const createdUser = await dynamo.user.create(params)
  return createdUser
}

export const handler = withErrorHandling(createHandler)