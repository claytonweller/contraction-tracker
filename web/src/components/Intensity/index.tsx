import React from 'react';
import { IStateProps } from '../../utils/with-state';
import IntensityButton from './IntensityButton';

export default function Intesnity(props: IStateProps) {
  return (
    <div>
      <div>Intesnity</div>
      <IntensityButton {...props} value={1} />
      <IntensityButton {...props} value={2} />
      <IntensityButton {...props} value={3} />
      <IntensityButton {...props} value={4} />
      <IntensityButton {...props} value={5} />
    </div >
  );
}