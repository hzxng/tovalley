import { useState } from 'react'
import styles from '@styles/home/PopularValley.module.scss'
import { useNavigate } from 'react-router-dom'
import { NationalPopularWaterPlaces } from 'types/main'
import useCarousel from '@hooks/useCarousel'
import Category from '@component/Category'
import { Axios } from '@utils/axios_interceptor'

const PopularValley = ({ place }: { place: NationalPopularWaterPlaces[] }) => {
  const [popularValley, setPopularValley] =
    useState<NationalPopularWaterPlaces[]>(place)
  const [clicked, setClicked] = useState<string>('평점')

  const navigation = useNavigate()
  const { currentIndex, carouselTransition } = useCarousel({
    duration: 500,
    interval: 2500,
    length: popularValley.length,
  })

  const getProcessedPopularList = () => {
    if (popularValley.length === 0) return []
    const extraItems = popularValley.slice(0, 4)
    return [...popularValley, ...extraItems]
  }

  const getPopluarValley = async (cond: string) => {
    try {
      const { data } = await Axios.get('/api/main-page/popular-water-places', {
        params: { cond },
      })
      setPopularValley(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const MobilePopularValley = () => {
    return (
      <>
        {popularValley.map((item, index) => {
          return (
            <div
              key={index}
              className={styles.mobilePopularValley}
              onClick={() => {
                navigation(`/valley/${item.waterPlaceId}`)
              }}
            >
              <div>
                <span className={styles.ranking}>{index + 1}</span>
                <div className={styles.valleyName}>
                  <span>{item.waterPlaceName}</span>
                  <span>{item.location}</span>
                </div>
              </div>
              <div className={styles.valleyReview}>
                <span>{`${item.rating}/5`}</span>
                <span>{`리뷰 ${item.reviewCnt}개`}</span>
              </div>
            </div>
          )
        })}
      </>
    )
  }

  return (
    <div className={styles.popularValley}>
      <h4>전국 인기 물놀이 장소</h4>
      <div className={styles.category}>
        {['평점', '리뷰'].map((ko, idx) => (
          <Category
            key={idx}
            category={{ ko, en: ko === '평점' ? 'RATING' : 'REVIEW' }}
            clicked={clicked}
            setClicked={setClicked}
            getData={getPopluarValley}
          />
        ))}
      </div>
      <div className={styles.popularList}>
        {getProcessedPopularList().map((item, index) => {
          return (
            <div
              key={index}
              className={styles.popularItem}
              onClick={() => {
                navigation(`/valley/${item.waterPlaceId}`)
              }}
              style={{
                transition: `${carouselTransition}`,
                transform: `translateX(-${currentIndex}00%)`,
              }}
            >
              <span>
                {(index + 1) % popularValley.length || popularValley.length}
              </span>
              <div className={styles.valleyItemImg}>
                <img
                  src={
                    item.waterPlaceImageUrl ??
                    process.env.PUBLIC_URL + '/img/default-image.png'
                  }
                  alt="계곡 이미지"
                  width="100%"
                />
              </div>
              <div className={styles.valleyInfo}>
                <div className={styles.valleyTitle}>
                  <span>{item.waterPlaceName}</span>
                  <span>{item.location}</span>
                </div>
                <div className={styles.valleyReview}>
                  <span>{`${item.rating}/5`}</span>
                  <span>{`리뷰 ${item.reviewCnt}개`}</span>
                </div>
              </div>
            </div>
          )
        })}
        <MobilePopularValley />
      </div>
    </div>
  )
}

export default PopularValley
