import { useState } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { TripPeopleCnt } from 'types/valley'
import styles from '@styles/valley/ScheduleInfo.module.scss'
import Modal from '@component/Modal'
import cn from 'classnames'
import dateFormat from '../utils/dateFormat'

const ScheduleInfo = ({
  nowDate,
  tripDate,
  waterPlaceName,
  detailAddress,
  setScheduleInfo,
  setAddScheduleBtn,
  setClickedDate,
  setPeopleCnt,
}: {
  nowDate: Date
  tripDate: Date | undefined
  waterPlaceName: string
  detailAddress: string
  setScheduleInfo: React.Dispatch<React.SetStateAction<boolean>>
  setAddScheduleBtn: React.Dispatch<React.SetStateAction<boolean>>
  setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  setPeopleCnt: React.Dispatch<React.SetStateAction<TripPeopleCnt>>
}) => {
  const [peopleCount, setPeopleCount] = useState(0)

  const addSchedule = (tripDate: Date) => {
    const date = dateFormat(tripDate)

    setPeopleCnt((prev) => {
      return {
        ...prev,
        [date]: peopleCount,
      }
    })
    setScheduleInfo(false)
    setAddScheduleBtn(false)
    setClickedDate(undefined)
  }

  const handlePeopleCnt = (type: string) => {
    if (type === 'plus') setPeopleCount((prev) => prev + 1)
    else peopleCount > 0 && setPeopleCount((prev) => prev - 1)
  }

  const modalClose = () => {
    setScheduleInfo(false)
    setAddScheduleBtn(false)
    setClickedDate(undefined)
  }

  const handleClickAdd = () => {
    if (peopleCount > 0) addSchedule(tripDate!)
  }

  return (
    <Modal>
      <div className={styles.infoBox}>
        <div>
          <h1>{dateFormat(tripDate!)}</h1>
          <div className={styles.valleyInfo}>
            <h4>{waterPlaceName}</h4>
            <span>{detailAddress}</span>
          </div>
          <div className={styles.peopleCnt}>
            <span>인원</span>
            <span
              className={styles.icon}
              onClick={() => handlePeopleCnt('minus')}
            >
              <AiFillMinusCircle />
            </span>
            <input value={peopleCount} readOnly />
            <span
              className={styles.icon}
              onClick={() => handlePeopleCnt('plus')}
            >
              <AiFillPlusCircle />
            </span>
          </div>
        </div>
        <div className={styles.addBtn}>
          <span onClick={modalClose}>취소하기</span>
          <span
            className={cn(styles.add, { [styles.active]: peopleCount > 0 })}
            onClick={handleClickAdd}
          >
            등록하기
          </span>
        </div>
      </div>
    </Modal>
  )
}

export default ScheduleInfo
