import styles from './SocialLogin.module.scss'

const SocialLogin = ({ type, size }: { type: string; size: number }) => {
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
        />
        <img
          src={process.env.PUBLIC_URL + '/img/login/naver-logo.png'}
          alt="naver logo"
          width={`${size}px`}
        />
        <img
          src={process.env.PUBLIC_URL + '/img/login/google-logo.png'}
          alt="google logo"
          width={`${size}px`}
        />
      </div>
    </div>
  )
}

export default SocialLogin
