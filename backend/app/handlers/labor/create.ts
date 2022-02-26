import { withErrorHandling } from "../../utils/with-error-handling"
import { defaultLabor } from "../../utils/default-labor"
import { dynamo } from "../../integrations/dyanmo"
import { calculateLaborValues } from "../../utils/calculate-labor-values";

async function createHandler(event) {
  console.log('CREATE', event)
  const labor = defaultLabor()
  const laborWithCalculatedValues = calculateLaborValues(labor)
  const result = await dynamo.labor.create(laborWithCalculatedValues, "123")
  return result
}

export const handler = withErrorHandling(createHandler)


