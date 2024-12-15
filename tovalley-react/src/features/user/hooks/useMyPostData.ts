import useObserver from '@hooks/useObserver'
import axiosInstance from '@utils/axios_interceptor'
import { useState } from 'react'
import { LostFoundContent } from 'types/user'

const useMyPostData = () => {
  const [myPosts, setMyPosts] = useState<LostFoundContent[]>([])
  const [isPageEnd, setIsPageEnd] = useState<boolean>(false)

  const { target, page } = useObserver({
    getData: async () => {
      if (isPageEnd) return
      try {
        const res = await axiosInstance.get('/api/auth/my-board', {
          params: { page },
        })
        setMyPosts((prev) => [...prev, ...res.data.data.content])
        if (res.data.data.last || res.data.data.content.length < 5) {
          setIsPageEnd(true)
        }
      } catch (err) {
        console.error(err)
      }
    },
    isPageEnd,
  })

  return { myPosts, target, isPageEnd }
}

export default useMyPostData
