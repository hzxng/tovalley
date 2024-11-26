import styles from '@styles/valley/WeatherItem.module.scss'
import { dateFormat } from '@utils/dateFormat'
import { getDayOfWeek } from '@utils/getDayOfWeek'
import { WaterPlaceWeathers } from 'types/valley'
import cn from 'classnames'

const WeatherItem = ({
  item,
  type,
}: {
  item: WaterPlaceWeathers
  type?: string
}) => {
  const weatherDetail = [
    { name: '습도', value: `${item.humidity.toFixed()}%` },
    {
      name: '풍속',
      value: `${item.windSpeed.toFixed()}m/s`,
    },
    { name: '강수량', value: `${item.rainPrecipitation.toFixed()}mm` },
    {
      name: '흐림정도',
      value: `${item.clouds.toFixed()}%`,
    },
    { name: '체감온도', value: `${item.dayFeelsLike.toFixed()}°` },
  ]

  return (
    <>
      {type !== 'mobile' ? (
        <div className={styles.weatherItem}>
          <div>
            <div className={styles.weatherInfoIcon}>
              <span>
                <img
                  src={`https://openweathermap.org/img/wn/${item.climateIcon}@2x.png`}
                  alt="날씨 아이콘"
                  width="55px"
                />
              </span>
              <span
                className={cn({
                  [styles.small]: item.climateDescription.length > 7,
                })}
              >
                {item.climateDescription}
              </span>
            </div>
            <div>
              <div className={styles.temperature}>
                <span>{item.lowestTemperature.toFixed()}°</span>
                <span> / </span>
                <span>{item.highestTemperature.toFixed()}°</span>
              </div>
              {weatherDetail.map((detail) => {
                return (
                  <div key={detail.name} className={styles.weatherItemDetail}>
                    <span>{detail.name}</span>
                    <span>{detail.value}</span>
                  </div>
                )
              })}
              <div
                className={cn(styles.dayInfo, {
                  [styles.today]: dateFormat(item.weatherDate) === '오늘',
                })}
              >
                <span>{getDayOfWeek(item.weatherDate)}</span>
                <span>{dateFormat(item.weatherDate)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.mobileWeatherItem}>
          <div
            className={cn(styles.dayInfo, {
              [styles.today]: dateFormat(item.weatherDate) === '오늘',
            })}
          >
            <span>{getDayOfWeek(item.weatherDate)}</span>
            <span>{dateFormat(item.weatherDate)}</span>
          </div>
          <div className={styles.weatherInfo}>
            <div className={styles.weatherInfoIcon}>
              <span>
                <img
                  src={`https://openweathermap.org/img/wn/${item.climateIcon}@2x.png`}
                  alt="날씨 아이콘"
                  width="45px"
                />
              </span>
            </div>
            <div className={styles.temperature}>
              <span>{item.lowestTemperature.toFixed()}°</span>
              <span> / </span>
              <span>{item.highestTemperature.toFixed()}°</span>
            </div>
          </div>
          <div className={styles.mobileWeatherDetail}>
            <div className={styles.moblieWeatherItemDetail}>
              {weatherDetail.map((detail) => {
                return (
                  <div key={detail.name}>
                    <span>{detail.value}</span>
                  </div>
                )
              })}
            </div>
            <div className={styles.mobileWeatherDesc}>
              {weatherDetail.map((detail) => {
                return (
                  <div key={detail.name}>
                    <span>{detail.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WeatherItem
