import React from 'react';
import HomeButton from '../shared/HomeButton';
import { IStateProps } from '../../utils/with-state';

export default function GoTime(props: IStateProps) {
  return (
    <div>
      <div>GoTime</div>
      <HomeButton {...props} />
    </div >
  );
}