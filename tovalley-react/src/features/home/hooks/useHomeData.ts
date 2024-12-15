import { Axios } from '@utils/axios_interceptor'
import { useEffect, useState } from 'react'
import { MainData } from 'types/main'

const useHomeData = () => {
  const [data, setData] = useState<MainData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const response = await Axios.get('/api/main-page')
        setData(response.data.data)
      } catch (error) {
        console.error(error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  return { data, isLoading, hasError }
}

export default useHomeData
