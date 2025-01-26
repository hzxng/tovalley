import { useEffect, useState } from 'react'
import styles from '@styles/home/Weather.module.scss'
import { DailyNationalWeather, NationalWeather, WeatherAlert } from 'types/main'
import WeatherDate from './WeatherDate'
import WeatherInfo from './WeatherInfo'

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
      <WeatherInfo
        weatherDate={weatherDate}
        regionClicked={regionClicked}
        setRegionClicked={setRegionClicked}
        alert={alert}
      />
    </div>
  )
}

export default Weather
