import { useEffect, useState } from 'react'
import styles from '@styles/home/PopularValley.module.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { NationalPopularWaterPlaces } from 'types/main'
import cn from 'classnames'
import useCarousel from '@hooks/useCarousel'

const localhost = process.env.REACT_APP_HOST

const PopularValley = ({ place }: { place: NationalPopularWaterPlaces[] }) => {
  const [popularValley, setPopularValley] =
    useState<NationalPopularWaterPlaces[]>(place)
  const [clicked, setClicked] = useState<string>('평점')

  const navigation = useNavigate()
  const { num, carouselTransition } = useCarousel({
    transition: 'transform 500ms ease-in-out',
    count: 2500,
    length: popularValley.length,
  })

  const [currList, setCurrList] = useState<NationalPopularWaterPlaces[]>([
    popularValley[popularValley.length - 1],
    ...popularValley,
    popularValley[0],
  ])

  useEffect(() => {
    if (popularValley.length !== 0) {
      setCurrList([
        ...popularValley,
        popularValley[0],
        popularValley[1],
        popularValley[2],
        popularValley[3],
      ])
    }
  }, [popularValley])

  const getPopluarValley = (cond: string) => {
    const config = {
      params: {
        cond: cond,
      },
    }

    axios
      .get(`${localhost}/api/main-page/popular-water-places`, config)
      .then((res) => {
        // console.log(res)
        setPopularValley(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  const Category = ({ category }: { category: { ko: string; en: string } }) => {
    return (
      <span
        onClick={() => {
          setClicked(category.ko)
          getPopluarValley(category.en)
        }}
        className={cn(styles.categoryBtn, {
          [styles.clickedCategory]: clicked === category.ko,
        })}
      >
        {category.ko}
      </span>
    )
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
        <Category category={{ ko: '평점', en: 'RATING' }} />
        <Category category={{ ko: '리뷰', en: 'REVIEW' }} />
      </div>
      <div className={styles.popularList}>
        {currList.map((item, index) => {
          return (
            <div
              key={index}
              className={styles.popularItem}
              onClick={() => {
                navigation(`/valley/${item.waterPlaceId}`)
              }}
              style={{
                transition: `${carouselTransition}`,
                transform: `translateX(-${num}00%)`,
              }}
            >
              <span>{index + 1 <= 8 ? index + 1 : (index + 1) % 8}</span>
              <div className={styles.valleyItemImg}>
                <img
                  src={
                    !item.waterPlaceImageUrl
                      ? process.env.PUBLIC_URL + '/img/default-image.png'
                      : item.waterPlaceImageUrl
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
