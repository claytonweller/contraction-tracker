import React from 'react';

export default function Home(props: { transitionScreen: (screenName?: string) => () => void }) {

  return (
    <div>
      <div>Home</div>
      <button onClick={props.transitionScreen('labor')}>Labor</button>
    </div >
  );
}
