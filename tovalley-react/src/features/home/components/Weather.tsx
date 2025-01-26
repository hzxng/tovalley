import { useEffect, useState } from 'react'
import styles from '@styles/home/Weather.module.scss'
import { DailyNationalWeather, NationalWeather, WeatherAlert } from 'types/main'
import { regions } from '../utils/regions'
import WeatherDate from './WeatherDate'
import RegionComponent from './RegionComponent'
import Report from './Report'
import WeatherDetail from './WeatherDetail'
import { getPublicUrl } from '@utils/getPublicUrl'

const Weather = ({
  nationalWeather,
  alert,
}: {
  nationalWeather: NationalWeather[]
  alert: WeatherAlert
}) => {
  const [weatherDate, setWeatherDate] = useState<NationalWeather | null>(null)
  const [regionClicked, setRegionClicked] =
    useState<DailyNationalWeather | null>(null)

  useEffect(() => {
    if (nationalWeather.length > 0) {
      setWeatherDate(nationalWeather[0])
      setRegionClicked(nationalWeather[0].dailyNationalWeather[1])
    }
  }, [nationalWeather])

  const handleWeatherDateChange = (newWeatherDate: NationalWeather) => {
    setWeatherDate(newWeatherDate)
    setRegionClicked(newWeatherDate.dailyNationalWeather[1])
  }

  if (!weatherDate || !regionClicked) return <div>error</div>

  return (
    <div className={styles.weather}>
      <h4>전국날씨</h4>
      <WeatherDate
        nationalWeather={nationalWeather}
        weatherDate={weatherDate}
        setWeatherDate={handleWeatherDateChange}
      />
      <div className={styles.weatherInfo}>
        <div className={styles.weatherMap}>
          <div className={styles.weatherMapContainer}>
            <picture>
              <source
                srcSet={getPublicUrl('/img/map_img.webp')}
                type="image/webp"
              ></source>
              <source
                srcSet={getPublicUrl('/img/map_img.png')}
                type="image/jpg"
              ></source>
              <img
                src={getPublicUrl('/img/map_img.png')}
                alt="지도 이미지"
              ></img>
            </picture>

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
