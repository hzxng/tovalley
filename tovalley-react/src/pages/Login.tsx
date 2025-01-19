import { useEffect, useState } from 'react'
import styles from '@styles/user/LoginPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import SocialLogin from '@component/SocialLogin'
import FindInfoModal from '@features/user/components/FindInfoModal'
import Logo from '@component/Logo'
import Input from '@component/Input'

const cookies = new Cookies()

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
    passwordConfirm: false,
  })

  const [findInfo, setFindInfo] = useState('')

  const navigation = useNavigate()

  useEffect(() => {
    const social_login_error = cookies.get('social_login_error')

    if (social_login_error === 'email_already_registered') {
      alert('이미 자체 회원가입으로 등록된 회원입니다.')
      cookies.remove('social_login_error')
    }
  }, [])

  const handleLogin = () => {
    const { email, password } = login

    localStorage.setItem(
      'user',
      JSON.stringify({ id: email, password: password })
    )
    window.location.replace('/')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setLogin((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const enterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  const handleFindInfo = (type: string) => {
    setFindInfo(type)
  }

  const moveToSignUp = () => {
    navigation('/signup')
  }

  const closeModal = () => {
    setFindInfo('')
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.body}>
        <div className={styles.loginContainer}>
          <Logo />
          <div className={styles.loginInput}>
            <Input
              type="email"
              placeholder="이메일"
              value={login.email}
              onChange={(e) => handleChange(e, 'email')}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={login.password}
              onChange={(e) => handleChange(e, 'password')}
              onKeyDown={(e) => enterEvent(e)}
            />
            {login.passwordConfirm && (
              <span className={styles.passwordAlert}>
                비밀번호가 틀렸습니다.
              </span>
            )}
            <button onClick={() => handleLogin()}>로그인</button>
          </div>
          <div className={styles.socialLogin}>
            <SocialLogin type="로그인" size={50} />
          </div>
        </div>
        <div className={styles.loginFind}>
          <span onClick={() => handleFindInfo('아이디')}>아이디 찾기</span>
          <span onClick={() => handleFindInfo('비밀번호')}>비밀번호 찾기</span>
          <span onClick={moveToSignUp}>회원가입</span>
        </div>
        {findInfo && (
          <FindInfoModal findInfo={findInfo} closeModal={closeModal} />
        )}
      </div>
    </div>
  )
}

export default Login
