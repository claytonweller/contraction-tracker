import React from 'react';
import { IStateProps } from '../../utils/with-state';

export default function Home({ transitionToScreen, createLabor, labor }: IStateProps) {
  const handleClick = async () => {
    await createLabor("555")
    transitionToScreen('labor')
  }
  return (
    <div>
      <h2>UserId - {labor.userId}</h2>
      <button onClick={handleClick}>Labor</button>
    </div >
  );
}
