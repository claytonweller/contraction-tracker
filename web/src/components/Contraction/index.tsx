import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { modifyLastContraction } from '../../utils/updateLastContraction';
import { IStateProps } from '../../utils/with-state';
import { pause } from '../../utils/pause';

export default function Contraction({ transitionToScreen, labor, updateLabor, changeBackground }: IStateProps) {
  const [timerValue, setTimerValue] = useState('0.0');
  const [level, setLevel] = useState('high')

  const low = {
    bgColor: '#883030',
    style: {
      color: '#dddddd',
      fontSize: '20vw',
      fontWeight: 'bold',
      transitionDuration: '900ms'
    }
  }

  const high = {
    bgColor: '#992525',
    style: {
      color: 'white',
      fontSize: '21vw',
      fontWeight: 'bold',
      transitionDuration: '100ms'
    }
  }

  const { style } = level === 'high' ? high : low

  const currentContraction = labor.contractions[labor.contractions.length - 1]

  const managePulse = async () => {
    setLevel('high')
    changeBackground(high.bgColor, 100)
    await pause(100)
    setLevel('low')
    changeBackground(low.bgColor, 900)
  }

  useEffect(() => {

    const timeThing = async () => {
      await pause(100)
      const now = DateTime.now()
      const diff = now.diff(DateTime.fromISO(currentContraction.startTime)).milliseconds
      const value = `${Math.round(diff / 100) / 10}`
      const [seconds, tenths] = value.split('.')
      const formattedTenths = tenths || 0
      if (seconds !== timerValue.split('.')[0]) managePulse()
      setTimerValue(`${seconds}.${formattedTenths}`)
    }
    timeThing()
  }, [timerValue])

  const handleClick = async () => {
    const endTime = DateTime.now().toISO()
    const updatedLabor = modifyLastContraction(labor, { endTime })
    await updateLabor(updatedLabor)
    transitionToScreen('intensity')
  }


  return (
    <div>
      <h3>Contraction</h3>
      <h2 style={{ ...style, height: '200px' }}>{timerValue}</h2>
      <button onClick={handleClick} style={{ backgroundColor: '#333344' }}>Release</button>
    </div >
  );
}