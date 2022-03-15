import * as z from 'zod'
import { calculatedLaborSchema } from '../handlers/labor/schemas'

export type ICalculatedLabor = z.infer<typeof calculatedLaborSchema>