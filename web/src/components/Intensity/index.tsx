import React, { useEffect } from 'react';
import { IStateProps } from '../../utils/with-state';
import IntensityButton from './IntensityButton';

export default function Intesnity(props: IStateProps) {
  const { changeBackground } = props
  useEffect(() => changeBackground('#282c34', 2000), [])

  return (
    <div>
      <h2>Intesnity</h2>
      <IntensityButton {...props} value={1} />
      <IntensityButton {...props} value={2} />
      <IntensityButton {...props} value={3} />
      <IntensityButton {...props} value={4} />
      <IntensityButton {...props} value={5} />
    </div >
  );
}