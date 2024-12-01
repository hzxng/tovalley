import { useState } from 'react'
import styles from '@styles/valley/ValleyInfo.module.scss'
import {
  Accidents,
  RescueSupplies,
  WaterPlaceDetails,
  WaterPlaceWeathers,
} from 'types/valley'
import cn from 'classnames'
import ValleyMap from './ValleyMap'
import AccidentTable from '@component/AccidentTable'
import WeatherItem from './WeatherItem'
import RescueTable from '../../../component/RescueTable'

const ValleyInfo = ({
  waterPlaceDetails,
  weatherList,
  accidents,
  rescueSupplies,
}: {
  waterPlaceDetails: WaterPlaceDetails
  weatherList: WaterPlaceWeathers[]
  accidents: Accidents
  rescueSupplies: RescueSupplies
}) => {
  const [mapMenu, setMapMenu] = useState('계곡위치')

  const menu = ['계곡위치', '병원', '약국']

  return (
    <div className={styles.valleyInfo}>
      <div className={styles.valleyMap}>
        <div className={styles.valleyPlaceMenu}>
          {menu.map((item) => {
            return (
              <span
                key={item}
                onClick={() => setMapMenu(item)}
                className={cn(styles.placeMenu, {
                  [styles.clickedMenu]: item === mapMenu,
                })}
              >
                {item}
              </span>
            )
          })}
        </div>
        {mapMenu !== '계곡위치' && <span>반경 10km 이내로 조회됩니다.</span>}
        <div className={styles.valleyPlace}>
          <ValleyMap
            latitude={Number(waterPlaceDetails.latitude)}
            longitude={Number(waterPlaceDetails.longitude)}
            menu={mapMenu}
          />
        </div>
      </div>
      <div className={styles.valleyDetail}>
        <div className={styles.valleyWeather}>
          <span>{waterPlaceDetails.town} 날씨</span>
          <div className={styles.weatherList}>
            {weatherList.map((item, index) => {
              return <WeatherItem key={index} item={item} />
            })}
          </div>
          <div className={styles.mobileWeatherList}>
            {weatherList.map((item, index) => {
              return <WeatherItem key={index} item={item} type="mobile" />
            })}
          </div>
        </div>
        <div className={styles.valleyAccident}>
          <span className={styles.title}>최근 5년간 사고 수</span>
          <AccidentTable accident={accidents} />
        </div>
        <div className={styles.rescueSupplies}>
          <span className={styles.title}>구조용품 및 안내표지판 현황</span>
          <div className={styles.rescueList}>
            <RescueTable
              rescueSupplies={rescueSupplies}
              dangerSignboardsNum={waterPlaceDetails.dangerSignboardsNum}
              isDetailPage
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ValleyInfo
