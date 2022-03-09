import React, { useState, useEffect } from 'react';
import './App.css';
import { getDisplayedScreen } from './utils/get-displayed-screen'
import { defaultLabor } from './utils/default-labor';
import { ILabor } from '../types/Labor';
import { checkForActiveLabor } from './utils/check-for-active-labor';
import { withState } from './utils/with-state';

export default function App() {

  const [screenName, setScreen] = useState('home');
  const laborState = useState(defaultLabor())
  const setLabor = laborState[1]
  const [needStartingLabor, setNeedStartingLabor] = useState(true)

  useEffect(() => {
    if (needStartingLabor) {
      checkForActiveLabor('555', setLabor, setScreen)
      setNeedStartingLabor(false)
    }
  }, [])
  const displayedScreen = getDisplayedScreen(screenName, laborState)
  const defaultProps = {
    transitionToScreen: () => () => undefined,
    labor: defaultLabor(),
    updateLabor: () => new Promise<ILabor>((resolve) => resolve(defaultLabor())),
    createLabor: () => new Promise<ILabor>((resolve) => resolve(defaultLabor()))
  }
  const screenWithState = withState(displayedScreen, setScreen, laborState)(defaultProps)

  return (
    <div className="App">
      <header className="App-header">
        {screenWithState}
      </header>
    </div>
  );
}