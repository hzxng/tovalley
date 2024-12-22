import { useCallback, useEffect, useState } from 'react'
import styles from '@styles/chat/AlarmList.module.scss'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Cookies } from 'react-cookie'
import { elapsedTime } from '@utils/elapsedTime'
import { AlarmListType } from 'types/chat'
import { RootState } from '@store/store'
import { view } from '@store/chat/chatViewSlice'
import { enterChatRoom } from '@store/chat/chatRoomIdSlice'
import axiosInstance from '@utils/axios_interceptor'
import Drawer from './Drawer'
import cn from 'classnames'
import useObserver from '@hooks/useObserver'

const cookies = new Cookies()

const AlarmList = () => {
  const [alarmList, setAlarmList] = useState<AlarmListType[]>([])
  const [isPageEnd, setIsPageEnd] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  const notificationView = useSelector(
    (state: RootState) => state.notificationView.value
  )
  const notification = useSelector(
    (state: RootState) => state.notification.value
  )

  const dispatch = useDispatch()
  const loginStatus = cookies.get('ISLOGIN')

  const getAlarmList = useCallback(async (cursorId?: number | string) => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.get('/api/auth/notifications', {
        params: cursorId ? { cursorId } : undefined,
      })

      setAlarmList((prev) => [...prev, ...data.data.content])
      if (data.data.content.length < 5 || data.data.last) {
        setIsPageEnd(true)
      }
    } catch (error) {
      console.error('Error fetching alarm list:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (loginStatus && notificationView) getAlarmList()
  }, [loginStatus, notificationView, getAlarmList])

  useEffect(() => {
    if (
      notification &&
      notificationView &&
      !loading &&
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
  }, [notification, notificationView, loading])

  const deleteAlarm = useCallback(async (id: number) => {
    try {
      setAlarmList((prev) =>
        prev.filter((alarm) => alarm.chatNotificationId !== id)
      )
      await axiosInstance.delete(`/api/auth/notifications/${id}`)
    } catch (error) {
      console.error('Error deleting alarm:', error)
    }
  }, [])

  const deleteAllAlarms = useCallback(async () => {
    try {
      setAlarmList([])
      await axiosInstance.delete('/api/auth/notifications')
    } catch (error) {
      console.error('Error deleting all alarms:', error)
    }
  }, [])

  const startChat = (id: number) => {
    dispatch(view(true))
    dispatch(enterChatRoom(id))
  }

  const { target } = useObserver({
    getData: getAlarmList,
    value: alarmList.length
      ? alarmList[alarmList.length - 1].chatNotificationId
      : undefined,
  })

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
          <h4 className={cn(styles.nick, { [styles.hasRead]: alarm.hasRead })}>
            {alarm.senderNick}
          </h4>
          <p
            className={cn(styles.alarmContent, {
              [styles.hasRead]: alarm.hasRead,
            })}
          >
            {alarm.content ?? '사진을 보냈습니다.'}
          </p>
          {alarm.createdDate && (
            <span className={styles.alarmTime}>
              {elapsedTime(alarm.createdDate)}
            </span>
          )}
        </div>
      ))}
      {!isPageEnd && <div ref={target} className={styles.ref} />}
    </Drawer>
  )
}

export default AlarmList
