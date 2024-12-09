import styles from '@styles/home/Home.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Weather from '@features/home/components/Weather'
import Accident from '@features/home/components/Accident'
import PopularValley from '@features/home/components/PopularValley'
import RecentPost from '@features/home/components/RecentPost'
import { MainData } from 'types/main'
// import { data } from 'dummy/main-data'

const localhost = process.env.REACT_APP_HOST

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [main, setMain] = useState<MainData | null>()

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${localhost}/api/main-page`)
      .then((res) => {
        // console.log(res)
        setMain(res.data.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading || !main) {
    return <div>loading</div>
  } else
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
