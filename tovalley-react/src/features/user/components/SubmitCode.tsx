import Input from '@component/Input'
import useTimer, { MINUTES_IN_MS } from '@hooks/useTimer'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const localhost = process.env.REACT_APP_HOST

const SubmitCode = ({
  authCode,
  email,
  setLoading,
}: {
  authCode: () => void
  email: string
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [inputText, setInputText] = useState('')
  const [buttonText, setButtonText] = useState('확인')
  const { timeOver, setTimeLeft, minutes, second } = useTimer()

  const authEmail = useCallback(() => {
    // const data = {
    //   email,
    // }

    setLoading && setLoading(true)

    setButtonText('확인')
    setTimeLeft(MINUTES_IN_MS)

    // axios
    //   .post(`${localhost}/api/email-code`, data)
    //   .then((res) => {
    //     console.log(res)
    //     setLoading && setLoading(false)

    //     setButtonText('확인')
    //     setTimeLeft(MINUTES_IN_MS)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     setLoading && setLoading(false)
    //     if (err.response.status === 400) {
    //       if (err.response.data.msg === '유효성검사 실패') {
    //         alert('이메일 형식을 맞춰주세요.')
    //       } else if (err.response.data.msg === '이메일 수신함을 확인하세요') {
    //         alert(err.response.data.msg)
    //       } else {
    //         setTimeLeft(0)
    //         setButtonText('재전송')
    //       }
    //     }
    //   })
  }, [setLoading, setTimeLeft])

  useEffect(() => {
    authEmail()
  }, [authEmail])

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
      authEmail()
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
