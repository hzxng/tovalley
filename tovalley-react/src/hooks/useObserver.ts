import { useCallback, useEffect, useRef, useState } from 'react'

const useObserver = (getData: () => Promise<void>, isPageEnd: boolean) => {
  const target = useRef<HTMLDivElement>(null)

  const [page, setPage] = useState(0)

  const handleObserver = useCallback(
    async (
      [entry]: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target)
        setPage((prev) => prev + 1)
        await getData()
      }
    },
    [getData]
  )

  useEffect(() => {
    if (!target.current) return

    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver(handleObserver, option)

    target.current && observer.observe(target.current)

    return () => observer && observer.disconnect()
  }, [handleObserver, isPageEnd])

  return { target, page }
}

export default useObserver
