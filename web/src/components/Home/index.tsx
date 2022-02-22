import React from 'react';
import { backend } from '../../integrations/back-end';
import { IStateProps } from '../../App';

export default function Home(props: IStateProps) {
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
