import React from 'react';
import { IContraction } from '../../../types/Contraction';
import { DateTime } from 'luxon';
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

  return (
    <div>
      <div>Labor</div>
      <HomeButton {...props} />
      <button onClick={handleClick}>Contract</button>
      <div>TEMP</div>
      <button onClick={() => transitionToScreen('go-time')}>GO TIME!</button>
    </div >
  );
}