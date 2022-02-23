import React from 'react';
import { IStateProps } from '../../App';
import HomeButton from '../shared/HomeButton';
import { DateTime } from 'luxon';

export default function GoTime(props: IStateProps) {
  // const { updateLabor, labor } = props
  // updateLabor({ ...labor, endTime: DateTime.now().toISO() })
  return (
    <div>
      <div>GoTime</div>
      <HomeButton {...props} />
    </div >
  );
}