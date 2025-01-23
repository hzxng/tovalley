import styles from '@styles/home/RecentPost.module.scss'
import { useNavigate } from 'react-router-dom'
import { RecentLostPostType, RecentReviewType } from 'types/main'
import cn from 'classnames'
import { elapsedTime } from '@utils/elapsedTime'
import RatingStar from '@component/RatingStar'
import { Cookies } from 'react-cookie'
import React from 'react'

interface PostItemProps {
  title: string
  content: string
  category?: string
  createdAt: string
  onClick: () => void
  rating?: number
}

const cookies = new Cookies()

const PostItem = ({
  title,
  content,
  category,
  createdAt,
  onClick,
  rating,
}: PostItemProps) => {
  return (
    <div className={styles.recentPostItem} onClick={onClick}>
      <div className={styles.header}>
        <div className={styles.title}>
          {category && (
            <span
              className={cn(styles.category, {
                [styles.lost]: category === 'LOST',
                [styles.found]: category === 'FOUND',
              })}
            >
              {category === 'LOST' ? '물건 찾아요' : '주인 찾아요'}
            </span>
          )}
          <h4>{title}</h4>
        </div>
        <span>{elapsedTime(createdAt)}</span>
      </div>
      {rating && <RatingStar rating={rating} size="15px" />}
      <p>{content}</p>
    </div>
  )
}

const RecentPost = React.memo(
  ({
    recentLostPost,
    recentReviewPost,
  }: {
    recentLostPost?: RecentLostPostType[]
    recentReviewPost?: RecentReviewType[]
  }) => {
    const navigation = useNavigate()

    return (
      <div className={styles.recentPost}>
        <h1>{recentLostPost ? '최근 분실물 게시글' : '최근 리뷰'}</h1>
        <div className={styles.recentPostList}>
          {recentLostPost &&
            recentLostPost.map((post) => (
              <PostItem
                key={post.lostFoundBoardId}
                title={post.lostFoundBoardTitle}
                content={post.lostFoundBoardContent}
                category={post.lostFoundBoardCategory}
                createdAt={post.lostFoundBoardCreatedAt}
                onClick={() => {
                  cookies.get('ISLOGIN')
                    ? navigation(
                        `/lost-item/${post.lostFoundBoardCategory}/${post.lostFoundBoardId}`
                      )
                    : navigation('/login')
                }}
              />
            ))}
          {recentReviewPost &&
            recentReviewPost.map((post) => (
              <PostItem
                key={post.reviewId}
                title={post.reviewContent}
                content={post.reviewContent}
                createdAt={post.reviewCreatedAt}
                rating={post.reviewRating}
                onClick={() => navigation(`/valley/${post.waterPlaceId}`)}
              />
            ))}
        </div>
      </div>
    )
  },
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.recentLostPost) ===
      JSON.stringify(nextProps.recentLostPost) &&
    JSON.stringify(prevProps.recentReviewPost) ===
      JSON.stringify(nextProps.recentReviewPost)
)

export default RecentPost
