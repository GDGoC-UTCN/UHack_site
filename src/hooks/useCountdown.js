import { useState, useEffect } from 'react'

export function useCountdown(targetDate) {
  const calcTimeLeft = () => {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return { days: '00', hours: '00', mins: '00', secs: '00', ended: true }
    return {
      days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
      hours: String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
      mins: String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
      secs: String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0'),
      ended: false,
    }
  }

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}
