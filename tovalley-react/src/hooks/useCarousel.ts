import { useCallback, useEffect, useRef, useState } from 'react'

const useCarousel = ({
  duration,
  interval,
  length,
}: {
  duration: number
  interval: number
  length: number
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [carouselTransition, setCarouselTransition] = useState(
    `transform ${duration}ms ease-in-out`
  )

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetSlidePosition = useCallback(
    (index: number) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setCarouselTransition('')
        setCurrentIndex(index)
      }, duration)
    },
    [duration]
  )

  useEffect(() => {
    if (length <= 1) return

    const timer = setInterval(() => {
      // setCurrentIndex((prevIndex) => prevIndex + 1)
      setCarouselTransition(`transform ${duration}ms ease-in-out`)
    }, interval)

    return () => {
      clearInterval(timer)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [interval, duration, length])

  useEffect(() => {
    if (currentIndex === length) resetSlidePosition(0)
  }, [currentIndex, length, resetSlidePosition])

  return { currentIndex, carouselTransition }
}

export default useCarousel
