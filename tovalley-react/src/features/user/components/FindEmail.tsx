import { useState } from 'react'
import FindInfoForm from './FindInfoForm'
import Input from '@component/Input'
import { Axios } from '@utils/axios_interceptor'

const FindEmail = ({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setMessage(null) // 입력 중 메시지 초기화
  }

  const handleFindEmail = async () => {
    if (!email) return

    setLoading(true)

    try {
      const config = { params: { email } }
      const response = await Axios.get('/api/members/find-id', config)

      if (response.status === 200) {
        setMessage('등록된 이메일입니다.')
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setMessage('등록된 이메일이 아닙니다.')
      } else {
        console.error('아이디 찾기 요청 중 오류 발생:', error)
        setMessage('오류가 발생했습니다. 다시 시도해주세요.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <FindInfoForm
      title="아이디(이메일) 찾기"
      explanation="회원가입 시 등록했던 이메일을 입력하세요"
    >
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={handleFindEmail}>아이디 찾기</button>
      {message && <span>{message}</span>}
    </FindInfoForm>
  )
}

export default FindEmail
