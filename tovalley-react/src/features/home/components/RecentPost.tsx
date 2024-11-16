import styles from '@styles/home/RecentPost.module.scss'
import { useNavigate } from 'react-router-dom'
import { RecentLostPostType, RecentReviewType } from 'types/main'
import cn from 'classnames'
import { elapsedTime } from '@utils/elapsedTime'
import RatingStar from '@component/RatingStar'

const RecentPost = ({
  recentLostPost,
  recentReviewPost,
}: {
  recentLostPost?: RecentLostPostType[]
  recentReviewPost?: RecentReviewType[]
}) => {
  const navigation = useNavigate()

  const RecentLostFound = () => {
    const moveToLostFoundPage = (post: RecentLostPostType) => {
      navigation(
        `/lost-item/${post.lostFoundBoardCategory}/${post.lostFoundBoardId}`
      )
    }

    return (
      <>
        {recentLostPost?.map((post) => {
          return (
            <div
              key={post.lostFoundBoardId}
              className={styles.recentPostItem}
              onClick={() => moveToLostFoundPage(post)}
            >
              <div className={styles.header}>
                <div className={styles.title}>
                  <span
                    className={cn(styles.category, {
                      [styles.lost]: post.lostFoundBoardCategory === 'LOST',
                      [styles.found]: post.lostFoundBoardCategory === 'FOUND',
                    })}
                  >
                    {post.lostFoundBoardCategory === 'LOST'
                      ? '물건 찾아요'
                      : '주인 찾아요'}
                  </span>
                  <h4>{post.lostFoundBoardTitle}</h4>
                </div>
                <span>{elapsedTime(post.lostFoundBoardCreatedAt)}</span>
              </div>
              <p>{post.lostFoundBoardContent}</p>
            </div>
          )
        })}
      </>
    )
  }

  const RecentReview = () => {
    const moveToValleyPage = (post: RecentReviewType) => {
      navigation(`/valley/${post.waterPlaceId}`)
    }

    return (
      <>
        {recentReviewPost?.map((post) => {
          return (
            <div
              key={post.reviewId}
              className={styles.recentPostItem}
              onClick={() => moveToValleyPage(post)}
            >
              <div className={styles.header}>
                <div className={styles.title}>
                  <h4>{post.reviewContent}</h4>
                </div>
                <span>{elapsedTime(post.reviewCreatedAt)}</span>
              </div>
              <RatingStar rating={3} size="15px" />
              <p>{post.reviewContent}</p>
            </div>
          )
        })}
      </>
    )
  }

  return (
    <div className={styles.recentPost}>
      <h1>{recentLostPost ? '최근 분실물 게시글' : '최근 리뷰'}</h1>
      <div className={styles.recentPostList}>
        {recentLostPost ? <RecentLostFound /> : <RecentReview />}
      </div>
    </div>
  )
}

export default RecentPost
