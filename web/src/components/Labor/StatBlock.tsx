import React from 'react'
import DurationTimer from './DurationTimer'

export default function StatBlock(props: {
  title: string, value?: string, durationStart?: string, durationFormat?: string
}) {
  const { title, value, durationStart, durationFormat } = props
  let display = <div className="Stat-block-value">{value}</div>
  if (durationStart) display = (<DurationTimer
    className={'Stat-block-value'}
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