import styles from '@styles/valley/ValleyTitle.module.scss'
import { WaterPlaceDetails } from 'types/valley'
import { BiImage } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

const ValleyTitle = ({
  waterPlaceDetails,
}: {
  waterPlaceDetails: WaterPlaceDetails
}) => {
  const [clickImg, setClickImg] = useState(false)
  const valleyInfo = useSelector((state: RootState) => state.valley.value)

  return (
    <div className={styles.title}>
      <div className={styles.valleyName}>
        <span>
          {valleyInfo ? valleyInfo.name : waterPlaceDetails.waterPlaceName}
        </span>
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
        <span>
          {valleyInfo ? valleyInfo.type : waterPlaceDetails.managementType}
        </span>
      </div>
      <div className={styles.valleyAddress}>
        <span>
          {valleyInfo ? valleyInfo.addr : waterPlaceDetails.detailAddress}
        </span>
      </div>
    </div>
  )
}

export default ValleyTitle
