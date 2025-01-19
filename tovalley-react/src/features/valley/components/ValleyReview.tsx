import { useState } from 'react'
import styles from '@styles/valley/ValleyReview.module.scss'
import { ReviewRespDto } from 'types/valley'
import PagingBtn from '@component/PagingBtn'
import ReviewStatistics from './ReviewStatistics'
import cn from 'classnames'
import ValleyReviewItem from './ValleyReviewItem'
import useDidMountEffect from '@hooks/useDidMountEffect'

const ValleyReview = ({ reviewRespDto }: { reviewRespDto: ReviewRespDto }) => {
  const [sort, setSort] = useState('최신순')
  const sortMenu = ['최신순', '평점 높은 순', '평점 낮은 순']
  const [page, setPage] = useState(1)

  const [valleyReview] = useState<ReviewRespDto>(reviewRespDto)

  useDidMountEffect(() => {
    // axiosInstance
    //   .get(`/api/auth/water-places/${id}/reviews`, config)
    //   .then((res) => {
    //     console.log(res)
    //     setValleyReview(res.data.data)
    //   })
    //   .catch((err) => console.log(err))
  }, [sort, page])

  return (
    <div className={styles.valleyReview}>
      <span>계곡 평점 및 리뷰</span>
      <ReviewStatistics reviewRespDto={reviewRespDto} />
      <div className={styles.reviewList}>
        <div className={styles.reviewSort}>
          {sortMenu.map((item) => {
            return (
              <div key={item}>
                <span
                  className={cn({ [styles.clicked]: sort === item })}
                  onClick={() => setSort(item)}
                >
                  {item}
                </span>
              </div>
            )
          })}
        </div>
        <div className={styles.reviewContainer}>
          {valleyReview.reviews.content.map((item) => {
            return <ValleyReviewItem key={item.reviewId} item={item} />
          })}
        </div>
      </div>
      <PagingBtn
        page={page}
        setPage={setPage}
        totalPages={reviewRespDto.reviews.totalPages}
      />
    </div>
  )
}

export default ValleyReview
