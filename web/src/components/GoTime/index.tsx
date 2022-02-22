import React from 'react';
import { IStateProps } from '../../App';
import HomeButton from '../shared/HomeButton';

export default function GoTime({ transitionScreen, labor, updateLabor }: IStateProps) {

  return (
    <div>
      <div>GoTime</div>
      <HomeButton
        transitionScreen={transitionScreen}
        labor={labor}
        updateLabor={updateLabor} />
    </div >
  );
}