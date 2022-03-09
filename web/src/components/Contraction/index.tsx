import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { modifyLastContraction } from '../../utils/updateLastContraction';
import { IStateProps } from '../../utils/with-state';

export default function Contraction({ transitionToScreen, labor, updateLabor }: IStateProps) {
  const [timerValue, setTimerValue] = useState(0);

  const currentContraction = labor.contractions[labor.contractions.length - 1]

  const handleClick = async () => {
    const endTime = DateTime.now().toISO()
    const updatedLabor = modifyLastContraction(labor, { endTime })
    await updateLabor(updatedLabor)
    transitionToScreen('intensity')
  }
  setTimeout(() => {
    const now = DateTime.now()
    const diff = now.diff(DateTime.fromISO(currentContraction.startTime), 'milliseconds').milliseconds
    setTimerValue(Math.floor(diff / 100) / 10)
  }, 100)

  return (
    <div>
      <h1>Contraction</h1>
      <div><b>{timerValue}</b> sec</div>
      <button onClick={handleClick}>Release</button>
    </div >
  );
}