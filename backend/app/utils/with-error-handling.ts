export function withErrorHandling(handler: (any)=>Promise<any>){
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }
  
  return async (event) => {
    console.log(event)
    try {
      const result = await handler(event)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result)
      }
    } catch (e) {
      console.warn('ERROR', e)
      // Surfacing all errors in the response is not best practice.
      // However, since this is early in development I've decided the utility
      // of having the response for debugging is worth the comprormise for now.
      const body = parseError(e)
      return {
        statusCode: 400,
        headers,
        body
      }
    }
  }
}


function parseError (e: any){
  if(e instanceof Error) return e.message
  if(typeof e === 'string') return e
  return 'unknown error'
}