import { useEffect, useState } from 'react'

const useDebounce = (value: string, delay: number) => {
  const [query, setQeury] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setQeury(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return query
}

export default useDebounce
