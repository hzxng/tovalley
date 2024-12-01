import styles from '@styles/user/QualityBtn.module.scss'
import cn from 'classnames'

const QualityBtn = ({
  review,
  name,
  setReview,
  children,
}: {
  review: {
    quality: string
    content: string
  }
  setReview: React.Dispatch<
    React.SetStateAction<{
      quality: string
      content: string
    }>
  >
  name: string
  children: React.ReactNode
}) => {
  const isClicked = review.quality === name

  return (
    <div
      onClick={() => setReview({ ...review, quality: name })}
      className={cn(styles.qualityBtn, {
        [styles.clicked]: isClicked,
      })}
    >
      <span
        className={cn(styles.qualityIcon, {
          [styles.clicked]: isClicked,
        })}
      >
        {children}
      </span>
      <span
        className={cn(styles.qualityText, {
          [styles.clicked]: isClicked,
        })}
      >
        {name}
      </span>
    </div>
  )
}

export default QualityBtn
