import { useEffect, useState } from 'react'

const useCarousel = ({
  transition,
  count,
  length,
}: {
  transition: string
  count: number
  length: number
}) => {
  const [num, setNum] = useState(0)
  const [carouselTransition, setCarouselTransition] = useState(transition)

  function handleOriginSlide(index: number) {
    setTimeout(() => {
      setNum(index)
      setCarouselTransition('')
    }, 500)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setNum((num) => num + 1)
      setCarouselTransition(transition)
    }, count)

    return () => {
      clearInterval(timer)
    }
  }, [count, transition])

  useEffect(() => {
    if (num === length) handleOriginSlide(0)
  }, [num, length])

  return { num, carouselTransition }
}

export default useCarousel
