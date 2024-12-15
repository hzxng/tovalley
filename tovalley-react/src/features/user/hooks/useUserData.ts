import axiosInstance from '@utils/axios_interceptor'
import { useEffect, useState } from 'react'
import { User } from 'types/user'

const useUserData = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loginModal, setLoginModal] = useState(false)

  useEffect(() => {
    axiosInstance
      .get('/api/auth/my-page')
      .then((res) => setUser(res.data.data))
      .catch((err) => {
        console.error(err)
        if (err.response?.status === 401) setLoginModal(true)
      })
  }, [])

  return { user, loginModal }
}

export default useUserData
