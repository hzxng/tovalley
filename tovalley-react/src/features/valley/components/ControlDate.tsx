import React, { useState } from 'react'
import styles from '@styles/valley/ControlDate.module.scss'
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdNavigateBefore,
  MdNavigateNext,
} from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { BsFillFileEarmarkPostFill } from 'react-icons/bs'
import { BiCheck } from 'react-icons/bi'
import { TripPeopleCnt } from 'types/valley'
import useMobile from '@hooks/useMobile'
import cn from 'classnames'
import ScheduleInfo from './ScheduleInfo'
import useDidMountEffect from '@hooks/useDidMountEffect'

interface Props {
  nowDate: Date
  setNowDate: React.Dispatch<React.SetStateAction<Date>>
  addScheduleBtn: boolean
  setAddScheduleBtn: React.Dispatch<React.SetStateAction<boolean>>
  clickedDate: Date | undefined
  waterPlaceName: string
  detailAddress: string
  setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  tripPlanToWaterPlace: TripPeopleCnt
  setPeopleCnt: React.Dispatch<React.SetStateAction<TripPeopleCnt>>
}

const ControlDate = ({
  nowDate,
  setNowDate,
  addScheduleBtn,
  setAddScheduleBtn,
  clickedDate,
  waterPlaceName,
  detailAddress,
  setClickedDate,
  tripPlanToWaterPlace,
  setPeopleCnt,
}: Props) => {
  const { id } = useParams()
  const date = new Date(nowDate.getTime())
  const newDate = new Date()

  const [scheduleInfo, setScheduleInfo] = useState(false)
  const [yearDropdown, setYearDropdown] = useState(false)
  const { innerWidth } = useMobile()

  const congestionInfo = [
    { peopleCnt: '46 ~', color: '#FA7F64' },
    { peopleCnt: '31 ~ 45', color: '#FFD874' },
    { peopleCnt: '16 ~ 30', color: '#8EBBFF' },
    { peopleCnt: '1 ~ 15', color: '#E0E0E0' },
  ]

  useDidMountEffect(() => {
    const getMonthTripSchedule = () => {
      const nowMonth = `${nowDate.getMonth() + 1}`.padStart(2, '0')

      const yearMonth = `${nowDate.getFullYear()}-${nowMonth}`

      const config = {
        params: {
          yearMonth,
        },
      }

      // axiosInstance
      //   .get(`/api/auth/water-places/${id}/trip-schedules`, config)
      //   .then((res) => {
      //     setPeopleCnt({ tripPlanToWaterPlace: res.data.data })
      //   })
    }

    getMonthTripSchedule()
  }, [nowDate])

  const changeYear = (change: number) => {
    date.setFullYear(date.getFullYear() + change)
    setNowDate(date)
  }

  const changeMonth = (change: number) => {
    date.setMonth(date.getMonth() + change)
    setNowDate(date)
  }

  const handleYearDrop = () => {
    setYearDropdown((prev) => !prev)
    if (yearDropdown) changeYear(+1)
    else changeYear(-1)
  }

  const handleMonthBefore = () => {
    if (
      nowDate.getFullYear() < newDate.getFullYear() &&
      nowDate.getMonth() + 1 === 1
    )
      return
    else changeMonth(-1)
  }

  const handleMonthNext = () => {
    if (
      nowDate.getFullYear() === newDate.getFullYear() &&
      nowDate.getMonth() + 1 === 12
    )
      return
    else changeMonth(+1)
  }

  const handleClickAdd = () => {
    if (addScheduleBtn) clickedDate && setScheduleInfo(true)
    else setAddScheduleBtn(true)
  }

  const handleCancle = () => {
    setAddScheduleBtn(false)
    setClickedDate(undefined)
  }

  return (
    <div className={styles.container}>
      <div className={styles.controlCalendar}>
        <div className={styles.controlYear}>
          <h1>{`${nowDate.getFullYear()}`}</h1>
          <span onClick={handleYearDrop}>
            {yearDropdown ? <MdArrowDropUp /> : <MdArrowDropDown />}
          </span>
        </div>
        <div className={styles.controlMonth}>
          <span onClick={handleMonthBefore}>
            <MdNavigateBefore />
          </span>
          <h1>{`${nowDate.getMonth() + 1}`}</h1>
          <h2>월</h2>
          <span onClick={handleMonthNext}>
            <MdNavigateNext />
          </span>
        </div>
        <div className={styles.addSchedule}>
          {addScheduleBtn ? (
            <div className={styles.register}>
              <span
                onClick={handleClickAdd}
                className={cn(styles.addScheduleBtn, {
                  [styles.deactivate]: !clickedDate,
                })}
              >
                {innerWidth <= 510 ? <BiCheck /> : '등록하기'}
              </span>
              <span
                className={cn(styles.addScheduleBtn)}
                onClick={handleCancle}
              >
                취소
              </span>
            </div>
          ) : (
            <span className={styles.addScheduleBtn} onClick={handleClickAdd}>
              {innerWidth <= 510 ? <BsFillFileEarmarkPostFill /> : '일정 추가'}
            </span>
          )}
        </div>
      </div>
      <div className={styles.congestionInfo}>
        {congestionInfo.map((item, index) => {
          return (
            <div key={index}>
              <span>{item.peopleCnt}</span>
              <div style={{ backgroundColor: item.color }} />
            </div>
          )
        })}
      </div>
      {scheduleInfo && (
        <ScheduleInfo
          nowDate={nowDate}
          tripDate={clickedDate}
          waterPlaceName={waterPlaceName}
          detailAddress={detailAddress}
          setScheduleInfo={setScheduleInfo}
          setAddScheduleBtn={setAddScheduleBtn}
          setClickedDate={setClickedDate}
          setPeopleCnt={setPeopleCnt}
        />
      )}
    </div>
  )
}

export default ControlDate
