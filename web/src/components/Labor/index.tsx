import React, { useEffect } from 'react';
import { Duration } from 'luxon';
import HomeButton from '../shared/HomeButton';
import { IStateProps } from '../../utils/with-state';
import ContractionButton from './ContractionButton';
import DurationTimer from './DurationTimer'
import OopsButton from './OopsButton';

export default function Labor(props: IStateProps) {

  const {
    changeBackground,
    transitionToScreen,
    labor: { startTime, calculated: { contraction, rest }, contractions }
  } = props

  useEffect(() => changeBackground('#282c34', 2000), [])

  const { averageIntensity, averageDuration: contrationDuration } = contraction
  const { averageDuration: laborDuration } = rest
  const lastContraction = contractions[contractions.length - 1]

  const currentStart = lastContraction?.endTime || startTime

  const roundDuration = (seconds: number, format: string = 'mm:ss') => {
    return Duration.fromMillis(seconds * 1000).toFormat(format)
  }

  return (
    <div>
      <HomeButton {...props} />
      <h1>Labor</h1>
      <div>
        <h2>Stats</h2>
        <div>Total Duration: <DurationTimer start={startTime} format='hh:mm:ss' /></div>
        <div>
          <h3>Contractions</h3>
          <div>Ave Intensity: {Math.round(averageIntensity * 100) / 100}</div>
          <div>Ave duration: {roundDuration(contrationDuration)}</div>
        </div>
        <div>
          <h3>Rests</h3>
          <div>Ave duration: {roundDuration(laborDuration)}</div>
          <div>Current duration: <DurationTimer start={currentStart} /></div>
        </div>

      </div>
      <h2>Buttons</h2>
      <div>
        <OopsButton {...props} />
        <ContractionButton {...props} />
      </div>
      <div>TEMP</div>
      <button onClick={() => transitionToScreen('go-time')}>GO TIME!</button>
    </div >
  );
}