import { useState } from 'react'
import FindInfoForm from './FindInfoForm'
import styles from '@styles/user/FindInfoModal.module.scss'
import Input from '@component/Input'
import { Axios } from '@utils/axios_interceptor'

const PasswordReset = ({
  email,
  closeModal,
  setLoading,
}: {
  email: string
  closeModal: () => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value)
    setError(null) // 입력 중 에러 메시지 초기화
  }

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      setLoading(true)
      const data = { email, newPassword: password }
      const response = await Axios.post('/api/members/reset-password', data)

      if (response.status === 200) {
        alert('비밀번호가 변경되었습니다.')
        closeModal()
      }
    } catch (error) {
      console.error('비밀번호 재설정 중 오류 발생:', error)
      alert('비밀번호 재설정에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <FindInfoForm
      title="비밀번호 재설정"
      explanation="재설정 할 비밀번호를 입력하세요."
    >
      <Input
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={(e) => handleChange(e, setPassword)}
      />
      <Input
        placeholder="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={(e) => handleChange(e, setConfirmPassword)}
      />
      {error && <p className={styles.confirmPassword}>{error}</p>}
      <button onClick={handleResetPassword}>확인</button>
    </FindInfoForm>
  )
}

export default PasswordReset
