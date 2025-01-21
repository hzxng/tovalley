import { useState } from 'react'
import { Schedule } from 'types/user'
import TripScheduleItem from './TripScheduleItem'
import Category from './Category'
import { RiDeleteBin6Line } from 'react-icons/ri'
import styles from '@styles/user/TripSchedule.module.scss'
import { preSchedule, userData } from 'dummy/user-data'

const TripSchedule = ({ tripSchedules }: { tripSchedules: Schedule[] }) => {
  const [schedule, setSchedule] = useState<Schedule[] | null>(tripSchedules)
  const [scheduleBtn, setScheduleBtn] = useState('앞으로의 일정')
  const [checkedItems, setCheckedItems] = useState<Schedule[]>([])

  const fetchSchedules = async (type: string) => {
    setSchedule(
      type === '앞으로의 일정' ? userData.myUpcomingTripSchedules : preSchedule
    )
  }

  const checkedItemHandler = (schedule: Schedule, isChecked: boolean) => {
    setCheckedItems((prev) =>
      isChecked ? [...prev, schedule] : prev.filter((item) => item !== schedule)
    )
  }

  const handleDeleteSchedule = async () => {
    const filtered = schedule?.filter((e) => !checkedItems.includes(e))
    setSchedule(filtered ?? [])
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
