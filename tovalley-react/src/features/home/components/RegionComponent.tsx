import { DailyNationalWeather, NationalWeather } from 'types/main'
import cn from 'classnames'
import styles from '@styles/home/Weather.module.scss'

const RegionComponent = ({
  item,
  index,
  weatherDate,
  regionClicked,
  setRegionClicked,
}: {
  item: {
    ko: string
    en: string
  }
  index: number
  weatherDate: NationalWeather
  regionClicked: DailyNationalWeather
  setRegionClicked: React.Dispatch<React.SetStateAction<DailyNationalWeather>>
}) => {
  const currentRegion = weatherDate.dailyNationalWeather[index]

  const clickRegion = (region: DailyNationalWeather) => {
    setRegionClicked(region)
  }

  return (
    <div
      onClick={() => clickRegion(weatherDate.dailyNationalWeather[index])}
      className={cn(styles.regionContainer, styles[item.en], {
        [styles.clicked]: regionClicked.region === item.ko,
      })}
    >
      <span
        className={cn({
          [styles.clicked]: regionClicked.region === item.ko,
          [styles.small]: index === 6,
        })}
      >
        {item.ko}
      </span>
      {currentRegion.weatherIcon !== '' && (
        <img
          src={`https://openweathermap.org/img/wn/${currentRegion.weatherIcon}@2x.png`}
          alt="날씨 아이콘"
          width="50px"
        />
      )}
      <div className={styles.temperature}>
        <span>{currentRegion.minTemp.toFixed()}°</span>/
        <span>{currentRegion.maxTemp.toFixed()}°</span>
      </div>
    </div>
  )
}

export default RegionComponent
