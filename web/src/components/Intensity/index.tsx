import React from 'react';

export default function Intesnity(props: { transitionScreen: (screenName?: string) => () => void }) {

  return (
    <div>
      <div>Intesnity</div>
      <button onClick={props.transitionScreen('labor')}>Labor</button>
    </div >
  );
}