import React, { useEffect, useState } from 'react';
import HomeButton from '../shared/HomeButton';
import { IStateProps } from '../../utils/with-state';

export default function GoTime(props: IStateProps) {
  const { changeBackground } = props
  const [level, setLevel] = useState('low')

  const low = {
    bgColor: '#259925',
    style: {
      color: 'white',
      fontSize: '20vw',
      fontWeight: 'bold'
    }
  }

  const high = {
    bgColor: '#50ff50',
    style: {
      color: 'black',
      fontSize: '22vw',
      fontWeight: 'bolder'
    }
  }
  const transitionDuration = 500

  const { style } = level === 'low' ? low : high

  useEffect(() => {
    const timer = setTimeout(() => {
      if (level === 'low') {
        setLevel('high')
        changeBackground(high.bgColor, transitionDuration)
      }
      else {
        setLevel('low')
        changeBackground(low.bgColor, transitionDuration)
      }
    }, transitionDuration * 2)
    return () => clearTimeout(timer)
  }, [level])


  return (
    <div>
      <HomeButton {...props} />
      <h1 style={{ transitionDuration: `${transitionDuration}`, ...style }}>GoTime!</h1>
    </div >
  );
}