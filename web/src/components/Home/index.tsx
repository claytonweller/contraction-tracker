import React from 'react';
import { IStateProps } from '../../App';

export default function Home({ transitionToScreen, createLabor }: IStateProps) {
  const handleClick = () => {
    createLabor()
    transitionToScreen('labor')
  }
  return (
    <div>
      <div>Home</div>
      <button onClick={handleClick}>Labor</button>
    </div >
  );
}
