import { useState } from 'react'
import styles from '@styles/user/FindInfoModal.module.scss'
import { MdOutlineClose } from 'react-icons/md'
import FindEmail from './FindEmail'
import FindPassword from './FindPassword'
import PasswordReset from './PasswordReset'
import FindModalLoading from './FindModalLoading'
import Modal from '@component/Modal'

const FindInfoModal = ({
  findInfo,
  closeModal,
}: {
  findInfo: string
  closeModal: () => void
}) => {
  const [pwResetModal, setPwResetModal] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const renderContent = () => {
    if (pwResetModal) {
      return (
        <PasswordReset
          email={email}
          closeModal={closeModal}
          setLoading={setLoading}
        />
      )
    }

    if (findInfo === '아이디') {
      return <FindEmail setLoading={setLoading} />
    }

    return (
      <FindPassword
        email={email}
        setEmail={setEmail}
        setPwResetModal={setPwResetModal}
        setLoading={setLoading}
      />
    )
  }

  return (
    <Modal>
      <div className={styles.modal}>
        <span className={styles.modalClose} onClick={closeModal}>
          <MdOutlineClose color="#B8B8B8" size="30px" />
        </span>
        {renderContent()}
        {loading && <FindModalLoading />}
      </div>
    </Modal>
  )
}

export default FindInfoModal
