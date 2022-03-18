import React from 'react'
import { ILabor } from '../../../types/Labor'
import { roundDuration } from '../../utils/round-duration'
import StatBlock from './StatBlock'

export default function ContractionStats(props: { labor: ILabor }) {
  const { contraction, contractionsAreLongEnough } = props.labor.calculated
  const { averageIntensity, averageDuration } = contraction
  const averageIntesityValue = `${Math.round(averageIntensity * 100) / 100}`
  return (
    <div>
      <h3 className='Stat-block-chunk-header'>Contractions</h3>
      <div className='Stat-block-chunk'>
        <StatBlock
          title={'Duration'}
          value={roundDuration(averageDuration)}
          targetAchieved={contractionsAreLongEnough}
        />
        <StatBlock title={'Intensity'} value={averageIntesityValue} />
      </div>
    </div>
  )
}