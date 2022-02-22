import React from 'react';

export default function Labor({ transitionScreen }: { transitionScreen: (screenName?: string) => void }) {
  const handleClick = () => {
    console.warn('contraction click')
    transitionScreen('contraction')
  }

  return (
    <div>
      <div>Labor</div>
      <button onClick={() => transitionScreen('home')}>Home</button>
      <button onClick={handleClick}>Contract</button>
      <div>TEMP</div>
      <button onClick={() => transitionScreen('go-time')}>GO TIME!</button>
    </div >
  );
}