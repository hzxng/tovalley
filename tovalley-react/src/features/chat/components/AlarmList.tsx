import { useCallback, useEffect, useState } from 'react'
import styles from '@styles/chat/AlarmList.module.scss'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { elapsedTime } from '@utils/elapsedTime'
import { AlarmListType } from 'types/chat'
import { RootState } from '@store/store'
import { view } from '@store/chat/chatViewSlice'
import { enterChatRoom } from '@store/chat/chatRoomIdSlice'
import Drawer from './Drawer'
import cn from 'classnames'
import { data } from 'dummy/alarm-data'

const AlarmList = () => {
  const [alarmList, setAlarmList] = useState<AlarmListType[]>([])

  const notificationView = useSelector(
    (state: RootState) => state.notificationView.value
  )
  const notification = useSelector(
    (state: RootState) => state.notification.value
  )

  const dispatch = useDispatch()
  const loginStatus = localStorage.getItem('user')

  useEffect(() => {
    if (loginStatus && notificationView) setAlarmList(data)
  }, [loginStatus, notificationView])

  useEffect(() => {
    if (
      notification &&
      notificationView &&
      notification.notificationType === 'CHAT'
    )
      setAlarmList((prev) => {
        return [
          {
            chatNotificationId: prev[0] ? prev[0].chatNotificationId + 1 : 1,
            chatRoomId: notification.chatRoomId,
            senderNick: notification.senderNick,
            createdDate: notification.createdDate,
            content: notification.content,
            hasRead: false,
          },
          ...prev,
        ]
      })
  }, [notification, notificationView])

  const deleteAlarm = useCallback(async (id: number) => {
    setAlarmList((prev) =>
      prev.filter((alarm) => alarm.chatNotificationId !== id)
    )
  }, [])

  const deleteAllAlarms = useCallback(async () => {
    setAlarmList([])
  }, [])

  const startChat = (id: number) => {
    dispatch(view(true))
    dispatch(enterChatRoom(id))
  }

  return (
    <Drawer
      classNames={{
        container: styles.alarmListContainer,
        wrapper: styles.alarmListWrap,
      }}
      size={340}
      isView={notificationView}
      isAlarm
    >
      <span className={styles.allDelete} onClick={deleteAllAlarms}>
        모두 지우기
      </span>
      {alarmList.map((alarm) => (
        <div
          key={alarm.chatNotificationId}
          className={styles.alarmComponent}
          onClick={() => startChat(alarm.chatRoomId)}
        >
          <span
            className={styles.closeBtn}
            onClick={(e) => {
              e.stopPropagation()
              deleteAlarm(alarm.chatNotificationId)
            }}
          >
            <MdClose />
          </span>
          <h4 className={cn(styles.nick)}>{alarm.senderNick}</h4>
          <p className={cn(styles.alarmContent)}>
            {alarm.content ?? '사진을 보냈습니다.'}
          </p>
          {alarm.createdDate && (
            <span className={styles.alarmTime}>
              {elapsedTime(alarm.createdDate)}
            </span>
          )}
        </div>
      ))}
    </Drawer>
  )
}

export default AlarmList
