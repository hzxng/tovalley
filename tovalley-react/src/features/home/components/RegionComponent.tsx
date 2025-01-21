import { DailyNationalWeather, NationalWeather } from 'types/main'
import cn from 'classnames'
import styles from '@styles/home/Weather.module.scss'

type RegionItem = {
  ko: string
  en: string
}

interface RegionComponentProps {
  item: RegionItem
  index: number
  weatherDate: NationalWeather
  regionClicked: DailyNationalWeather
  setRegionClicked: React.Dispatch<
    React.SetStateAction<DailyNationalWeather | null>
  >
}

const RegionComponent = ({
  item,
  index,
  weatherDate,
  regionClicked,
  setRegionClicked,
}: RegionComponentProps) => {
  const handleClick = (region: DailyNationalWeather) => {
    setRegionClicked(region)
  }

  const { weatherIcon, minTemp, maxTemp } =
    weatherDate.dailyNationalWeather[index]
  const isClicked = regionClicked.region === item.ko
  const isSmall = index === 6

  return (
    <div
      onClick={() => handleClick(weatherDate.dailyNationalWeather[index])}
      className={cn(styles.regionContainer, styles[item.en], {
        [styles.clicked]: isClicked,
      })}
    >
      <span
        className={cn({
          [styles.clicked]: isClicked,
          [styles.small]: isSmall,
        })}
      >
        {item.ko}
      </span>
      {weatherIcon && (
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt="날씨 아이콘"
        />
      )}
      <div className={styles.temperature}>
        <span>{minTemp.toFixed()}°</span>/<span>{maxTemp.toFixed()}°</span>
      </div>
    </div>
  )
}

export default RegionComponent
