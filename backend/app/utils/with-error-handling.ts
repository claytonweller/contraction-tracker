export function withErrorHandling(handler: any) {
  return async (event) => {
    try {
      const result = await handler(event)
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
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