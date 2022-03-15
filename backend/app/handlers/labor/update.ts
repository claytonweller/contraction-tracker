import { dynamo } from "../../integrations/dyanmo"
import { calculateLaborValues } from "../../utils/calculate-labor-values"
import { withErrorHandling } from "../../utils/with-error-handling"

async function updateHandler(event) {
  const labor = JSON.parse(event.body)
  const laborWithCalculations = calculateLaborValues(labor)
  const updatedLabor = await dynamo.labor.updateActive(laborWithCalculations)
  return updatedLabor
}

export const handler = withErrorHandling(updateHandler)