import { dynamo } from "../../integrations/dyanmo"
import { withErrorHandling } from "../../utils/with-error-handling"

export async function getHandler(event) {
  const {userId} = event.queryStringParameters
  const user = await dynamo.user.get(userId)
  return user
}

export const handler = withErrorHandling(getHandler)