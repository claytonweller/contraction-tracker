import { createHandler as createLaborHandler } from "../../../handlers/labor/create";

describe('createLaborHandler', ()=>{
  describe('when the body is incorrectly formatted', ()=>{
    let error 
    beforeEach(async ()=>{
      try {
        const incorrect = {body:JSON.stringify({startTime:'123'})}
        await createLaborHandler(incorrect)
      } catch (e){
        error = e
      }
    })
    
    
    it('should throw an error', ()=>{
      
      expect(error).toEqual('')
    })
    it('should not attempt to persist the labor', ()=>{

    })
  })

  describe('when the body is correctly formatted', ()=>{
    describe('and the labor is successfully persisted', ()=>{
      it('should return a correctly formatted labor', ()=>{

      })
      it('should have attempted to persist the labor', ()=>{

      })
    })

    describe('and the labor is NOT successfully persisted', ()=>{
      it('should throw an error', ()=>{

      })
      it('should have attempted to persist the labor', ()=>{

      })
    })
  })
})