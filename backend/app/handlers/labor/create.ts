import { withErrorHandling } from "../../utils/with-error-handling"
import { dynamo } from "../../integrations/dyanmo"
import { calculateLaborValues } from "../../utils/calculate-labor-values";
import {laborSchema} from '../../types/Labor'

export async function createHandler(event) {
  const labor = JSON.parse(event.body)
  const validLabor = laborSchema.parse(labor)
  const laborWithCalculatedValues = calculateLaborValues(validLabor)
  const createdLabor = await dynamo.labor.create(laborWithCalculatedValues)
  return createdLabor
}

export const handler = withErrorHandling(createHandler)
