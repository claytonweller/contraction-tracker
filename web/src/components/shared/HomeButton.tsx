import { IStateProps } from "../../App";
import React from 'react';
import { ILabor } from "../../../../types/Labor";
import { DateTime } from "luxon";

export default function HomeButton({ transitionScreen, labor, updateLabor }: IStateProps) {
  const handleClick = () => {
    const endedLabor: ILabor = {
      ...labor,
      endTime: DateTime.now().toISO()
    }
    console.warn(endedLabor)
    updateLabor(endedLabor)
    transitionScreen('home')
  }
  return <button onClick={handleClick}>Home</button>
}