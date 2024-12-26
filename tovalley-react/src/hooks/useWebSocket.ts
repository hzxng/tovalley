import { useState, useCallback } from 'react'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import axiosInstance from '@utils/axios_interceptor'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '@store/notification/notificationSlice'
import { newClient } from '@store/client/clientSlice'
import { RootState } from '@store/store'
import { setSubscription } from '@store/chat/subscriptionSlice'

const localhost = process.env.REACT_APP_HOST

const useWebSocket = () => {
  const [client, setClient] = useState<Client | null>(null)
  const [socket, setSocket] = useState<WebSocket>()
  const subscription = useSelector(
    (state: RootState) => state.subscription.value
  )

  const dispatch = useDispatch()

  const getMemberId = useCallback(
    async (client: Client) => {
      try {
        const { data } = await axiosInstance.get('/api/auth/members/me')
        // console.log(res)
        client.subscribe(
          `/sub/notification/${data.data}`, // 알림 토픽 구독
          (notify) => {
            dispatch(setNotification(JSON.parse(notify.body)))
          }
        )
      } catch (err) {
        console.log(err)
      }
    },
    [dispatch]
  )

  const connect = useCallback(() => {
    const socket = new SockJS(`${localhost}/stomp/chat`)
    setSocket(socket)

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 1000,
      // 웹 소켓이 끊어졌을 때 얼마나 빨리 연결을 시도할 지 설정.
      // recconectDelay에 설정된 대기 시간이 지난 후 다시 연결을 자동으로 시도한다.
    })

    stompClient.activate()
    // 웹소켓 연결 활성화
    // 활성화가 성공하면 onConnect가 실행 됨

    stompClient.onConnect = () => {
      // console.log('WebSocket connected')
      dispatch(newClient(stompClient))
      setClient(stompClient)

      getMemberId(stompClient)
    }
  }, [dispatch, getMemberId])

  const disconnect = useCallback(() => {
    if (client?.connected) {
      socket?.close()
      client.deactivate()
      setClient(null)
    }
  }, [client, socket])

  const outChatting = () => {
    if (client?.connected && subscription) {
      // console.log('구독해제!!')
      client.unsubscribe(subscription.id)
      dispatch(setSubscription(null))
    }
  }

  return { connect, disconnect, outChatting }
}

export default useWebSocket
