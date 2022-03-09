import { createLabor } from "./create-labor"
import { updateLabor } from "./update-labor"
import { ILabor } from "../../../types/Labor"
import { REACT_APP_BACKEND_URL, REACT_APP_BACKEND_API_KEY } from "../../config"
import { getLabors } from "./get-labors"

const makeRequest: IBackendRequest = async (params:IIntegrationParams ) => {
  const {
    path = '/',
    method = 'POST',
    body
  } = params

  console.warn('Fetch', path, method, body)

  const url = REACT_APP_BACKEND_URL + path

  const response = await fetch(url, {
    method,
    body,
    headers:{
      'x-api-key': REACT_APP_BACKEND_API_KEY,
      'Content-Type': 'application/json'
    }
  })
  return response.json()

}

export type IBackendRequest = <T>(params:IIntegrationParams) => Promise<T>

interface IIntegrationParams {path?: string; body?: string; method?: string}

export const backend = {
  createLabor: async (userId: string) => createLabor(makeRequest, userId),
  updateLabor: async (labor: ILabor) => updateLabor(makeRequest, labor),
  getLabors: async (userId: string) => getLabors(makeRequest, userId)
}