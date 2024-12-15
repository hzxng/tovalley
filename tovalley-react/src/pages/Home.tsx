import styles from '@styles/home/Home.module.scss'
import Weather from '@features/home/components/Weather'
import Accident from '@features/home/components/Accident'
import PopularValley from '@features/home/components/PopularValley'
import RecentPost from '@features/home/components/RecentPost'
import useHomeData from '@features/home/hooks/useHomeData'
import Loading from '@component/Loading'
// import { data } from 'dummy/main-data'

const Home = () => {
  const { data: main, isLoading } = useHomeData()

  if (isLoading || !main) return <Loading />

  return (
    <div className={styles.mainPage}>
      <div className={styles.body}>
        <div className={styles.top}>
          <Weather
            nationalWeather={main.nationalWeather}
            alert={main.weatherAlert}
          />
          <Accident accident={main.accidentCountDto} />
        </div>
        <div>
          <PopularValley place={main.nationalPopularWaterPlaces} />
        </div>
        <div className={styles.recentPost}>
          <RecentPost recentLostPost={main.recentLostFoundBoards} />
          <RecentPost recentReviewPost={main.recentReviews} />
        </div>
      </div>
    </div>
  )
}

export default Home
