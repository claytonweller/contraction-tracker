import React from 'react';
import { IStateProps } from '../../App';

export default function GoTime({ transitionScreen }: IStateProps) {

  return (
    <div>
      <div>GoTime</div>
      <button onClick={() => { transitionScreen('home') }}>Home</button>
    </div >
  );
}