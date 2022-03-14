import { withErrorHandling } from "../../utils/with-error-handling"

describe('withErrorHandling', ()=>{
  const headers = {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  }
  const errorMessage = 'Kaboom!'

  describe('when the underlying handler would reject its promise', ()=>{
    
    const rejectionHandler = async(output) =>{
      return new Promise((_, reject) =>{
        reject(output)
      })
    }
    const rejectionWithErrorHandling = withErrorHandling(rejectionHandler)
    describe('and the rejection returns a string', ()=>{
      let response
      beforeEach(async ()=>{
        response = await rejectionWithErrorHandling(errorMessage)
      })
  
      it('should add the approriate headers', ()=>{
        expect(response.headers).toEqual(headers)
      })
      it('should set the appropriate status', ()=>{
        expect(response.statusCode).toBe(400)
      })
      it('should return the string as the body', ()=>{
        expect(response.body).toBe(errorMessage)
      })
    })

    describe('and the rejection returns something other than a string', ()=>{
      let response
      beforeEach(async ()=>{
        response = await rejectionWithErrorHandling({this:'is not a string'})
      })
  
      it('should add the approriate headers', ()=>{
        expect(response.headers).toEqual(headers)
      })
      it('should set the appropriate status', ()=>{
        expect(response.statusCode).toBe(400)
      })
      it('should send an unknown error', ()=>{
        expect(response.body).toBe('unknown error')
      })
    })
  })

  describe('when the underlying handler would reject its promise', ()=>{
    const explosionHandler = async() =>{
      throw new Error(errorMessage)
    }
    const explosionWithErrorHandling = withErrorHandling(explosionHandler)
    let response
    beforeEach(async ()=>{
      response = await explosionWithErrorHandling({})
    })

    it('should add the approriate headers', ()=>{
      expect(response.headers).toEqual(headers)
    })
    it('should set the appropriate status', ()=>{
      expect(response.statusCode).toBe(400)
    })
    it('should send the error message as the body', ()=>{
      expect(response.body).toBe(errorMessage)
    })
  })

  describe('when the underlying handler would return a result', ()=>{
    const theGoods = {goods:'Here they are!'}
    const goodHandler = async() =>{
      return await new Promise((resolve)=> resolve(theGoods))
    }
    const goodWithErrorHandling = withErrorHandling(goodHandler)
    let response
    beforeEach(async ()=>{
      response = await goodWithErrorHandling({})
    })

    it('should add the approriate headers', ()=>{
      expect(response.headers).toEqual(headers)
    })
    it('should set the appropriate status', ()=>{
      expect(response.statusCode).toBe(200)
    })
    it('should send the stringified result as the body', ()=>{
      expect(response.body).toBe(JSON.stringify(theGoods))
    })
  })
})