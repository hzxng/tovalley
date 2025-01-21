import { ReviewContent } from 'types/user'
import styles from '@styles/user/MyReviewItem.module.scss'
import { useNavigate } from 'react-router-dom'
import RatingStar from '@component/RatingStar'
import cn from 'classnames'

const MyReviewItem = ({ item }: { item: ReviewContent }) => {
  const navigation = useNavigate()

  const moveToValleyPage = () => {
    navigation(`/valley/${item.waterPlaceId}`)
  }

  return (
    <div key={item.reviewId} className={styles.reviewItem}>
      <div className={styles.reviewTitle} onClick={moveToValleyPage}>
        <span>{item.waterPlaceName}</span>
      </div>
      <div className={styles.reviewContent}>
        {item.reviewImages && (
          <div className={styles.reviewImages}>
            <img src={item.reviewImages[0]} alt="리뷰 이미지" width="130px" />
          </div>
        )}
        <div
          className={cn(styles.reviewInfo, {
            [styles.noneImg]: !item.reviewImages,
          })}
        >
          <div className={styles.reviewRating}>
            <div>
              <span>
                <RatingStar rating={item.rating} size="20px" />
              </span>
              <span>{item.rating}</span>
            </div>
            <span>{item.waterQuality}</span>
          </div>
          <span>{item.createdReviewDate}</span>
          <div>
            <span>{item.content}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyReviewItem
