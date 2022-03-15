import { dynamo } from "../../integrations/dyanmo"
import { calculateLaborValues } from "../../utils/calculate-labor-values"
import { withErrorHandling } from "../../utils/with-error-handling"
import {laborSchema} from '../../types/Labor'

async function updateHandler(event) {
  const labor = JSON.parse(event.body)
  const validLabor = laborSchema.parse(labor)
  const laborWithCalculations = calculateLaborValues(validLabor)
  const updatedLabor = await dynamo.labor.updateActive(laborWithCalculations)
  return updatedLabor
}

export const handler = withErrorHandling(updateHandler)