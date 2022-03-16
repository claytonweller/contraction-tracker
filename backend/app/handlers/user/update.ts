import { dynamo } from "../../integrations/dyanmo"
import { withErrorHandling } from "../../utils/with-error-handling"

export async function updateHandler(event) {
  const params = JSON.parse(event.body)
  const updatedUser = await dynamo.user.update(params)
  return updatedUser
}

export const handler = withErrorHandling(updateHandler)