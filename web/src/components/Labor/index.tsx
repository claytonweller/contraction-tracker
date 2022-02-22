import React from 'react';
import { IContraction } from '../../../../types/Contraction';
import { DateTime } from 'luxon';
import { IStateProps } from '../../App';
import HomeButton from '../shared/HomeButton';

export default function Labor({ transitionScreen, labor, updateLabor }: IStateProps) {
  const handleClick = () => {
    console.warn('contraction click')
    const newContraction: IContraction = {
      startTime: DateTime.now().toISO()
    }
    const updatedLabor = {
      ...labor,
      contractions: [...labor.contractions, newContraction]
    }
    updateLabor(updatedLabor)
    transitionScreen('contraction')
  }

  return (
    <div>
      <div>Labor</div>
      <HomeButton
        transitionScreen={transitionScreen}
        labor={labor}
        updateLabor={updateLabor} />
      <button onClick={handleClick}>Contract</button>
      <div>TEMP</div>
      <button onClick={() => transitionScreen('go-time')}>GO TIME!</button>
    </div >
  );
}