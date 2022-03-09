import React, { useState, ComponentType, Dispatch, SetStateAction, useEffect } from 'react';
import './App.css';
import { getDisplayedScreen } from './utils/get-displayed-screen'
import { defaultLabor } from './utils/default-labor';
import { ILabor } from '../types/Labor';
import { backend } from './integrations/back-end';


export default function App() {

  const [screenName, setScreen] = useState('home');
  const [needStartingLabor, setNeedStartingLabor] = useState(true)
  const laborState = useState(defaultLabor())
  const setLabor = laborState[1]
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

async function checkForActiveLabor(
  userId: string,
  setLabor: Dispatch<SetStateAction<ILabor>>,
  setScreen: Dispatch<SetStateAction<string>>
): Promise<void> {
  const labors = await backend.getLabors(userId)
  const latestLabor = labors[labors.length - 1]
  const latestIsActive = !latestLabor.endTime
  const startingLabor = latestIsActive ? latestLabor : defaultLabor()
  setLabor(startingLabor)
  if (latestIsActive) setScreen('labor')
}

function withState<T>(
  Component: ComponentType<T>,
  setScreen: Dispatch<SetStateAction<string>>,
  laborState: [ILabor, Dispatch<SetStateAction<ILabor>>]
) {
  const [labor, setLabor] = laborState
  const transitionToScreen = (screenName: string = 'home') => setScreen(screenName)
  const updateLabor = async (newLabor: ILabor) => {
    const savedLabor = await backend.updateLabor(newLabor)
    setLabor(savedLabor)
  }
  const createLabor = async (userId: string) => {
    const createdLabor = await backend.createLabor(userId)
    setLabor(createdLabor)
  }

  return (props: T) => (<Component
    {...props}
    transitionToScreen={transitionToScreen}
    labor={labor}
    updateLabor={updateLabor}
    createLabor={createLabor}
  />)
}

export interface IStateProps {
  transitionToScreen: (screenName?: string) => void,
  labor: ILabor,
  updateLabor: (labor: ILabor) => Promise<ILabor>,
  createLabor: (userId: string) => Promise<ILabor>
}