import styles from '@styles/lostItem/LostItemPostItem.module.scss'
import { LostList } from 'types/lost-found'
import { FaRegComment } from 'react-icons/fa'
import { elapsedTime } from '@utils/elapsedTime'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'

const LostItemPostItem = ({ item }: { item: LostList }) => {
  const navigation = useNavigate()
  const moveToLostItemPost = () => {
    navigation(`/lost-item/${item.category}/${item.id}`)
  }

  return (
    <div className={styles.lostItemPost} onClick={moveToLostItemPost}>
      <div className={styles.lostItemContent}>
        <div className={styles.title}>
          <span
            className={cn(styles.categoryLost, {
              [styles.categoryFound]: item.category === 'FOUND',
            })}
          >
            {item.category === 'FOUND' ? '주인 찾아요' : '물건 찾아요'}
          </span>
          <h4>{item.title}</h4>
        </div>
        <p>{item.content}</p>
        <div className={styles.postInfo}>
          <span>{elapsedTime(item.postCreateAt)}</span>
          <span>{item.author}</span>
          <div className={styles.comment}>
            <FaRegComment />
            <span>{item.commentCnt}</span>
          </div>
        </div>
      </div>
      {item.postImage && (
        <div className={styles.lostItemImage}>
          <div className={styles.imageContainer}>
            <img src={item.postImage} alt="postImage" />
          </div>
        </div>
      )}
    </div>
  )
}

export default LostItemPostItem
