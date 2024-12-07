import styles from './SocialLogin.module.scss'

const social_localhost = process.env.REACT_APP_SOCIAL_HOST

const SocialLogin = ({ type, size }: { type: string; size: number }) => {
  const KAKAO_AUTH_URL = `${social_localhost}/oauth2/authorization/kakao`
  const GOOGLE_AUTH_URL = `${social_localhost}/oauth2/authorization/google`
  const NAVER_AUTH_URL = `${social_localhost}/oauth2/authorization/naver`

  const Login = (url: string) => {
    window.location.href = url
  }

  return (
    <div>
      <div className={styles.socialLoginTitle}>
        <hr />
        <span>간편 {type}</span>
        <hr />
      </div>
      <div className={styles.socialLoginLogo}>
        <img
          src={process.env.PUBLIC_URL + '/img/login/kakao-logo.png'}
          alt="kakao logo"
          width={`${size}px`}
          onClick={() => Login(KAKAO_AUTH_URL)}
        />
        <img
          src={process.env.PUBLIC_URL + '/img/login/naver-logo.png'}
          alt="naver logo"
          width={`${size}px`}
          onClick={() => Login(NAVER_AUTH_URL)}
        />
        <img
          src={process.env.PUBLIC_URL + '/img/login/google-logo.png'}
          alt="google logo"
          width={`${size}px`}
          onClick={() => Login(GOOGLE_AUTH_URL)}
        />
      </div>
    </div>
  )
}

export default SocialLogin
