import { withErrorHandling } from "../../utils/with-error-handling"

async function updateHandler(event) {
  console.log('UPDATE', event)
  return 'Updated'
}

export const handler = withErrorHandling(updateHandler)