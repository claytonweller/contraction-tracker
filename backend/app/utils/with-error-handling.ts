export function withErrorHandling(handler: any) {
  return async (event) => {
    try {
      const result = await handler(event)
      return {
        statusCode: 200,
        body: JSON.stringify(result)
      }
    } catch (e) {
      console.warn('ERROR', e)
      const body = e instanceof Error ? e.message : 'unknown error'
      return {
        statusCode: 400,
        body
      }
    }
  }

}