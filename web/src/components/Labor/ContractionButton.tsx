import React from 'react';
import { IContraction } from '../../../types/Contraction';
import { DateTime } from 'luxon';
import { IStateProps } from '../../utils/with-state';

export default function ContractionButton(props: IStateProps) {

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
    <button onClick={handleClick}>Contract</button>
  );
}