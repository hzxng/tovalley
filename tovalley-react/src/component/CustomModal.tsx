import { useEffect } from 'react'
import styles from './CustomModal.module.scss'

const CustomModal = ({
  content,
  customFunc,
  handleModal,
}: {
  content: string
  customFunc: () => void
  handleModal: () => void
}) => {
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

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBox}>
        <div className={styles.modalContent}>
          <span>{content}</span>
        </div>
        <div className={styles.confirm}>
          <div onClick={customFunc}>확인</div>
          <div onClick={handleModal}>취소</div>
        </div>
      </div>
    </div>
  )
}

export default CustomModal
