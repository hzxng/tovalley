import { useState } from 'react'
import { TripPeopleCnt } from 'types/valley'
import styles from '@styles/valley/ValleySchedule.module.scss'
import ControlDate from './ControlDate'
import DateBox from './DateBox'

const ValleySchedule = ({
  tripPlanToWaterPlace,
  waterPlaceName,
  detailAddress,
  annualVisitors,
}: {
  tripPlanToWaterPlace: TripPeopleCnt
  waterPlaceName: string
  detailAddress: string
  annualVisitors: string
}) => {
  const [nowDate, setNowDate] = useState<Date>(new Date())
  const [clickedDate, setClickedDate] = useState<Date>()
  const [addScheduleBtn, setAddScheduleBtn] = useState(false)
  const [peopleCnt, setPeopleCnt] =
    useState<TripPeopleCnt>(tripPlanToWaterPlace)

  return (
    <div className={styles.container}>
      <span className={styles.title}>계곡 혼잡도</span>
      <div className={styles.calendar}>
        <ControlDate
          nowDate={nowDate}
          setNowDate={setNowDate}
          addScheduleBtn={addScheduleBtn}
          setAddScheduleBtn={setAddScheduleBtn}
          clickedDate={clickedDate}
          waterPlaceName={waterPlaceName}
          detailAddress={detailAddress}
          setClickedDate={setClickedDate}
          tripPlanToWaterPlace={peopleCnt}
          setPeopleCnt={setPeopleCnt}
        />
        <DateBox
          nowDate={nowDate}
          setNowDate={setNowDate}
          clickedDate={clickedDate}
          setClickedDate={setClickedDate}
          tripPlanToWaterPlace={peopleCnt}
          addScheduleBtn={addScheduleBtn}
        />
        {annualVisitors && (
          <div className={styles.annualVisitors}>
            <span>연평균 방문자 수</span>
            <span>{(Number(annualVisitors) * 1000).toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ValleySchedule
