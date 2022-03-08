import React from 'react';
import { IStateProps } from "../../App"
import { modifyLastContraction } from "../../utils/updateLastContraction"

export default function IntensityButton(
  { updateLabor, transitionToScreen, labor, value }: IIntensityButtonProps
) {
  const handleClick = async (event: any) => {
    const intensity = parseFloat(event?.target.value)
    const updatedLabor = modifyLastContraction(labor, { intensity })
    await updateLabor(updatedLabor)
    transitionToScreen('labor')
  }
  const key = `intensity-${value}`
  return (
    <div>
      <button key={key} value={value} onClick={handleClick}>{value}</button>
    </div>
  )
}

interface IIntensityButtonProps extends IStateProps {
  value: number
}