import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LoginModal.module.scss'

const LoginModal = () => {
  useEffect(() => {
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

  const navigation = useNavigate()

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBox}>
        <div className={styles.modalContent}>
          <span>로그인이 필요합니다.</span>
        </div>
        <div className={styles.confirm} onClick={() => navigation('/login')}>
          로그인
        </div>
      </div>
    </div>
  )
}

export default LoginModal
