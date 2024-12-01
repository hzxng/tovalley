import { useState } from 'react'
import useDidMountEffect from '@hooks/useDidMountEffect'
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

  const getPreSchedule = () => {
    axiosInstance
      .get('/api/auth/my-page/pre-schedules')
      .then((res) => {
        setSchedule(res.data.data.content)
      })
      .catch((err) => console.log(err))
  }

  const getUpcomingSchedule = () => {
    axiosInstance
      .get('/api/auth/my-page/upcoming-schedules')
      .then((res) => {
        setSchedule(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  useDidMountEffect(() => {
    if (scheduleBtn === '앞으로의 일정') getUpcomingSchedule()
    else getPreSchedule()
  }, [scheduleBtn])

  const checkedItemHandler = (id: Schedule, isChecked: boolean) => {
    if (isChecked) {
      checkedItems.push(id)
    } else if (!isChecked && checkedItems.indexOf(id) !== -1) {
      checkedItems.splice(checkedItems.indexOf(id), 1)
      setCheckedItems(checkedItems)
    }
  }

  const handleDeleteSchedule = () => {
    const params = new URLSearchParams()
    checkedItems.map((item) =>
      params.append('tripScheduleIds', `${item.tripScheduleId}`)
    )

    axiosInstance
      .delete('/api/auth/trip-schedules', { params: params })
      .then((res) => {
        console.log(res)
        if (scheduleBtn === '앞으로의 일정') {
          axiosInstance
            .get('/api/auth/my-page/upcoming-schedules')
            .then((res) => {
              console.log(res)
              setSchedule(res.data.data)
            })
            .catch((err) => console.log(err))
        } else {
          axiosInstance
            .get('/api/auth/my-page/pre-schedules')
            .then((res) => {
              console.log(res)
              setSchedule(res.data.data.content)
            })
            .catch((err) => console.log(err))
        }
      })
  }

  return (
    <div className={styles.schedule}>
      <div className={styles.scheduleControl}>
        <div className={styles.categoryWrap}>
          <Category
            name="앞으로의 일정"
            category={scheduleBtn}
            setCategory={setScheduleBtn}
          />
          <Category
            name="지난 일정"
            category={scheduleBtn}
            setCategory={setScheduleBtn}
          />
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
              <RiDeleteBin6Line color="#66a5fc" size="25px" />
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
