import { NationalWeather } from 'types/main'
import cn from 'classnames'
import styles from '@styles/home/Weather.module.scss'
import { getDayOfWeek } from '@utils/getDayOfWeek'
import { dateFormat } from '@utils/dateFormat'

const WeatherDate = ({
  nationalWeather,
  weatherDate,
  setWeatherDate,
}: {
  nationalWeather: NationalWeather[]
  weatherDate: NationalWeather
  setWeatherDate: (newWeatherDate: NationalWeather) => void
}) => {
  return (
    <div className={styles.dayContainer}>
      {nationalWeather.map((item) => {
        return (
          <div
            key={item.weatherDate}
            onClick={() => setWeatherDate(item)}
            className={cn(styles.date, {
              [styles.dateClicked]: weatherDate === item,
            })}
          >
            <span>{getDayOfWeek(item.weatherDate)}</span>
            <span>{dateFormat(item.weatherDate)}</span>
          </div>
        )
      })}
    </div>
  )
}

export default WeatherDate
