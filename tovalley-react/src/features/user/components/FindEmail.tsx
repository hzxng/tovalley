import { useState } from 'react'
import axios from 'axios'
import FindInfoForm from './FindInfoForm'
import Input from '@component/Input'

const localhost = process.env.REACT_APP_HOST

const FindEmail = ({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [inputText, setInputText] = useState('')
  const [alert, setAlert] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const handleFindId = () => {
    const config = {
      params: {
        email: inputText,
      },
    }

    setLoading(true)

    axios
      .get(`${localhost}/api/members/find-id`, config)
      .then((res) => {
        setLoading(false)
        res.status === 200 && setAlert('등록된 이메일입니다.')
      })
      .catch((err) => {
        setLoading(false)
        if (err.response.status === 400) {
          setAlert('등록된 이메일이 아닙니다.')
        }
      })
  }

  return (
    <FindInfoForm
      title="아이디(이메일) 찾기"
      explanation="회원가입 시 등록했던 이메일을 입력하세요"
    >
      <Input
        type="email"
        placeholder="이메일"
        value={inputText}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={() => inputText && handleFindId()}>아이디 찾기</button>
      <span>{alert && alert}</span>
    </FindInfoForm>
  )
}

export default FindEmail
