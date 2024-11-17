import axios from 'axios'
import { useEffect, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import styles from '@styles/user/FindInfo.module.scss'

const localhost = process.env.REACT_APP_HOST

const FindInfo = ({
  setFindView,
  info,
}: {
  setFindView: React.Dispatch<
    React.SetStateAction<{
      findId: boolean
      findPassword: boolean
    }>
  >
  info: {
    title: string
    findKind: string
  }
}) => {
  useEffect(() => {
    setView({ ...view, codeView: false })
    document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])

  const [view, setView] = useState({
    codeView: true,
    passwordReset: false,
    emailConfirm: 0,
    resendView: false,
  })

  const [inputInfo, setInputInfo] = useState({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
  })

  const MINUTES_IN_MS = 3 * 60 * 1000
  const INTERVAL = 1000
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS)

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    '0'
  )
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0')

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL)
    }, INTERVAL)

    if (timeLeft <= 0) {
      clearInterval(timer)
      setTimeLeft(0)
      setView({ ...view, resendView: true })
    }

    return () => {
      clearInterval(timer)
    }
  }, [timeLeft])

  const handleFindId = () => {
    const config = {
      params: {
        email: inputInfo.email,
      },
    }

    axios
      .get(`${localhost}/api/members/find-id`, config)
      .then((res) => {
        console.log(res)
        res.status === 200 && setView({ ...view, emailConfirm: 1 })
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 400) {
          setView({ ...view, emailConfirm: 2 })
        }
      })
  }

  const authEmail = () => {
    const data = {
      email: inputInfo.email,
    }

    setInputInfo({ ...inputInfo, code: '' })
    setView({ ...view, codeView: true, resendView: false })

    axios
      .post(`${localhost}/api/email-code`, data)
      .then((res) => {
        console.log(res)
        setTimeLeft(MINUTES_IN_MS)
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 400) {
          if (err.response.data.msg === '유효성검사 실패') {
            alert('이메일 형식을 맞춰주세요.')
          } else if (err.response.data.msg === '이메일 수신함을 확인하세요') {
            alert(err.response.data.msg)
          } else {
            setTimeLeft(0)
            setView({ ...view, resendView: true })
          }
        }
      })
  }

  const authCode = () => {
    const config = {
      params: {
        email: inputInfo.email,
        verifyCode: inputInfo.code,
      },
    }

    axios
      .get(`${localhost}/api/email-code`, config)
      .then((res) => {
        console.log(res)
        res.status === 200 && setView({ ...view, passwordReset: true })
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 400) {
          setInputInfo({ ...inputInfo, code: '' })
          alert('잠시 후 다시 시도해주세요.')
        }
      })
  }

  const handleResetPassword = () => {
    const data = {
      email: inputInfo.email,
      newPassword: inputInfo.password,
    }

    inputInfo.password === inputInfo.confirmPassword &&
      axios
        .post(`${localhost}/api/members/reset-password`, data)
        .then((res) => {
          console.log(res)
          res.status === 200 &&
            setFindView({ findId: false, findPassword: false })
        })
        .catch((err) => console.log(err))
  }

  return (
    <div className={styles.findInfoContainer}>
      <div className={styles.findInfoModal}>
        <span
          className={styles.findInfoClose}
          onClick={() => setFindView({ findId: false, findPassword: false })}
        >
          <MdOutlineClose color="#B8B8B8" size="30px" />
        </span>
        {!view.passwordReset ? (
          <>
            <h1>{info.title} 찾기</h1>
            <span>
              {info.findKind === '아이디'
                ? '회원가입 시 등록했던 이메일을 입력하세요'
                : '인증 코드를 받을 이메일을 입력하세요.'}
            </span>
            <div className={styles.findInfoInput}>
              <input
                placeholder="이메일"
                value={inputInfo.email}
                onChange={(e) =>
                  setInputInfo({ ...inputInfo, email: e.target.value })
                }
              />
              <button
                onClick={() => {
                  info.findKind === '아이디' ? handleFindId() : authEmail()
                }}
              >
                {info.findKind} 찾기
              </button>
              <span>
                {' '}
                {view.emailConfirm === 0
                  ? ''
                  : view.emailConfirm === 1
                  ? '등록된 이메일입니다.'
                  : '등록된 이메일이 아닙니다.'}
              </span>
            </div>
            {view.codeView && (
              <div className={styles.confirmCode}>
                <span>인증 코드가 메일로 전송되었습니다.</span>
                <span className={styles.timer}>
                  {minutes} : {second}
                </span>
                <div className={styles.confirmCodeInput}>
                  <input
                    placeholder="확인 코드"
                    value={inputInfo.code}
                    onChange={(e) =>
                      setInputInfo({ ...inputInfo, code: e.target.value })
                    }
                  />
                  {!view.resendView ? (
                    <button onClick={authCode}>확인</button>
                  ) : (
                    <button
                      onClick={() => {
                        setInputInfo({ ...inputInfo, code: '' })
                        setTimeLeft(MINUTES_IN_MS)
                        authEmail()
                        setView({ ...view, resendView: false })
                      }}
                    >
                      재전송
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={styles.passwordReset}>
            <h1>비밀번호 재설정</h1>
            <span>재설정 할 비밀번호를 입력하세요.</span>
            <div className={styles.findInfoInput}>
              <input
                placeholder="비밀번호"
                type="password"
                value={inputInfo.password}
                onChange={(e) =>
                  setInputInfo({ ...inputInfo, password: e.target.value })
                }
              />
              <input
                placeholder="비밀번호 확인"
                type="password"
                value={inputInfo.confirmPassword}
                onChange={(e) =>
                  setInputInfo({
                    ...inputInfo,
                    confirmPassword: e.target.value,
                  })
                }
              />
              {inputInfo.password !== inputInfo.confirmPassword && (
                <p className={styles.confirmPassword}>
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
              <button onClick={handleResetPassword}>확인</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FindInfo
