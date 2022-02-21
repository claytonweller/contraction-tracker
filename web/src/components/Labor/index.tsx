import React from 'react';

export default function Labor(props: { transitionScreen: (screenName?: string) => () => void }) {

  return (
    <div>
      <div>Labor</div>
      <button onClick={props.transitionScreen('home')}>Home</button>
      <button onClick={props.transitionScreen('contraction')}>Contract</button>
      <div>TEMP</div>
      <button onClick={props.transitionScreen('go-time')}>GO TIME!</button>
    </div >
  );
}