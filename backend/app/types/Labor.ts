import * as z from 'zod'
import { laborSchema } from '../handlers/labor/schemas'

export type ILabor = z.infer<typeof laborSchema>