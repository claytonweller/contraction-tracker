import { ILabor } from "../../types/Labor"

export const modifyLastContraction = (
  labor: ILabor,
  modifiableFields: { endTime?: string, intensity?: number }
): ILabor => {

  const contractions = [...labor.contractions]
  const lastContraction = contractions.pop()
  if (!lastContraction) throw new Error('No contractions to update')
  const {
    endTime = lastContraction.endTime,
    intensity = lastContraction.intensity
  } = modifiableFields
  return {
    ...labor,
    contractions: [
      ...contractions, { ...lastContraction, intensity, endTime }
    ]
  }
}