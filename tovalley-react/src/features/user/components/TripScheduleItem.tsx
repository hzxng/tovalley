import { useState } from 'react'
import styles from '@styles/user/TripScheduleItem.module.scss'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import WriteReviewModal from './WriteReviewModal'
import { Schedule } from 'types/user'
import RescueTable from '@component/RescueTable'
import styled from 'styled-components'

const Congestion = styled.div<{ traffic: number }>`
  background-color: ${({ traffic }) =>
    traffic >= 15
      ? `#FA7F64`
      : traffic >= 10
      ? `#FFD874`
      : traffic >= 5
      ? `#8EBBFF`
      : `#E0E0E0`};
`

const TripScheduleItem = ({
  schedule,
  scheduleBtn,
  checkItemHandler,
}: {
  schedule: Schedule
  scheduleBtn: string
  checkItemHandler: (id: Schedule, isChecked: boolean) => void
}) => {
  const [writeReviewModal, setWriteReviewModal] = useState(false)
  const [check, setCheck] = useState(false)
  const navigation = useNavigate()

  const moveToValleyPage = () => {
    navigation(`/valley/${schedule.waterPlaceId}`)
  }

  const toggleCheck = () => {
    setCheck((prev) => !prev)
    checkItemHandler(schedule, !check)
  }

  const openReviewModal = () => setWriteReviewModal(true)
  const closeReviewModal = () => setWriteReviewModal(false)

  return (
    <div className={styles.scheduleItem}>
      {scheduleBtn === '앞으로의 일정' && (
        <span className={styles.scheduleCheck} onClick={toggleCheck}>
          {check ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </span>
      )}
      <div className={styles.scheduleValleyInfo}>
        <div>
          <div className={styles.imageContainer}>
            <img
              src={
                schedule.waterPlaceImg ??
                process.env.PUBLIC_URL + '/img/default-image.png'
              }
              alt="계곡 사진"
            />
          </div>
          <div className={styles.scheduleInfo} onClick={moveToValleyPage}>
            <h4>{schedule.waterPlaceName}</h4>
            <span>{schedule.waterPlaceAddr}</span>
            <span>{schedule.waterPlaceRating ?? 0}</span>
            <span>/5</span>
            <span>리뷰 {schedule.waterPlaceReviewCnt ?? 0}개</span>
            <div className={styles.reservationInfo}>
              <div>
                <span>날짜</span>
                <span>{schedule.tripDate}</span>
              </div>
              <div>
                <span>인원</span>
                <span>{schedule.tripPartySize}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.valleyInfo}>
        {scheduleBtn === '앞으로의 일정' ? (
          <div className={styles.congestion}>
            <span>계곡 혼잡도</span>
            <Congestion traffic={schedule.waterPlaceTraffic} />
          </div>
        ) : (
          !schedule.hasReview && (
            <div className={styles.writeReviewBtn}>
              <span onClick={openReviewModal}>리뷰 쓰기</span>
            </div>
          )
        )}
        <div className={styles.responsiveCongestion}>
          <span>계곡 혼잡도</span>
          <Congestion traffic={schedule.waterPlaceTraffic} />
        </div>
        <div className={styles.rescueList}>
          <RescueTable rescueSupplies={schedule.rescueSupplies} />
        </div>
        {scheduleBtn === '지난 일정' && (
          <div className={styles.preCongestion}>
            <span>계곡 혼잡도</span>
            <Congestion traffic={schedule.waterPlaceTraffic} />
          </div>
        )}
      </div>
      {writeReviewModal && (
        <WriteReviewModal
          handleModalClose={closeReviewModal}
          valleyInfo={{
            id: schedule.tripScheduleId,
            title: schedule.waterPlaceName,
            addr: schedule.waterPlaceAddr,
            tripDate: schedule.tripDate,
            people: schedule.tripPartySize,
            img: schedule.waterPlaceImg,
          }}
        />
      )}
    </div>
  )
}

export default TripScheduleItem
