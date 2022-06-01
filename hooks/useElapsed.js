import { useState, useEffect } from 'react'

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiff = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000
  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.floor(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useElapsed (timestamp) {
  const [timeElapsed, setTimeElapsed] = useState(() => getDateDiff(timestamp))
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeElapsed = getDateDiff(timestamp)
      setTimeElapsed(newTimeElapsed)
    }, 1000)
    return () => clearInterval(interval)
  }, [timestamp])
  const rtf = new Intl.RelativeTimeFormat(
    'en-GB',
    { style: 'long' }
  ).format(new Date())
  const { value, unit } = timeElapsed
  return rtf.format(value, unit)
}
