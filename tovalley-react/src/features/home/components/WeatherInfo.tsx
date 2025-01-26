import styles from '@styles/home/Weather.module.scss'
import Report from './Report'
import WeatherDetail from './WeatherDetail'
import { DailyNationalWeather, NationalWeather, WeatherAlert } from 'types/main'
import React, { Suspense } from 'react'

const WeatherMap = React.lazy(() => import('./WeatherMap'))

interface WeatherInfoProps {
  weatherDate: NationalWeather
  regionClicked: DailyNationalWeather
  setRegionClicked: React.Dispatch<
    React.SetStateAction<DailyNationalWeather | null>
  >
  alert: WeatherAlert
}

export default function WeatherInfo({
  weatherDate,
  regionClicked,
  setRegionClicked,
  alert,
}: WeatherInfoProps) {
  return (
    <div className={styles.weatherInfo}>
      <Suspense fallback={<div className={styles.skeleton} />}>
        <WeatherMap
          weatherDate={weatherDate}
          regionClicked={regionClicked}
          setRegionClicked={setRegionClicked}
        />
      </Suspense>
      <div className={styles.weatherInfoDetail}>
        <Report alert={alert} />
        <WeatherDetail dailyNationalWeather={regionClicked} />
      </div>
    </div>
  )
}
