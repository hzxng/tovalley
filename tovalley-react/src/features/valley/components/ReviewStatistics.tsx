import RatingStar from '@component/RatingStar'
import styles from '@styles/valley/ReviewStatistics.module.scss'
import { ReviewRespDto } from 'types/valley'
import { MdOutlineChatBubble } from 'react-icons/md'
import useMobile from '@hooks/useMobile'

const ReviewStatistics = ({
  reviewRespDto,
}: {
  reviewRespDto: ReviewRespDto
}) => {
  const { innerWidth } = useMobile()

  return (
    <div className={styles.reviewStatistics}>
      <div className={styles.totalRating}>
        <span>총 평점</span>
        <div className={styles.ratingStar}>
          <span>
            <RatingStar
              rating={reviewRespDto.waterPlaceRating}
              size={
                innerWidth <= 730 ? '20px' : innerWidth <= 880 ? '25px' : '30px'
              }
            />
          </span>
        </div>
        <div className={styles.ratingNum}>
          <span>{reviewRespDto.waterPlaceRating}</span>
          <span> / 5</span>
        </div>
      </div>
      <div className={styles.totalReview}>
        <span>전체 리뷰 수</span>
        <span>
          <MdOutlineChatBubble color="#999999" />
        </span>
        <span>{reviewRespDto.reviewCnt}개</span>
      </div>
      <div className={styles.totalRatio}>
        <span>평점 비율</span>
        <div>
          <RatioItem
            num={5}
            ratingRatio={reviewRespDto.ratingRatio[5]}
            percent={reviewRespDto.ratingRatio[5] / reviewRespDto.reviewCnt}
          />
          <RatioItem
            num={4}
            ratingRatio={reviewRespDto.ratingRatio[4]}
            percent={reviewRespDto.ratingRatio[4] / reviewRespDto.reviewCnt}
          />
          <RatioItem
            num={3}
            ratingRatio={reviewRespDto.ratingRatio[3]}
            percent={reviewRespDto.ratingRatio[3] / reviewRespDto.reviewCnt}
          />
          <RatioItem
            num={2}
            ratingRatio={reviewRespDto.ratingRatio[2]}
            percent={reviewRespDto.ratingRatio[2] / reviewRespDto.reviewCnt}
          />
          <RatioItem
            num={1}
            ratingRatio={reviewRespDto.ratingRatio[1]}
            percent={reviewRespDto.ratingRatio[1] / reviewRespDto.reviewCnt}
          />
        </div>
      </div>
    </div>
  )
}

const RatioItem = ({
  num,
  ratingRatio,
  percent,
}: {
  num: number
  ratingRatio: number
  percent: number
}) => {
  return (
    <div className={styles.ratioItem}>
      <span>{num}점</span>
      <div>
        <div
          style={
            ratingRatio ? { width: `calc(${percent}*100%)` } : { width: '0' }
          }
        >
          <></>
        </div>
      </div>
      <span>{ratingRatio}</span>
    </div>
  )
}

export default ReviewStatistics
