import React from 'react';

export default function Intesnity({ transitionScreen }: { transitionScreen: (screenName?: string) => void }) {

  return (
    <div>
      <div>Intesnity</div>
      <button onClick={() => { if (transitionScreen) transitionScreen('labor') }} >Labor</button>
    </div >
  );
}