import { dynamo } from "../../integrations/dyanmo"
import { withErrorHandling } from "../../utils/with-error-handling"
import {z} from 'zod'

export async function getHandler(event) {
  const {userId} = event.queryStringParameters
  const validUserId = z.string().parse(userId)
  const labors = await dynamo.labor.get(validUserId)
  return labors
}

export const handler = withErrorHandling(getHandler)