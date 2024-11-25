import styles from '@styles/valley/GaugeBar.module.scss'
import cn from 'classnames'

const GaugeBar = ({
  name,
  max,
  value,
}: {
  name: string
  max: number
  value: number
}) => {
  if (max === 10) value *= 10

  return (
    <div className={styles.gauge}>
      <span>{name}</span>
      <div className={styles.gaugeDetail}>
        <div className={cn(styles.gaugeBar, { [styles.ntu]: max === 101 })}>
          {value && <div style={{ bottom: `${value}px` }} />}
        </div>
        <span>{max}↑</span>
        {value > 0 && value < max && (
          <span
            style={{
              bottom: `${value - 5}px`,
            }}
          >
            {value}
          </span>
        )}
        <span>0</span>
      </div>
    </div>
  )
}

export default GaugeBar
