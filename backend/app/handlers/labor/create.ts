import { withErrorHandling } from "../../utils/with-error-handling"

async function createHandler(event) {
  console.log('CREATE', event)
  return 'Created'
}

export const handler = withErrorHandling(createHandler)