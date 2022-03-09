import React, { ComponentType, Dispatch, SetStateAction } from 'react';
import { ILabor } from '../../types/Labor';
import { backend } from '../integrations/back-end';

export function withState<T>(
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