import { useCallback, useEffect, useRef, useState } from 'react'

const useObserver = ({
  getData,
  observeFunc,
  isPageEnd,
  value,
}: {
  getData?: (value?: string | number) => Promise<void>
  observeFunc?: () => void
  isPageEnd?: boolean
  value?: string | number
}) => {
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
        if (getData) {
          value ? await getData(value) : await getData()
        } else observeFunc && observeFunc()
      }
    },
    [getData, value, observeFunc]
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
