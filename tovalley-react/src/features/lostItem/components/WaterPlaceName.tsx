import { PlaceName } from 'types/lost-found'
import styles from '@styles/lostItem/WaterPlaceName.module.scss'
import { useState } from 'react'
import cn from 'classnames'

const WaterPlaceName = ({
  el,
  writePage,
  selectPlace,
  handleClickPlaceName,
}: {
  el: PlaceName
  writePage: boolean | undefined
  selectPlace: PlaceName | undefined
  handleClickPlaceName: (el: PlaceName) => void
}) => {
  const [detailName, setDetailName] = useState('')

  return (
    <div
      key={el.waterPlaceId}
      className={styles.placeNameWrap}
      onMouseOver={() => setDetailName(el.waterPlaceName)}
      onMouseLeave={() => setDetailName('')}
    >
      {detailName === el.waterPlaceName && el.waterPlaceName.length >= 4 && (
        <span className={styles.detailName}>{el.waterPlaceName}</span>
      )}
      <span
        key={el.waterPlaceId}
        className={cn(styles.placeName, {
          [styles.placeNameSelect]: writePage && selectPlace === el,
        })}
        onClick={() => {
          setDetailName('')
          handleClickPlaceName(el)
        }}
      >
        {el.waterPlaceName}
      </span>
    </div>
  )
}

export default WaterPlaceName
