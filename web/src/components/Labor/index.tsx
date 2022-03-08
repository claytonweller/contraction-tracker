import React, { useState } from 'react';
import { IContraction } from '../../../types/Contraction';
import { DateTime, Duration } from 'luxon';
import { IStateProps } from '../../App';
import HomeButton from '../shared/HomeButton';

export default function Labor(props: IStateProps) {

  const { transitionToScreen, labor, updateLabor } = props
  const handleClick = async () => {
    const newContraction: IContraction = {
      startTime: DateTime.now().toISO()
    }
    const updatedLabor = {
      ...labor,
      contractions: [...labor.contractions, newContraction]
    }
    await updateLabor(updatedLabor)
    transitionToScreen('contraction')
  }

  const [timerValue, setTimerValue] = useState('0:0');

  const now = DateTime.now()
  const totalDuation = now.diff(DateTime.fromISO(labor.startTime)).toFormat('h:mm:ss')
  const { averageIntensity, averageDuration: contrationDuration } = labor.calculated.contraction
  const { averageDuration: laborDuration } = labor.calculated.rest
  const lastContraction = labor.contractions[labor.contractions.length - 1]

  setTimeout(() => {
    const now = DateTime.now()
    const currentDuration = lastContraction?.endTime
      ? now.diff(DateTime.fromISO(lastContraction.endTime)).toFormat('mm:ss')
      : totalDuation
    setTimerValue(currentDuration)
  }, 1000)

  const roundDuration = (seconds: number) => {
    return Duration.fromMillis(seconds * 10000).toFormat('mm:ss')
  }

  return (
    <div>
      <h1>Labor</h1>
      <div>
        <h2>Stats</h2>
        <div>Total Duration: {totalDuation}</div>
        <div>
          <h3>Contractions</h3>
          <div>Ave Intensity: {Math.round(averageIntensity * 100) / 100}</div>
          <div>Ave duration: {roundDuration(contrationDuration)}</div>
        </div>
        <div>
          <h3>Rests</h3>
          <div>Ave duration: {roundDuration(laborDuration)}</div>
          <div>Current duration: {timerValue}</div>
        </div>

      </div>
      <h2>Buttons</h2>
      <div>
        <HomeButton {...props} />
        <button onClick={handleClick}>Contract</button>
      </div>
      <div>TEMP</div>
      <button onClick={() => transitionToScreen('go-time')}>GO TIME!</button>
    </div >
  );
}