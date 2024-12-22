import React from 'react'
import styles from './ConfirmModal.module.scss'
import Modal from './Modal'

const ConfirmModal = ({
  content,
  handleModal,
  CustomFunc,
}: {
  content: string
  handleModal?: React.Dispatch<
    React.SetStateAction<{
      view: boolean
      content: string
    }>
  >
  CustomFunc?: () => void
}) => {
  const handleClick = () => {
    if (handleModal) handleModal({ view: false, content })
    else if (CustomFunc) CustomFunc()
    else window.location.reload()
  }

  return (
    <Modal>
      <div className={styles.modalBox}>
        <div className={styles.modalContent}>
          <span>{content}</span>
        </div>
        <div className={styles.confirm} onClick={handleClick}>
          확인
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
