
import React, { useState } from 'react';
import { DateTime } from 'luxon';

export default function DurationTimer(props: {
  start: string,
  format?: string,
  updateMilli?: number
}) {
  const { start, format = 'mm:ss', updateMilli = 1000 } = props
  const [timerValue, setTimerValue] = useState(format);
  const now = DateTime.now()
  const duration = now.diff(DateTime.fromISO(start)).toFormat(format)

  setTimeout(() => {
    setTimerValue(duration)
  }, updateMilli)

  return (
    <span>{timerValue}</span>
  );
}