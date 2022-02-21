import React from 'react';

export default function Contraction(props: { transitionScreen: (screenName?: string) => () => void }) {

  return (
    <div>
      <div>Contraction</div>
      <button onClick={props.transitionScreen('home')}>Labor</button>
    </div >
  );
}