import styles from './ToggleBtn.module.scss'

const ToggleBtn = ({
  active,
  setActive,
  explanation,
}: {
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  explanation?: string[]
}) => {
  const handleActive = () => setActive((prev) => !prev)

  return (
    <>
      <div className={styles.toggleBtn} onClick={handleActive}>
        <div
          className={active ? styles.toggleSwitchOn : styles.toggleSwitchOff}
        />
      </div>
      {explanation && (
        <span className={styles.cursor} onClick={handleActive}>
          {active ? explanation[0] : explanation[1]}
        </span>
      )}
    </>
  )
}

export default ToggleBtn
