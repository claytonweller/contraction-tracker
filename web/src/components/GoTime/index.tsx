import React from 'react';

export default function GoTime(props: { transitionScreen: (screenName?: string) => () => void }) {

  return (
    <div>
      <div>GoTime</div>
      <button onClick={props.transitionScreen('home')}>Labor</button>
    </div >
  );
}