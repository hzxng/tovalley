import styles from '@styles/home/WeatherDatail.module.scss'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { DailyNationalWeather } from 'types/main'

const WeatherDetail = ({
  dailyNationalWeather,
}: {
  dailyNationalWeather: DailyNationalWeather
}) => {
  const detailMenu = [
    {
      type: '강수량',
      content: dailyNationalWeather.rainPrecipitation.toFixed(),
      unit: 'mm',
    },
    {
      type: '습도',
      content: dailyNationalWeather.humidity,
      unit: '%',
    },
    {
      type: '풍속',
      content: dailyNationalWeather.windSpeed.toFixed(),
      unit: 'm/s',
    },
  ]

  return (
    <div className={styles.weatherDetail}>
      <div className={styles.region}>
        <span>
          <FaMapMarkerAlt color="#383838" size="18px" />
        </span>
        <span>{dailyNationalWeather.region}</span>
      </div>
      <div className={styles.detailBox}>
        <div className={styles.detailMain}>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${dailyNationalWeather.weatherIcon}@2x.png`}
              alt="날씨 아이콘"
              width="90px"
            />
          </div>
          <div className={styles.detailMainInfo}>
            <div>
              <span
                style={
                  dailyNationalWeather.weatherDesc.length > 6
                    ? { fontSize: '0.8rem' }
                    : { fontSize: '1rem' }
                }
              >
                {dailyNationalWeather.weatherDesc}
              </span>
            </div>
            <div>
              <span>체감온도</span>
              <span>{dailyNationalWeather.dayFeelsLike.toFixed()}°</span>
            </div>
            <div>
              <span>흐림</span>
              <span>{dailyNationalWeather.clouds}%</span>
            </div>
          </div>
        </div>
        <div className={styles.temperature}>
          <div>
            <span>최저</span>
            <span>{dailyNationalWeather.minTemp.toFixed()}°</span>
          </div>
          <div>
            <span>최고</span>
            <span>{dailyNationalWeather.maxTemp.toFixed()}°</span>
          </div>
        </div>
        <div className={styles.weatherAddList}>
          {detailMenu.map((item, index) => {
            return (
              <div className={styles.weatherAdd} key={`${index}-${item}`}>
                <span>{item.type}</span>
                <div>
                  <span>{item.content}</span>
                  <span>{item.unit}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WeatherDetail
