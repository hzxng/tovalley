import Input from '@component/Input'
import useTimer, { MINUTES_IN_MS } from '@hooks/useTimer'
import { useCallback, useEffect, useState } from 'react'
import { Axios } from '@utils/axios_interceptor'

interface SubmitCodeProps {
  authCode: () => void
  email: string
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

const SubmitCode = ({ authCode, email, setLoading }: SubmitCodeProps) => {
  const [inputText, setInputText] = useState('')
  const [buttonText, setButtonText] = useState('확인')
  const { timeOver, setTimeLeft, minutes, second } = useTimer()

  const handleAuthEmailError = useCallback(
    (err: any) => {
      if (err.response?.status === 400) {
        const errorMessage = err.response.data?.msg || '이메일 인증 요청 실패'
        if (errorMessage === '유효성검사 실패') {
          alert('올바른 이메일 형식을 입력하세요.')
        } else if (errorMessage === '이메일 수신함을 확인하세요') {
          alert(errorMessage)
        } else {
          setTimeLeft(0)
          setButtonText('재전송')
        }
      } else {
        alert('이메일 인증 요청 중 오류가 발생했습니다. 다시 시도해주세요.')
      }
    },
    [setTimeLeft]
  )

  const sendAuthEmail = useCallback(async () => {
    try {
      setLoading && setLoading(true)
      setButtonText('확인')
      setTimeLeft(MINUTES_IN_MS)

      await Axios.post('/api/email-code', { email })

      alert('인증 코드가 메일로 전송되었습니다.')
    } catch (err: any) {
      handleAuthEmailError(err)
    } finally {
      setLoading && setLoading(false)
    }
  }, [email, setLoading, setTimeLeft, handleAuthEmailError])

  useEffect(() => {
    sendAuthEmail()
  }, [sendAuthEmail])

  useEffect(() => {
    if (timeOver) setButtonText('재전송')
  }, [timeOver])

  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const handleSubmit = () => {
    if (buttonText === '확인') authCode()
    else {
      setInputText('')
      sendAuthEmail()
      setButtonText('확인')
    }
  }

  return (
    <div>
      <span>인증 코드가 메일로 전송되었습니다.</span>
      <span>
        {minutes} : {second}
      </span>
      <div>
        <Input
          placeholder="확인 코드"
          value={inputText}
          onChange={(e) => handleCodeInput(e)}
        />
        <button onClick={handleSubmit}>{buttonText}</button>
      </div>
    </div>
  )
}

export default SubmitCode
