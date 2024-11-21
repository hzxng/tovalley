import { useNavigate } from 'react-router-dom'
import { ValleyItemType } from 'types/valley-list'
import styles from '@styles/valleyList/ValleyItem.module.scss'

const ValleyItem = ({ item }: { item: ValleyItemType }) => {
  const navigation = useNavigate()

  const moveToValleyPage = (id: number) => {
    navigation(`/valley/${id}`)
  }

  return (
    <div
      className={styles.valleyItem}
      onClick={() => moveToValleyPage(item.waterPlaceId)}
    >
      <div>
        <img
          src={
            !item.waterPlaceImageUrl
              ? process.env.PUBLIC_URL + '/img/default-image.png'
              : item.waterPlaceImageUrl
          }
          alt="계곡 이미지"
        />
      </div>
      <div className={styles.valleyInfo}>
        <span className={styles.valleyName}>{item.waterPlaceName}</span>
        <span className={styles.valleyRegion}>{item.waterPlaceAddr}</span>
        <div className={styles.valleyType}>
          {item.waterPlaceCategory && (
            <span className={styles.valleyCategory}>
              {item.waterPlaceCategory}
            </span>
          )}
          {item.managementType && (
            <span className={styles.valleyCategory}>{item.managementType}</span>
          )}
        </div>
        <div className={styles.reviewContainer}>
          <span className={styles.valleyRating}>
            <span>
              {!item.waterPlaceRating || !Number(item.waterPlaceRating)
                ? 0
                : Number(item.waterPlaceRating).toFixed(1)}
            </span>
            <span>/5</span>
          </span>
          <span className={styles.valleyReview}>
            리뷰 {!item.waterPlaceReviewCnt ? 0 : item.waterPlaceReviewCnt}개
          </span>
        </div>
      </div>
    </div>
  )
}

export default ValleyItem