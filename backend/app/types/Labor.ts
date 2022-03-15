import { contractionSchema } from "./Contraction";
import { calculatedLaborSchema } from "./CalculatedLabor";
import {z} from 'zod'

export const laborSchema = z.object({
  userId: z.string(),
  startTime: z.string(),
  endTime: z.string().optional(),
  contractions: z.array(contractionSchema),
  calculated: calculatedLaborSchema,
  bishopScore: z.number()
})

export type ILabor = z.infer<typeof laborSchema>