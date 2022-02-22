import React from 'react';
import { backend } from '../../integrations/back-end';

export default function Home(props: { transitionScreen: (screenName?: string) => () => void }) {
  const handleClick = () => {
    const labor = backend.createLabor()
    console.log('Inside Handler', labor)
    props.transitionScreen('labor')
  }
  return (
    <div>
      <div>Home</div>
      <button onClick={handleClick}>Labor</button>
    </div >
  );
}
