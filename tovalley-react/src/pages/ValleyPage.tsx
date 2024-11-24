import { useEffect, useState } from 'react'
import ValleyInfo from '../component/valley/valleyInfo/ValleyInfo'
import ValleyQuality from '../component/valley/valleyQuality/ValleyQuality'
import ValleySchedule from '../component/valley/ValleySchedule'
import ValleyReview from '../component/valley/ValleyReview'
import axiosInstance from '../axios_interceptor'
import styles from '@styles/valley/ValleyPage.module.scss'
import { data } from 'dummy/valley-data'
import { ValleyData } from 'types/valley'
import LoginModal from '@features/valley/components/LoginModal'
import DangerSegments from '@features/valley/components/DangerSegment'

const ValleyPage = () => {
  const [valley, setValley] = useState<ValleyData | null>(null)

  const [loginModal, setLoginModal] = useState(false)
  const [dangerSegmentsView, setDangerSegmentsView] = useState(false)

  const dangerSegmentClose = () => {
    setDangerSegmentsView(false)
  }

  useEffect(() => {
    setValley(data)

    if (data.waterPlaceDetails.dangerSegments) setDangerSegmentsView(true)

    // axiosInstance
    //   .get(`/api/auth/water-places/${id}`)
    //   .then((res) => {
    //     console.log(res)
    //     setValley(res.data.data)
    //     setValleyReview(res.data.data.reviewRespDto)
    //     setPeopleCnt({
    //       tripPlanToWaterPlace: res.data.data.tripPlanToWaterPlace,
    //     })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     err.response.status === 401 && setLoginModal(true)
    //   })
  }, [])

  if (!valley) {
    return <div>loading</div>
  }

  return (
    <div className={styles.valleyPageContainer}>
      <div className={styles.valleyPageMain}>
        <ValleyInfo
          waterPlaceDetails={valley.waterPlaceDetails}
          weatherList={valley.waterPlaceWeathers}
          accidents={valley.accidents}
          rescueSupplies={valley.rescueSupplies}
        />
        <div className={styles.valleyPage}>
          <ValleyQuality waterPlaceDetails={valley.waterPlaceDetails} />
          <ValleySchedule
            tripPlanToWaterPlace={valley.tripPlanToWaterPlace}
            waterPlaceName={valley.waterPlaceDetails.waterPlaceName}
            detailAddress={valley.waterPlaceDetails.detailAddress}
            annualVisitors={valley.waterPlaceDetails.annualVisitors}
          />
          <ValleyReview reviewRespDto={valley.reviewRespDto} />
        </div>
      </div>
      {dangerSegmentsView && (
        <DangerSegments
          contents={valley.waterPlaceDetails.dangerSegments}
          handleModal={dangerSegmentClose}
        />
      )}
      {loginModal && <LoginModal />}
    </div>
  )
}

export default ValleyPage
