import React, { useState, ComponentType, Dispatch, SetStateAction } from 'react';
import './App.css';
import { getDisplayedScreen } from './utils/get-displayed-screen'
import { defaultLabor } from './utils/default-labor';
import { ILabor } from '../../types/Labor';
import { backend } from './integrations/back-end';


export default function App() {

  const [screenName, setScreen] = useState('home');
  const laborState = useState(defaultLabor())
  const displayedScreen = getDisplayedScreen(screenName)
  const defaultProps = {
    transitionToScreen: () => () => undefined,
    labor: defaultLabor(),
    updateLabor: defaultLabor,
    createLabor: defaultLabor
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

function withState<T>(
  Component: ComponentType<T>,
  setScreen: Dispatch<SetStateAction<string>>,
  laborState: [ILabor, Dispatch<SetStateAction<ILabor>>]
) {
  const [labor, setLabor] = laborState
  const transitionToScreen = (screenName: string = 'home') => setScreen(screenName)
  const updateLabor = (newLabor: ILabor) => {
    const savedLabor = backend.updateLabor(newLabor)
    setLabor(savedLabor)
  }
  const createLabor = () => {
    const createdLabor = backend.createLabor()
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
  updateLabor: (labor: ILabor) => ILabor
  createLabor: () => ILabor
}