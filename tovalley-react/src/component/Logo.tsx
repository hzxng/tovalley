import styles from './Logo.module.scss'

const Logo = ({ handleClick }: { handleClick?: () => void }) => {
  return (
    <div className={styles.logo} onClick={handleClick && handleClick}>
      <img
        src={process.env.PUBLIC_URL + '/img/투계곡-logo.png'}
        alt="tovalley logo"
        width="120px"
      />
    </div>
  )
}

export default Logo
