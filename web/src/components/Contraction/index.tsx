import React from 'react';
import { IStateProps } from '../../App';
import { DateTime } from 'luxon';
import { modifyLastContraction } from '../../utils/updateLastContraction';

export default function Contraction({ transitionToScreen, labor, updateLabor }: IStateProps) {
  const handleClick = async () => {
    const endTime = DateTime.now().toISO()
    const updatedLabor = modifyLastContraction(labor, { endTime })
    await updateLabor(updatedLabor)
    transitionToScreen('intensity')
  }

  return (
    <div>
      <div>Contraction</div>
      <button onClick={handleClick}>Release</button>
    </div >
  );
}