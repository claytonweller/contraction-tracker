import React from 'react'
import { ILabor } from '../../../types/Labor'
import { IStateProps } from '../../utils/with-state'

export function ContinueButton(props: IStateProps) {
  const { transitionToScreen, updateLabor, labor } = props
  const continueClick = () => {
    const continuingLabor: ILabor = {
      ...labor,
      continuing: true
    }
    updateLabor(continuingLabor)
    transitionToScreen('labor')
  }
  const style = { fontSize: '5vw', backgroundColor: 'grey' }

  return (
    <div style={{ display: 'inline-block' }}>
      <button style={style} onClick={continueClick}>Continue</button>
    </div>
  )
}