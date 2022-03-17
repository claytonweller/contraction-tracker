import React, { useState } from 'react';
import { IStateProps } from '../../utils/with-state';

export default function Home({ transitionToScreen, createLabor }: IStateProps) {
  const lastUserId = localStorage.getItem('userId') || '111'
  const [userId, setUserId] = useState(lastUserId)

  const handleClick = async () => {
    localStorage.setItem('userId', userId)
    await createLabor(userId)
    transitionToScreen('labor')
  }

  const handleText = (event: any) => {
    setUserId(event.target.value)
  }

  return (
    <div>
      <input type='text' onChange={handleText} />
      <h2>UserId - {userId}</h2>
      <button onClick={handleClick}>Labor</button>
    </div >
  );
}
