import React from 'react';
import { IStateProps } from '../../App';

export default function Contraction(props: IStateProps) {

  return (
    <div>
      <div>Contraction</div>
      <button onClick={() => { props.transitionScreen('intensity') }}>Release</button>
    </div >
  );
}