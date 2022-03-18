import * as z from 'zod'

const numberArray = z.array(z.number())

export const contractionSchema = z.object({
  startTime: z.string(),
  endTime: z.string().optional(),
  intensity: z.number().optional()
})

export const calculatedLaborSchema = z.object({
  contraction:  z.object({
    averageDuration: z.number(),
    averageIntensity: z.number(),
    durations: numberArray,
    averageDurations: numberArray,
    intensities: numberArray
  }),
  rest: z.object({
    currentDuration: z.number().optional(),
    averageDuration: z.number(),
    durations: numberArray,
  }),
  isGoTime: z.boolean(),
  contractionsAreLongEnough: z.boolean(), 
  restsAreShortEnough: z.boolean(), 
  laborIsLongEnough: z.boolean()
})

export const laborSchema = z.object({
  userId: z.string(),
  startTime: z.string(),
  endTime: z.string().optional(),
  contractions:z.array(contractionSchema),
  calculated: calculatedLaborSchema,
  bishopScore: z.number()
})