import { useEffect, useState } from 'react'
import styles from '@styles/chat/Alarm.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { elapsedTime } from '@utils/elapsedTime'
import { RootState } from '@store/store'
import { setNotification } from '@store/notification/notificationSlice'
import { view } from '@store/chat/chatViewSlice'
import { enterChatRoom } from '@store/chat/chatRoomIdSlice'
import cn from 'classnames'

const Alarm = () => {
  const notification = useSelector(
    (state: RootState) => state.notification.value
  )
  const notificationView = useSelector(
    (state: RootState) => state.notificationView.value
  )
  const chatView = useSelector((state: RootState) => state.view.value)
  const [fade, setFade] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFade(false)
    }, 2700)
    const timer = setTimeout(() => {
      dispatch(setNotification(null))
    }, 3000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(timer)
    }
  }, [dispatch])

  const startChat = () => {
    dispatch(view(true))
    dispatch(enterChatRoom(notification?.chatRoomId))
  }

  return (
    <div className={styles.alarmWrap}>
      <div
        className={cn(styles.alarmComponent, {
          [styles.fadein]: fade,
          [styles.fadeout]: !fade,
          [styles.none]: notificationView || chatView,
        })}
        onClick={startChat}
      >
        <h4>{notification?.senderNick}</h4>
        <p className={styles.alarmContent}>
          {notification?.content ?? '사진을 보냈습니다.'}
        </p>
        {notification?.createdDate && (
          <span className={styles.alarmTime}>
            {elapsedTime(notification.createdDate)}
          </span>
        )}
      </div>
    </div>
  )
}

export default Alarm
