import * as z from 'zod'
import { contractionSchema } from '../handlers/labor/schemas'

export type IContraction = z.infer<typeof contractionSchema>