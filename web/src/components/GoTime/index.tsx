import React from 'react';
import { IStateProps } from '../../App';
import HomeButton from '../shared/HomeButton';
import { DateTime } from 'luxon';

export default function GoTime(props: IStateProps) {
  return (
    <div>
      <div>GoTime</div>
      <HomeButton {...props} />
    </div >
  );
}