import { useEffect, useState } from 'react'

export const MINUTES_IN_MS = 3 * 60 * 1000

const useTimer = () => {
  const INTERVAL = 1000
  const [timeLeft, setTimeLeft] = useState<number>(0)

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    '0'
  )
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0')

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL)
    }, INTERVAL)

    if (timeLeft <= 0) {
      clearInterval(timer)
      setTimeLeft(0)
    }

    return () => {
      clearInterval(timer)
    }
  }, [timeLeft])

  return { setTimeLeft, minutes, second }
}

export default useTimer
