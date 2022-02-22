import React from 'react';
import { IStateProps } from '../../App';

export default function Intesnity({ transitionScreen }: IStateProps) {

  return (
    <div>
      <div>Intesnity</div>
      <button onClick={() => { if (transitionScreen) transitionScreen('labor') }} >Labor</button>
    </div >
  );
}