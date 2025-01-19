import React, { useState } from 'react'
import styles from '@styles/user/SignupPage.module.scss'
import SocialLogin from '@component/SocialLogin'
import SignupInput from '@features/user/components/SignupInput'
import cn from 'classnames'
import SubmitCode from '@features/user/components/SubmitCode'
import { FaRegCircleCheck } from 'react-icons/fa6'
import ConfirmModal from '@component/ConfirmModal'
import { Axios } from '@utils/axios_interceptor'

const Signup = () => {
  const [inputInfo, setInputInfo] = useState({
    name: '',
    email: '',
    nickName: '',
    code: '',
    password: '',
    confirmPassword: '',
  })

  const [available, setAvailable] = useState<{
    check: boolean
    available: boolean | null
    alert: string
  }>({
    check: false,
    available: null,
    alert: '한글, 영어, 숫자 포함 20자 이내',
  })

  const [emailDuplication, setEmailDuplication] = useState({
    status: false,
    message: '',
  })

  const [buttonText, setButtonText] = useState('중복확인')

  const [isCodeSubmit, setIsCodeSubmit] = useState(false)

  const [confirmModal, setConfirmModal] = useState({
    view: false,
    content: '',
  })

  const checkNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = /^[가-힣a-zA-Z0-9]{1,10}$/
    if (regExp.test(e.target.value) === true) {
      setAvailable({ ...available, check: true })
    } else {
      setAvailable({ ...available, check: false })
    }
  }

  const checkDuplication = () => {
    const data = {
      nickname: inputInfo.nickName,
    }

    // Axios.post('/api/members/check-nickname', data)
    //   .then((res) => {
    //     console.log(res)
    //     if (res.status === 200) {
    //       setAvailable({
    //         ...available,
    //         available: true,
    //         alert: res.data.msg,
    //       })
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     if (err.response.status === 400) {
    //       setAvailable({
    //         ...available,
    //         available: false,
    //         alert: err.response.data.msg,
    //       })
    //     }
    //   })
  }

  const checkEmailDuplication = () => {
    setEmailDuplication({ status: true, message: '사용 가능한 이메일입니다.' })
    setButtonText('인증')
    // setEmailDuplication('이미 가입된 이메일입니다.')

    // const config = {
    //   params: {
    //     email: inputInfo.email,
    //   },
    // }

    // axios
    //   .get(`${localhost}/api/members/find-id`, config)
    //   .then((res) => {
    //     console.log(res)
    //     res.status === 200 &&
    //       setAuthSubmit({ ...authSubmit, emailDuplication: 2 })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     err.response.status === 400 &&
    //       setAuthSubmit({ ...authSubmit, emailDuplication: 1 })
    //   })
  }

  const authCode = () => {
    setConfirmModal({
      view: true,
      content: '이메일 인증이 완료되었습니다.',
    })
    setIsCodeSubmit(false)
    setButtonText('인증완료')
    // const config = {
    //   params: {
    //     email: inputInfo.email,
    //     verifyCode: inputInfo.code,
    //   },
    // }

    // axios
    //   .get(`${localhost}/api/email-code`, config)
    //   .then((res) => {
    //     console.log(res)
    //     if (res.status === 200) {
    //       setAuthSubmit({
    //         ...authSubmit,
    //         authConfirm: false,
    //         emailAvailable: true,
    //       })
    //       setConfirmModal({
    //         view: true,
    //         content: '이메일 인증이 완료되었습니다.',
    //       })
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     setConfirmModal({ view: true, content: err.response.data.msg })
    //   })
  }

  const handleSignUp = () => {
    const data = {
      name: inputInfo.name,
      email: inputInfo.email,
      nickname: inputInfo.nickName,
      password: inputInfo.password,
    }

    if (
      !inputInfo.name ||
      !inputInfo.email ||
      !inputInfo.nickName ||
      !inputInfo.password ||
      !inputInfo.confirmPassword
    ) {
      setConfirmModal({ view: true, content: '모두 입력하세요.' })
    } else if (
      inputInfo.password === inputInfo.confirmPassword &&
      available.available &&
      emailDuplication.status
    ) {
      window.location.replace('/login')
    } else if (!emailDuplication.message) {
      setConfirmModal({
        view: true,
        content: '이메일 중복 확인이 필요합니다.',
      })
    } else if (buttonText !== '인증완료') {
      setConfirmModal({
        view: true,
        content: '이메일 인증이 필요합니다.',
      })
    } else if (!available.available) {
      setConfirmModal({
        view: true,
        content: '닉네임 중복 확인이 필요합니다.',
      })
    } else if (inputInfo.password !== inputInfo.confirmPassword) {
      setConfirmModal({ view: true, content: '비밀번호 확인이 필요합니다.' })
    }
  }

  const handleAuthEmail = () => {
    if (inputInfo.email && buttonText === '중복확인') checkEmailDuplication()
    if (buttonText === '인증') setIsCodeSubmit(true)
  }

  return (
    <>
      <div className={styles.body}>
        <div className={styles.signupContainer}>
          <span>회원가입</span>
          <div className={styles.signupInput}>
            <SignupInput
              name="이름"
              value={inputInfo.name}
              onChange={(e) => {
                setInputInfo({ ...inputInfo, name: e.target.value })
              }}
            />
            <SignupInput
              name="이메일"
              type="email"
              value={inputInfo.email}
              onChange={(e) => {
                setInputInfo({ ...inputInfo, email: e.target.value })
              }}
            >
              {buttonText === '인증완료' ? (
                <span className={styles.check}>
                  <FaRegCircleCheck />
                </span>
              ) : (
                <span
                  className={cn(styles.confirmBtn, {
                    [styles.disableBtn]: !inputInfo.email,
                  })}
                  onClick={handleAuthEmail}
                >
                  {buttonText}
                </span>
              )}
              {emailDuplication.message && (
                <span
                  className={cn(styles.emailAlert, styles.alert, {
                    [styles.available]: emailDuplication,
                  })}
                >
                  {emailDuplication.message}
                </span>
              )}
            </SignupInput>
            {isCodeSubmit && (
              <div className={styles.confirmCode}>
                <SubmitCode authCode={authCode} email={inputInfo.email} />
              </div>
            )}
            <SignupInput
              name="닉네임"
              value={inputInfo.nickName}
              onChange={(e) => {
                setInputInfo({ ...inputInfo, nickName: e.target.value })
              }}
              onBlur={checkNickname}
              maxLength={20}
            >
              <span
                className={cn({
                  [styles.confirmBtn]: available.check,
                  [styles.disableBtn]: !available.check,
                })}
                onClick={() => {
                  available.check && checkDuplication()
                }}
              >
                중복확인
              </span>
              <span className={styles.charCnt}>
                {inputInfo.nickName.length}/20
              </span>
            </SignupInput>
            <span
              className={cn(styles.defaultAlert, styles.default, {
                [styles.available]: available.available,
                [styles.alert]: available.available === false,
              })}
            >
              {available.alert}
            </span>
            <SignupInput
              name="비밀번호"
              type="password"
              value={inputInfo.password}
              onChange={(e) => {
                setInputInfo({ ...inputInfo, password: e.target.value })
              }}
            />
            <SignupInput
              name="비밀번호 확인"
              type="password"
              value={inputInfo.confirmPassword}
              onChange={(e) => {
                setInputInfo({ ...inputInfo, confirmPassword: e.target.value })
              }}
            >
              <span
                className={cn(styles.defaultAlert, styles.none, {
                  [styles.alert]:
                    inputInfo.password !== inputInfo.confirmPassword,
                })}
              >
                비밀번호가 일치하지 않습니다.
              </span>
            </SignupInput>
          </div>
          <div className={styles.signupBtn}>
            <button onClick={handleSignUp}>가입하기</button>
          </div>
        </div>
        <div className={styles.socialSignup}>
          <SocialLogin type="회원가입" size={40} />
        </div>
      </div>
      {confirmModal.view && (
        <ConfirmModal
          content={confirmModal.content}
          handleModal={setConfirmModal}
        />
      )}
    </>
  )
}

export default Signup
