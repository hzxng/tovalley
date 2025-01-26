import { getPublicUrl } from '@utils/getPublicUrl'
import RegionComponent from './RegionComponent'
import styles from '@styles/home/Weather.module.scss'
import { regions } from '../utils/regions'
import { DailyNationalWeather, NationalWeather } from 'types/main'
import { useEffect, useState } from 'react'

interface ValleyMapProps {
  weatherDate: NationalWeather
  regionClicked: DailyNationalWeather
  setRegionClicked: React.Dispatch<
    React.SetStateAction<DailyNationalWeather | null>
  >
}

const WeatherMap = ({
  weatherDate,
  regionClicked,
  setRegionClicked,
}: ValleyMapProps) => {
  const [renderedRegions, setRenderedRegions] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderedRegions(regions.length)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
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
          <img src={getPublicUrl('/img/map_img.png')} alt="지도 이미지"></img>
        </picture>

        {regions.slice(0, renderedRegions).map((item, index) => (
          <RegionComponent
            key={item.en}
            item={item}
            index={index}
            weatherDate={weatherDate}
            regionClicked={regionClicked}
            setRegionClicked={setRegionClicked}
          />
        ))}
      </div>
    </div>
  )
}

export default WeatherMap
