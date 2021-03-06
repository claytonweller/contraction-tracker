import React, { useEffect } from 'react';
import HomeButton from '../shared/HomeButton';
import { IStateProps } from '../../utils/with-state';
import ContractionButton from './ContractionButton';
import OopsButton from './OopsButton';
import StatBlock from './StatBlock';
import ContractionStats from './ContractionStats';
import RestStats from './RestStats';
import Graphs from '../shared/Graphs';


export default function Labor(props: IStateProps) {

  const {
    changeBackground,
    transitionToScreen,
    labor: { startTime, calculated: { laborIsLongEnough } }
  } = props

  useEffect(() => changeBackground('#282c34', 2000), [])

  return (
    <div>
      <HomeButton {...props} />
      <OopsButton {...props} />
      <Graphs {...props} />
      <h1 style={{ marginBlockStart: '5px' }}>Labor</h1>
      <div>
        <StatBlock
          title='Total Duration'
          durationStart={startTime}
          durationFormat={'hh:mm:ss'}
          targetAchieved={laborIsLongEnough}
        />
        <ContractionStats labor={props.labor} />
        <RestStats labor={props.labor} />
      </div>
      <div style={{ paddingTop: '20px' }}>
        <ContractionButton {...props} />
        <button onClick={() => transitionToScreen('go-time')}></button>
      </div>

    </div >
  );
}