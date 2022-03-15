import {z} from "zod";

const numberArray = z.array(z.number())

export const calculatedLaborSchema = z.object({
  contraction:  z.object({
    averageDuration: z.number(),
    averageIntensity: z.number(),
    durations: numberArray,
    intensities: numberArray
  }),
  rest: z.object({
    currentDuration: z.number().optional(),
    averageDuration: z.number(),
    durations: numberArray,
  }),
  isGoTime: z.boolean()
})

export type ICalculatedLabor = z.infer<typeof calculatedLaborSchema>