import { IStateProps } from "../../App";
import React from 'react';
import { ILabor } from "../../../../types/Labor";
import { DateTime } from "luxon";

export default function HomeButton({ transitionToScreen, labor, updateLabor }: IStateProps) {
  const handleClick = () => {
    const endedLabor: ILabor = {
      ...labor,
      endTime: DateTime.now().toISO()
    }
    updateLabor(endedLabor)
    transitionToScreen('home')
  }
  return <button onClick={handleClick}>Home</button>
}