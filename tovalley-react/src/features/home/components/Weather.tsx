import { useEffect, useState } from 'react'
import styles from '@styles/home/Weather.module.scss'
import { DailyNationalWeather, NationalWeather, WeatherAlert } from 'types/main'
import { regions } from '../utils/regions'
import WeatherDate from './WeatherDate'
import RegionComponent from './RegionComponent'
import Report from './Report'
import WeatherDetail from './WeatherDetail'

const Weather = ({
  nationalWeather,
  alert,
}: {
  nationalWeather: NationalWeather[]
  alert: WeatherAlert
}) => {
  const [weatherDate, setWeatherDate] = useState<NationalWeather>(
    nationalWeather[0]
  )
  const [regionClicked, setRegionClicked] = useState<DailyNationalWeather>(
    nationalWeather[0].dailyNationalWeather[1]
  )

  useEffect(() => {
    setRegionClicked(weatherDate.dailyNationalWeather[1])
  }, [weatherDate])

  return (
    <div className={styles.weather}>
      <h4>전국날씨</h4>
      <div className={styles.dayContainer}>
        {nationalWeather.map((item, index) => {
          return (
            <WeatherDate
              key={index}
              item={item}
              weatherDate={weatherDate}
              setWeatherDate={setWeatherDate}
            />
          )
        })}
      </div>
      <div className={styles.weatherInfo}>
        <div className={styles.weatherMap}>
          <div className={styles.weatherMapContainer}>
            <img
              src={process.env.PUBLIC_URL + '/img/map_img.png'}
              alt="지도 이미지"
            ></img>
            {regions.map((item, index) => {
              return (
                <RegionComponent
                  key={item.en}
                  item={item}
                  index={index}
                  weatherDate={weatherDate}
                  regionClicked={regionClicked}
                  setRegionClicked={setRegionClicked}
                />
              )
            })}
          </div>
        </div>
        <div className={styles.weatherInfoDetail}>
          <Report alert={alert} />
          <WeatherDetail dailyNationalWeather={regionClicked} />
        </div>
      </div>
    </div>
  )
}

export default Weather
