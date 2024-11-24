import { useState } from 'react'
import FindInfoForm from './FindInfoForm'
import Input from '../../../component/Input'
import styles from '@styles/user/FindInfoModal.module.scss'
import axios from 'axios'

const localhost = process.env.REACT_APP_HOST

const PasswordReset = ({
  email,
  closeModal,
  setLoading,
}: {
  email: string
  closeModal: () => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [inputText, setInputText] = useState({ password: '', confirm: '' })

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText({ ...inputText, password: e.target.value })
  }

  const handleConfirmInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText({ ...inputText, confirm: e.target.value })
  }

  const handleResetPassword = () => {
    const data = {
      email,
      newPassword: inputText.password,
    }

    setLoading(true)

    inputText.password === inputText.confirm &&
      axios
        .post(`${localhost}/api/members/reset-password`, data)
        .then((res) => {
          setLoading(false)
          if (res.status === 200) {
            alert('비밀번호가 변경되었습니다.')
            closeModal()
          }
        })
        .catch((err) => setLoading(false))
  }

  return (
    <FindInfoForm
      title="비밀번호 재설정"
      explanation="재설정 할 비밀번호를 입력하세요."
    >
      <Input
        placeholder="비밀번호"
        type="password"
        value={inputText.password}
        onChange={(e) => handlePasswordInput(e)}
      />
      <Input
        placeholder="비밀번호 확인"
        type="password"
        value={inputText.confirm}
        onChange={(e) => handleConfirmInput(e)}
      />
      {inputText.password !== inputText.confirm && (
        <p className={styles.confirmPassword}>비밀번호가 일치하지 않습니다.</p>
      )}
      <button onClick={handleResetPassword}>확인</button>
    </FindInfoForm>
  )
}

export default PasswordReset
