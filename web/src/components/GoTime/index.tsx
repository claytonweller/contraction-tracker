import React from 'react';

export default function GoTime({ transitionScreen }: { transitionScreen: (screenName?: string) => void }) {

  return (
    <div>
      <div>GoTime</div>
      <button onClick={() => { transitionScreen('home') }}>Home</button>
    </div >
  );
}