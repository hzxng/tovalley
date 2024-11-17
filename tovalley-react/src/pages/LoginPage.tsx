import { useEffect, useState } from 'react'
import styles from '@styles/user/LoginPage.module.scss'
import { useNavigate } from 'react-router-dom'
import axiosInstance from './../axios_interceptor'
import { Cookies } from 'react-cookie'
import SocialLogin from '@component/SocialLogin'
import FindInfo from '@features/user/FindInfo'
import Logo from '@component/Logo'
import Input from '@features/user/Input'

const cookies = new Cookies()

const LoginPage = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
    passwordConfirm: false,
  })

  const [findView, setFindView] = useState({
    findId: false,
    findPassword: false,
  })

  const navigation = useNavigate()

  useEffect(() => {
    const social_login_error = cookies.get('social_login_error')
    console.log('social_login_error : ', social_login_error)

    if (social_login_error === 'email_already_registered') {
      alert('이미 자체 회원가입으로 등록된 회원입니다.')
      cookies.remove('social_login_error')
    }
  }, [])

  const handleLogin = () => {
    const data = {
      username: login.email,
      password: login.password,
    }

    axiosInstance
      .post('/api/login', data)
      .then((res) => {
        console.log(res)
        res.status === 200 && navigation('/')
      })
      .catch((err) => {
        console.log(err)
        err.response.status === 400
          ? setLogin({ ...login, passwordConfirm: true })
          : console.log(err)
      })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === 'email') {
      setLogin({ ...login, email: e.target.value })
    } else {
      setLogin({ ...login, password: e.target.value })
    }
  }

  const enterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
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
              onKeyDown={enterEvent}
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
          <span
            onClick={() => {
              setFindView({ ...findView, findId: true })
            }}
          >
            아이디 찾기
          </span>
          <span
            onClick={() => {
              setFindView({ ...findView, findPassword: true })
            }}
          >
            비밀번호 찾기
          </span>
          <span
            onClick={() => {
              navigation('/signup')
            }}
          >
            회원가입
          </span>
        </div>
        {findView.findId && (
          <FindInfo
            setFindView={setFindView}
            info={{ title: '아이디(이메일)', findKind: '아이디' }}
          />
        )}
        {findView.findPassword && (
          <FindInfo
            setFindView={setFindView}
            info={{ title: '비밀번호', findKind: '비밀번호' }}
          />
        )}
      </div>
    </div>
  )
}

export default LoginPage
