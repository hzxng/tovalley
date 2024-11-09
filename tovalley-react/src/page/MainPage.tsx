import styles from '../css/main/MainPage.module.css'
import Header from '../component/header/Header'
import Weather from '../component/main/Weather'
import Accident from '../component/main/Accident/Accident'
import PopularValley from '../component/main/PopularValley'
import Footer from '../component/footer/Footer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import RecentPost from '../component/main/RecentPost'
import { MainData } from '../typings/main'

const localhost = process.env.REACT_APP_HOST

const MainPage = () => {
  const [loading, setLoading] = useState(false)
  const [main, setMain] = useState<MainData | null>(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${localhost}/api/main-page`)
      .then((res) => {
        console.log(res)
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
        <Header />
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
        <Footer />
      </div>
    )
}

export default MainPage
