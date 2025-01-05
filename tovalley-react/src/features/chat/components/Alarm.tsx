import { useEffect, useState } from 'react'
import styles from '@styles/chat/Alarm.module.scss'
import { elapsedTime } from '@utils/elapsedTime'
import cn from 'classnames'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  chatRoomIdState,
  chatViewState,
  notificationState,
  notificationViewState,
} from 'recoil/atom'

const Alarm = () => {
  const [notification, setNotification] = useRecoilState(notificationState)
  const [chatView, setChatView] = useRecoilState(chatViewState)
  const notificationView = useRecoilValue(notificationViewState)
  const setChatRoomId = useSetRecoilState(chatRoomIdState)

  const [fade, setFade] = useState(true)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(false), 2700)
    const hideTimer = setTimeout(() => setNotification(null), 3000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [setNotification])

  const startChat = () => {
    if (notification?.chatRoomId) {
      setChatView(true)
      setChatRoomId(notification.chatRoomId)
    }
  }

  if (!notification || notificationView || chatView) return null

  return (
    <div className={styles.alarmWrap}>
      <div
        className={cn(styles.alarmComponent, {
          [styles.fadein]: fade,
          [styles.fadeout]: !fade,
        })}
        onClick={startChat}
      >
        <h4>{notification.senderNick}</h4>
        <p className={styles.alarmContent}>
          {notification.content ?? '사진을 보냈습니다.'}
        </p>
        {notification.createdDate && (
          <span className={styles.alarmTime}>
            {elapsedTime(notification.createdDate)}
          </span>
        )}
      </div>
    </div>
  )
}

export default Alarm
