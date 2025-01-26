import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop({
  children,
}: {
  children: React.ReactNode
}) {
  const { pathname } = useLocation()

  useEffect(() => {
    // console.log('Scrolling to top')
    window.scrollTo(0, 0)
  }, [pathname])

  return <>{children}</>
}
