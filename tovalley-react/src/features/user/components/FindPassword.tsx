import { useState } from 'react'
import FindInfoForm from './FindInfoForm'
import useTimer, { MINUTES_IN_MS } from '@hooks/useTimer'
import SubmitCode from './SubmitCode'
import Input from '@component/Input'
import styles from '@styles/user/FindPassword.module.scss'
import { Axios } from '@utils/axios_interceptor'

interface FindPasswordProps {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setPwResetModal: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const FindPassword = ({
  email,
  setEmail,
  setPwResetModal,
  setLoading,
}: FindPasswordProps) => {
  const [verifyCode, setVerifyCode] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const { setTimeLeft } = useTimer()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const requestAuthEmail = async () => {
    if (!email) return

    try {
      setLoading(true)
      const response = await Axios.post('/api/email-code', { email })

      if (response.status === 200) {
        setLoading(false)
        setIsSubmit(true)
        setTimeLeft(MINUTES_IN_MS)
      }
    } catch (error: any) {
      setLoading(false)
      handleEmailError(error)
    }
  }

  const handleEmailError = (error: any) => {
    if (error.response?.status === 400) {
      const errorMessage = error.response.data?.msg || '이메일 인증 요청 실패'
      if (errorMessage === '유효성검사 실패') {
        alert('올바른 이메일 형식을 입력하세요.')
      } else if (errorMessage === '이메일 수신함을 확인하세요') {
        setIsSubmit(true)
        alert(errorMessage)
      }
    } else {
      setTimeLeft(0)
      alert('이메일 인증 요청 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  const verifyAuthCode = async () => {
    if (!verifyCode) return

    try {
      setLoading(true)
      const config = {
        params: {
          email,
          verifyCode,
        },
      }
      const response = await Axios.get('/api/email-code', config)

      if (response.status === 200) {
        setLoading(false)
        alert('인증에 성공했습니다.')
        setPwResetModal(true)
      }
    } catch (error: any) {
      setLoading(false)
      setVerifyCode('')
      handleCodeError(error)
    }
  }

  const handleCodeError = (error: any) => {
    if (error.response?.status === 400) {
      const errorMessage = error.response.data?.msg || '인증 코드 확인 실패'
      if (errorMessage === '이메일 인증에 실패했습니다') {
        alert(errorMessage)
      } else {
        alert('잠시 후 다시 시도해주세요.')
      }
    } else {
      alert('인증 코드 확인 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <>
      <FindInfoForm
        title="비밀번호 찾기"
        explanation="인증 코드를 받을 이메일을 입력하세요."
      >
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => handleEmailChange(e)}
        />
        <button onClick={requestAuthEmail}>비밀번호 찾기</button>
      </FindInfoForm>
      {isSubmit && (
        <div className={styles.confirmCode}>
          <SubmitCode authCode={verifyAuthCode} email={email} />
        </div>
      )}
    </>
  )
}

export default FindPassword
