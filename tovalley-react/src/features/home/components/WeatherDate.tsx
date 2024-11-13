import { NationalWeather } from 'types/main'
import cn from 'classnames'
import styles from '@styles/home/Weather.module.scss'
import { getDayOfWeek } from '@utils/getDayOfWeek'
import { dateFormat } from '../utils/dateFormat'

const WeatherDate = ({
  item,
  weatherDate,
  setWeatherDate,
}: {
  key: number
  item: NationalWeather
  weatherDate: NationalWeather
  setWeatherDate: React.Dispatch<React.SetStateAction<NationalWeather>>
}) => {
  const clickWeatherDate = (el: NationalWeather) => {
    setWeatherDate(el)
  }

  return (
    <div
      onClick={() => clickWeatherDate(item)}
      className={cn(styles.date, {
        [styles.dateClicked]: weatherDate === item,
      })}
    >
      <span>{getDayOfWeek(item.weatherDate)}</span>
      <span>{dateFormat(item.weatherDate)}</span>
    </div>
  )
}

export default WeatherDate
