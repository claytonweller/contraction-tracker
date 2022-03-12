import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { IStateProps } from '../../utils/with-state';

export default function OopsButton(props: IStateProps) {
  const [oopsContraction, setOopsContraction] = useState({ startTime: "", endTime: "" })
  const [optimalIsValid, setOptimalIsValid] = useState(false)
  const [secondaryIsValid, setSecondaryIsValid] = useState(false)
  const { transitionToScreen, labor, updateLabor } = props
  const { contractions, calculated: { rest, contraction } } = labor

  useEffect(() => {
    setTimeout(() => {
      const lastContraction = contractions[contractions.length - 1]
      const endOfLastContration = !lastContraction?.endTime
        ? DateTime.now()
        : DateTime.fromISO(lastContraction.endTime)
      const optimalStart = endOfLastContration.plus({ seconds: rest.averageDuration })
      const optimalEnd = optimalStart.plus({ seconds: contraction.averageDuration })
      const secondaryEnd = DateTime.now()
      const secondaryStart = secondaryEnd.minus({ seconds: contraction.averageDuration })
      const optimalIsInPast = DateTime.now().diff(optimalEnd).milliseconds > 0
      const secondaryIsShortEnough = endOfLastContration.diff(secondaryStart).milliseconds < 0
      console.warn('OPTIMAL CHECK', DateTime.now().diff(optimalEnd).milliseconds)
      console.warn('SECONDARY CHECK', DateTime.now().diff(optimalEnd).milliseconds)
      setOptimalIsValid(optimalIsInPast)
      setSecondaryIsValid(secondaryIsShortEnough)

      if (optimalIsValid) setOopsContraction({ startTime: optimalStart.toISO(), endTime: optimalEnd.toISO() })
      if (!optimalIsValid && secondaryIsValid) {
        setOopsContraction({ startTime: secondaryStart.toISO(), endTime: secondaryEnd.toISO() })
      }

    }, 1000)
  }, [])

  const oopsContractionIsValid = oopsContraction.startTime && oopsContraction.endTime
  if (!oopsContractionIsValid) return <button style={{ backgroundColor: 'gray' }}>No Oops</button>

  const handleClick = async () => {
    if (!oopsContractionIsValid) return console.warn('INVALID OOPS')
    const updatedLabor = {
      ...labor,
      contractions: [...labor.contractions, oopsContraction]
    }
    await updateLabor(updatedLabor)
    transitionToScreen('intensity')
  }

  return (
    <button onClick={handleClick}>Oops</button>
  );
}