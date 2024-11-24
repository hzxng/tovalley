import { useState } from 'react'
import FindInfoForm from './FindInfoForm'
import axios from 'axios'
import useTimer, { MINUTES_IN_MS } from '@hooks/useTimer'
import SubmitCode from './SubmitCode'
import Input from '@component/Input'
import styles from '@styles/user/FindPassword.module.scss'

const localhost = process.env.REACT_APP_HOST

const FindPassword = ({
  email,
  setEmail,
  setPwResetModal,
  setLoading,
}: {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setPwResetModal: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [inputText, setInputText] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const { setTimeLeft } = useTimer()

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const authEmail = () => {
    const data = {
      email,
    }

    setLoading(true)

    axios
      .post(`${localhost}/api/email-code`, data)
      .then((res) => {
        console.log(res)
        setLoading(false)
        setIsSubmit(true)
        setTimeLeft(MINUTES_IN_MS)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        if (err.response.status === 400) {
          if (err.response.data.msg === '유효성검사 실패') {
            alert('이메일 형식을 맞춰주세요.')
          } else if (err.response.data.msg === '이메일 수신함을 확인하세요') {
            setIsSubmit(true)
            alert(err.response.data.msg)
          } else {
            setTimeLeft(0)
          }
        }
      })
  }

  const authCode = () => {
    const config = {
      params: {
        email,
        verifyCode: inputText,
      },
    }

    setLoading(true)

    axios
      .get(`${localhost}/api/email-code`, config)
      .then((res) => {
        setLoading(false)
        res.status === 200 && setPwResetModal(true)
      })
      .catch((err) => {
        setLoading(false)
        setInputText('')
        if (err.response.status === 400) {
          if (err.response.data.msg === '이메일 인증에 실패했습니다') {
            alert(err.response.data.msg)
          } else {
            alert('잠시 후 다시 시도해주세요.')
          }
        }
      })
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
          onChange={(e) => handleEmailInput(e)}
        />
        <button onClick={() => email && authEmail()}>비밀번호 찾기</button>
      </FindInfoForm>
      {isSubmit && (
        <div className={styles.confirmCode}>
          <SubmitCode authCode={authCode} email={email} />
        </div>
      )}
    </>
  )
}

export default FindPassword
