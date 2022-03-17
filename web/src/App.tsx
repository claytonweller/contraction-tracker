import React, { useState, useEffect } from 'react';
import './App.css';
import { getDisplayedScreen } from './utils/get-displayed-screen'
import { defaultLabor } from './utils/default-labor';
import { checkForActiveLabor } from './utils/check-for-active-labor';
import { defaultStateProps, withState } from './utils/with-state';

export default function App() {

  const [screenName, setScreen] = useState('home');
  const laborState = useState(defaultLabor())
  const setLabor = laborState[1]
  const [needStartingLabor, setNeedStartingLabor] = useState(true)
  const [background, setBackground] = useState({ color: '#282c34', speed: '1000ms' })
  const backgroundStyle = { backgroundColor: background.color, transitionDuration: background.speed }

  useEffect(() => {
    const userId = localStorage.getItem('userId') || '111'
    if (needStartingLabor) {
      checkForActiveLabor(userId, setLabor, setScreen)
      setNeedStartingLabor(false)
    }
  }, [])
  const displayedScreen = getDisplayedScreen(screenName, laborState)
  const screenWithState = withState(displayedScreen, setScreen, laborState, setBackground)(defaultStateProps)

  return (
    <div className="App">
      <header className="App-header" style={backgroundStyle}>
        {screenWithState}
      </header>
    </div>
  );
}