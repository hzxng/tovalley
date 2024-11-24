import styles from '@styles/valley/DangerSegment.module.scss'
import { IoClose } from 'react-icons/io5'

const DangerSegments = ({
  contents,
  handleModal,
}: {
  contents: string
  handleModal: () => void
}) => {
  return (
    <div className={styles.dangerSegments}>
      <span onClick={handleModal}>
        <IoClose />
      </span>
      <div className={styles.title}>
        <span>🚨</span>
        <span>안전안내사항</span>
      </div>
      <div className={styles.contents}>
        <span>{contents}</span>
      </div>
    </div>
  )
}

export default DangerSegments
