import React from 'react'
import { ICalculatedLabor } from '../../../types/CalculatedLabor'
import { roundDuration } from '../../utils/round-duration'
import StatBlock from './StatBlock'

export default function ContractionStats(props: { stats: ICalculatedLabor['contraction'] }) {
  const { stats } = props
  const { averageIntensity, averageDuration } = stats
  const averageIntesityValue = `${Math.round(averageIntensity * 100) / 100}`
  return (
    <div>
      <h3 className='Stat-block-chunk-header'>Contractions</h3>
      <div className='Stat-block-chunk'>
        <StatBlock title={'Intensity'} value={averageIntesityValue} />
        <StatBlock title={'Duration'} value={roundDuration(averageDuration)} />
      </div>
    </div>
  )
}