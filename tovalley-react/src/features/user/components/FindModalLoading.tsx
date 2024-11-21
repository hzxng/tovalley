import PulseLoader from 'react-spinners/PulseLoader'
import styles from '@styles/user/FindModalLoading.module.scss'

const FindModalLoading = () => {
  return (
    <div className={styles.container}>
      <PulseLoader color="#CCCCCC" margin={4} size={10} speedMultiplier={0.8} />
    </div>
  )
}

export default FindModalLoading
