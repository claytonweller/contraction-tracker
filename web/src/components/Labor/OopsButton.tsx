import React from 'react';
import { DateTime } from 'luxon';
import { IStateProps } from '../../utils/with-state';
import { IContraction } from '../../../types/Contraction';
import { ILabor } from '../../../types/Labor';

export default function OopsButton(props: IStateProps) {
  const { transitionToScreen, labor, updateLabor } = props
  const handleClick = async () => {
    const oopsContraction = getOopsContraction(labor)
    const updatedLabor = {
      ...labor,
      contractions: [...labor.contractions, oopsContraction]
    }
    await updateLabor(updatedLabor)
    transitionToScreen('intensity')
  }

  return (
    <button
      onClick={handleClick}
      style={{ position: 'absolute', top: 0, right: 0, width: '50px', backgroundColor: '#559955' }}
    >!</button>
  );
}

const getOopsContraction = (labor: ILabor): IContraction => {
  const { contractions } = labor
  const now = DateTime.now()
  const lastContraction = contractions[contractions.length - 1]
  const endOfLastContration = !lastContraction?.endTime
    ? now
    : DateTime.fromISO(lastContraction.endTime)

  const bestCaseContraction = calculateBestCaseContraction(labor, endOfLastContration)
  const runnerUpContraction = calculateRunnerUpContraction(labor, endOfLastContration)
  const lastDitchContraction = calculateLastDitchContraction(endOfLastContration)

  if (bestCaseContraction) return bestCaseContraction
  if (runnerUpContraction) return runnerUpContraction
  return lastDitchContraction
}

const calculateBestCaseContraction = (labor: ILabor, endOfLastContration: DateTime): IContraction | null => {
  const { calculated: { rest, contraction } } = labor
  const now = DateTime.now()
  const start = endOfLastContration.plus({ seconds: rest.averageDuration })
  const end = start.plus({ seconds: contraction.averageDuration })
  const isValid = now.diff(end).milliseconds > 0
  if (!isValid) return null
  return { startTime: start.toISO(), endTime: end.toISO() }
}

const calculateRunnerUpContraction = (labor: ILabor, endOfLastContration: DateTime): IContraction | null => {
  const { calculated: { contraction } } = labor
  const now = DateTime.now()
  const end = now
  const emptyLength = endOfLastContration.diff(now).milliseconds
  const start = end.minus({ seconds: contraction.averageDuration })
  const isValid = emptyLength < 0
  if (!isValid) return null
  return { startTime: start.toISO(), endTime: end.toISO() }
}

const calculateLastDitchContraction = (endOfLastContration: DateTime): IContraction => {
  const now = DateTime.now()
  const emptyLength = endOfLastContration.diff(now).milliseconds
  const end = now
  const start = end.minus({ milliseconds: emptyLength / 2 })
  return { startTime: start.toISO(), endTime: end.toISO() }
}