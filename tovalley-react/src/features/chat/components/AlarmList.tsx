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
  const notificationView = useSelector(
    (state: RootState) => state.notificationView.value
  )
  const [isPageEnd, setIsPageEnd] = useState<boolean>(false)
  const notification = useSelector(
    (state: RootState) => state.notification.value
  )
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const loginStatus = cookies.get('ISLOGIN')

  useEffect(() => {
    const requestAlarmList = async () => {
      try {
        const res = await axiosInstance.get('/api/auth/notifications')
        setAlarmList(res.data.data.content)
        if (res.data.data.content.length < 5 || res.data.data.last) {
          setIsPageEnd(true)
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (loginStatus && notificationView) requestAlarmList()
  }, [loginStatus, notificationView])

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
            chatNotificationId: alarmList ? prev[0].chatNotificationId + 1 : 1,
            chatRoomId: notification.chatRoomId,
            senderNick: notification.senderNick,
            createdDate: notification.createdDate,
            content: notification.content,
            hasRead: false,
          },
          ...prev,
        ]
      })
  }, [notification, notificationView, loading, alarmList])

  const getAlarmList = useCallback(async (value?: number | string) => {
    let config

    if (value) {
      config = {
        params: {
          cursorId: value,
        },
      }
    } else {
      config = undefined
    }

    try {
      setLoading(true)
      const res = await axiosInstance.get('/api/auth/notifications', config)
      setAlarmList((prev) => {
        return [...prev, ...res.data.data.content]
      })
      if (res.data.data.content.length < 5 || res.data.data.last) {
        setIsPageEnd(true)
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const { target } = useObserver({
    getData: getAlarmList,
    value: alarmList.length
      ? alarmList[alarmList.length - 1].chatNotificationId
      : undefined,
  })

  const deleteAlarm = (id: number) => {
    console.log(alarmList)
    const deleteAlarmList = alarmList?.filter((alarm) => {
      return alarm.chatNotificationId !== id
    })
    setAlarmList(deleteAlarmList)
    axiosInstance.delete(`/api/auth/notifications/${id}`).then((res) => {
      console.log(res)
    })
  }

  const deleteAllAlarm = () => {
    setAlarmList([])
    axiosInstance.delete('/api/auth/notifications').then((res) => {
      console.log(res)
    })
  }

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
      <span className={styles.allDelete} onClick={deleteAllAlarm}>
        모두 지우기
      </span>
      {alarmList?.map((alarm) => (
        <div
          key={alarm.chatNotificationId}
          className={styles.alarmComponent}
          onClick={() => startChat(alarm.chatRoomId)}
        >
          <span
            className={styles.closeBtn}
            onClick={() => deleteAlarm(alarm.chatNotificationId)}
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
