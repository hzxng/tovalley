import styles from '@styles/valley/ValleyTitle.module.scss'
import { WaterPlaceDetails } from 'types/valley'
import { BiImage } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'
import { useState } from 'react'

const ValleyTitle = ({
  waterPlaceDetails,
}: {
  waterPlaceDetails: WaterPlaceDetails
}) => {
  const [clickImg, setClickImg] = useState(false)

  return (
    <div className={styles.title}>
      <div className={styles.valleyName}>
        <span>{waterPlaceDetails.waterPlaceName}</span>
        {waterPlaceDetails.waterPlaceImage && (
          <span onClick={() => setClickImg(!clickImg)}>
            <BiImage color="white" size="28px" />
          </span>
        )}
        {clickImg && (
          <div className={styles.valleyDetailImg}>
            <img src={waterPlaceDetails.waterPlaceImage!} alt="계곡 이미지" />
            <span onClick={() => setClickImg(false)}>
              <IoMdClose size="30px" />
            </span>
          </div>
        )}
        <span>{waterPlaceDetails.managementType}</span>
      </div>
      <div className={styles.valleyAddress}>
        <span>{waterPlaceDetails.detailAddress}</span>
      </div>
    </div>
  )
}

export default ValleyTitle
