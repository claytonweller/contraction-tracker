import React from 'react'
import { ILabor } from '../../../types/Labor'
import { roundDuration } from '../../utils/round-duration'
import StatBlock from './StatBlock'

export default function RestStats(props: { labor: ILabor }) {
  const { labor: { contractions, calculated, startTime } } = props
  const { rest: { averageDuration }, restsAreShortEnough } = calculated
  const lastContraction = contractions[contractions.length - 1]
  const currentStart = lastContraction?.endTime || startTime
  return (
    <div>
      <h3 className='Stat-block-chunk-header'>Rests</h3>
      <div className='Stat-block-chunk'>
        <StatBlock
          title={'Average'}
          value={roundDuration(averageDuration)}
          targetAchieved={restsAreShortEnough}
        />
        <StatBlock title={'Current'} durationStart={currentStart} />
      </div>
    </div>
  )
}