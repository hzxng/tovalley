import { useCallback, useEffect, useRef, useState } from 'react'

const useObserver = ({
  getData,
  isPageEnd,
  value,
  setReqMsg,
  setNewMessageView,
}: {
  getData?: (value?: string) => Promise<void>
  isPageEnd?: boolean
  value?: string
  setReqMsg?: (value: React.SetStateAction<boolean>) => void
  setNewMessageView?: (value: React.SetStateAction<boolean>) => void
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

        if (setReqMsg && setNewMessageView) {
          setReqMsg(false)
          setNewMessageView(false)
        } else {
          setPage((prev) => prev + 1)
          value
            ? getData && (await getData(value))
            : getData && (await getData())
        }
      }
    },
    [getData, value, setReqMsg, setNewMessageView]
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
