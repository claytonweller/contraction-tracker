import {z} from 'zod'

export const contractionSchema = z.object({
  startTime: z.string(),
  endTime: z.string().optional(),
  intensity: z.number().optional()
})

export type IContraction = z.infer<typeof contractionSchema>