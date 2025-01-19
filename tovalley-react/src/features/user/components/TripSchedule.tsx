import { useState } from 'react'
import { Schedule } from 'types/user'
import axiosInstance from '@utils/axios_interceptor'
import TripScheduleItem from './TripScheduleItem'
import Category from './Category'
import { RiDeleteBin6Line } from 'react-icons/ri'
import styles from '@styles/user/TripSchedule.module.scss'

const TripSchedule = ({ tripSchedules }: { tripSchedules: Schedule[] }) => {
  const [schedule, setSchedule] = useState<Schedule[] | null>(tripSchedules)
  const [scheduleBtn, setScheduleBtn] = useState('앞으로의 일정')
  const [checkedItems, setCheckedItems] = useState<Schedule[]>([])

  const fetchSchedules = async (type: string) => {
    const url =
      type === '앞으로의 일정'
        ? '/api/auth/my-page/upcoming-schedules'
        : '/api/auth/my-page/pre-schedules'

    try {
      const res = await axiosInstance.get(url)
      setSchedule(
        type === '앞으로의 일정' ? res.data.data : res.data.data.content
      )
    } catch (error) {
      console.error(error)
    }
  }

  const checkedItemHandler = (schedule: Schedule, isChecked: boolean) => {
    setCheckedItems((prev) =>
      isChecked ? [...prev, schedule] : prev.filter((item) => item !== schedule)
    )
  }

  const handleDeleteSchedule = async () => {
    try {
      const params = new URLSearchParams()
      checkedItems.forEach((item) =>
        params.append('tripScheduleIds', `${item.tripScheduleId}`)
      )

      await axiosInstance.delete('/api/auth/trip-schedules', { params })

      fetchSchedules(scheduleBtn)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickCategory = (category: string) => {
    setScheduleBtn(category)
    fetchSchedules(category)
  }

  return (
    <div className={styles.schedule}>
      <div className={styles.scheduleControl}>
        <div className={styles.categoryWrap}>
          {['앞으로의 일정', '지난 일정'].map((category) => (
            <Category
              key={category}
              name={category}
              category={scheduleBtn}
              handleClick={() => handleClickCategory(category)}
            />
          ))}
        </div>
        {scheduleBtn === '앞으로의 일정' && (
          <>
            <span
              onClick={handleDeleteSchedule}
              className={styles.deleteButton}
            >
              삭제
            </span>
            <span onClick={handleDeleteSchedule} className={styles.deleteIcon}>
              <RiDeleteBin6Line />
            </span>
          </>
        )}
      </div>
      <div className={styles.scheduleList}>
        <div>
          {schedule?.map((item) => {
            return (
              <TripScheduleItem
                key={item.tripScheduleId}
                schedule={item}
                scheduleBtn={scheduleBtn}
                checkItemHandler={checkedItemHandler}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TripSchedule
