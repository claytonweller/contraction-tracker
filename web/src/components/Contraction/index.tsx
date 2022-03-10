import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { modifyLastContraction } from '../../utils/updateLastContraction';
import { IStateProps } from '../../utils/with-state';

export default function Contraction({ transitionToScreen, labor, updateLabor }: IStateProps) {
  const [timerValue, setTimerValue] = useState('0.0');

  const currentContraction = labor.contractions[labor.contractions.length - 1]

  const handleClick = async () => {
    const endTime = DateTime.now().toISO()
    const updatedLabor = modifyLastContraction(labor, { endTime })
    await updateLabor(updatedLabor)
    transitionToScreen('intensity')
  }
  setTimeout(() => {
    const now = DateTime.now()
    const diff = now.diff(DateTime.fromISO(currentContraction.startTime)).milliseconds
    const value = `${Math.round(diff / 100) / 10}`
    const [seconds, tenths] = value.split('.')
    const formattedTenths = tenths || 0
    setTimerValue(`${seconds}.${formattedTenths}`)
  }, 100)

  return (
    <div>
      <h3>Contraction</h3>
      <h2><b>{timerValue}</b> sec</h2>
      <button onClick={handleClick}>Release</button>
    </div >
  );
}