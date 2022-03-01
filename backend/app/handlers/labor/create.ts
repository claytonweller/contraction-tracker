import { withErrorHandling } from "../../utils/with-error-handling"
import { dynamo } from "../../integrations/dyanmo"
import { calculateLaborValues } from "../../utils/calculate-labor-values";

async function createHandler(event) {
  console.log('CREATE', event)
  const labor = JSON.parse(event.body)
  const laborWithCalculatedValues = calculateLaborValues(labor)
  const createdLabor = await dynamo.labor.create(laborWithCalculatedValues, "123")
  return createdLabor
}

export const handler = withErrorHandling(createHandler)
