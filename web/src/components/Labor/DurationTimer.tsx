
import React, { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';

export default function DurationTimer(props: {
  start: string,
  format?: string,
  updateMilli?: number,
  className?: string
}) {
  const { start, format = 'mm:ss', updateMilli = 1000, className } = props
  const [timerValue, setTimerValue] = useState(format);

  useEffect(() => {
    const timer = setTimeout(() => {
      const now = DateTime.now()
      const duration = now.diff(DateTime.fromISO(start)).toFormat(format)
      setTimerValue(duration)
    }, updateMilli)
    return () => clearTimeout(timer)
  }, [timerValue])


  return (
    <div className={className}>{timerValue}</div>
  );
}