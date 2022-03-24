import React, { ComponentType, Dispatch, SetStateAction } from 'react';
import { ILabor } from '../../types/Labor';
import { backend } from '../integrations/back-end';
import { defaultLabor } from './default-labor';
import { IValidScreenNames } from './get-displayed-screen';

export function withState<T>(
  Component: ComponentType<T>,
  setScreen: Dispatch<SetStateAction<IValidScreenNames>>,
  laborState: [ILabor, Dispatch<SetStateAction<ILabor>>],
  setBackground: Dispatch<SetStateAction<{ color: string, speed: string }>>,
) {
  const [labor, setLabor] = laborState
  const transitionToScreen = (screenName: IValidScreenNames = 'home') => setScreen(screenName)
  const updateLabor = async (newLabor: ILabor) => {
    const savedLabor = await backend.updateLabor(newLabor)
    setLabor(savedLabor)
  }
  const createLabor = async (userId: string) => {
    const createdLabor = await backend.createLabor(userId)
    setLabor(createdLabor)
  }

  const changeBackground = (color: string, milliseconds: number) => {
    setBackground({ color, speed: `${milliseconds}ms` })
  }

  return (props: T) => (<Component
    {...props}
    transitionToScreen={transitionToScreen}
    labor={labor}
    updateLabor={updateLabor}
    createLabor={createLabor}
    changeBackground={changeBackground}
  />)
}

export const defaultStateProps: IStateProps = {
  transitionToScreen: () => () => undefined,
  labor: defaultLabor(),
  updateLabor: () => new Promise<ILabor>((resolve) => resolve(defaultLabor())),
  createLabor: () => new Promise<ILabor>((resolve) => resolve(defaultLabor())),
  changeBackground: () => ''
}

export interface IStateProps {
  transitionToScreen: (screenName?: IValidScreenNames) => void,
  labor: ILabor,
  updateLabor: (labor: ILabor) => Promise<ILabor>,
  createLabor: (userId: string) => Promise<ILabor>,
  changeBackground: (color: string, milliseconds: number) => void
}