import React from 'react'
import { TripPeopleCnt } from 'types/valley'
import styles from '@styles/valley/AllDay.module.scss'
import dateFormat from '../utils/dateFormat'
import { Container, PeopleCnt } from '@styles/valley/AllDay.style'

const AllDay = ({
  day,
  nowDate,
  clickedDate,
  setClickedDate,
  tripPlanToWaterPlace,
  addScheduleBtn,
}: {
  day: Date
  nowDate: Date
  clickedDate: Date | undefined
  setClickedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  tripPlanToWaterPlace: TripPeopleCnt
  addScheduleBtn: boolean
}) => {
  const newDate = new Date()

  const sameMonth = nowDate.getMonth() === day.getMonth()
  const sameDay = newDate.toDateString() === day.toDateString()
  const afterToday =
    new Date(newDate.toDateString()) <= new Date(day.toDateString())

  const clickDay: boolean = clickedDate
    ? clickedDate.toDateString() === day.toDateString()
    : false

  const clickDate = () => {
    if (addScheduleBtn && afterToday) setClickedDate(day)
  }

  const datePeopleCnt = tripPlanToWaterPlace[dateFormat(nowDate, day)]

  return (
    <Container
      className={styles.container}
      onClick={clickDate}
      sameMonth={sameMonth}
      sameDay={sameDay}
      afterToday={afterToday}
      clickDay={clickDay}
      addScheduleBtn={addScheduleBtn}
    >
      <p>{day.getDate()}</p>
      {sameMonth && datePeopleCnt ? (
        <PeopleCnt peopleCnt={datePeopleCnt} className={styles.peopleCnt} />
      ) : (
        <></>
      )}
    </Container>
  )
}

export default AllDay
