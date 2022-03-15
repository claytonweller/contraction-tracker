import { dynamo } from "../../integrations/dyanmo"
import { withErrorHandling } from "../../utils/with-error-handling"

async function getHandler(event) {
  const {userId} = event.queryStringParameters
  const labors = await dynamo.labor.get(userId)
  return labors
}

export const handler = withErrorHandling(getHandler)