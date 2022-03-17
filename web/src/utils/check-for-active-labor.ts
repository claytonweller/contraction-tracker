import { Dispatch, SetStateAction } from "react"
import { ILabor } from "../../types/Labor"
import { backend } from "../integrations/back-end"
import { defaultLabor } from "./default-labor"

export async function checkForActiveLabor(
  userId: string,
  setLabor: Dispatch<SetStateAction<ILabor>>,
  setScreen: Dispatch<SetStateAction<string>>
): Promise<void> {
  const labors = await backend.getLabors(userId)
  const latestLabor = labors[labors.length - 1]
  const latestIsActive = !latestLabor.endTime
  const startingLabor = latestIsActive ? latestLabor : defaultLabor()
  setLabor(startingLabor)
  if (latestIsActive) resumeLabor(setScreen, latestLabor)
}

function resumeLabor(setScreen: Dispatch<SetStateAction<string>>, labor: ILabor) {
  const latestContraction = labor.contractions[labor.contractions.length - 1]
  if(!latestContraction) return setScreen('labor')
  const contractionInProgress = !latestContraction.endTime
  const contractionNeedsIntensity = !latestContraction.intensity
  if (contractionInProgress) return setScreen('contraction')
  if (contractionNeedsIntensity) return setScreen('intensity')
  return setScreen('labor')
}