import React from 'react'
import DurationTimer from './DurationTimer'

export default function StatBlock(props: {
  title: string, value?: string, durationStart?: string, durationFormat?: string, targetAchieved?: boolean
}) {
  const { title, value, durationStart, durationFormat, targetAchieved } = props
  const className = targetAchieved ? "Stat-block-value-achieved" : "Stat-block-value"
  let display = <div className={className}>{value}</div>
  if (durationStart) display = (<DurationTimer
    className={className}
    start={durationStart}
    format={durationFormat}
  />)
  return (
    <span className='Stat-block'>
      <h4>{title}</h4>
      {display}
    </span>
  )
}