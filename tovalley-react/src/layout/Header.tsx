import { useCallback, useEffect, useState } from 'react'
import styles from '@styles/header/Header.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import { RxHamburgerMenu } from 'react-icons/rx'
import { BiUser } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { FaRegBell } from 'react-icons/fa'
import { IoChatbubblesSharp } from 'react-icons/io5'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'
import { setSubscription } from '@store/chat/subscriptionSlice'
import axiosInstance from '@utils/axios_interceptor'
import { RootState } from '@store/store'
import { newClient } from '@store/client/clientSlice'
import { setNotification } from '@store/notification/notificationSlice'
import { view } from '@store/chat/chatViewSlice'
import { setNotificationView } from '@store/notification/notificationViewSlice'
import { enterChatRoom } from '@store/chat/chatRoomIdSlice'
import { navList } from '@features/header/utils/nav'

const cookies = new Cookies()
const localhost = process.env.REACT_APP_HOST

const Header = () => {
  const navigation = useNavigate()
  const location = useLocation()
  const [login, setLogin] = useState(false)
  const [navClick, setNavClick] = useState(false)
  const dispatch = useDispatch()
  const client = useSelector((state: RootState) => state.client.value)
  const chatView = useSelector((state: RootState) => state.view.value)
  const notificationView = useSelector(
    (state: RootState) => state.notificationView.value
  )
  const notification = useSelector(
    (state: RootState) => state.notification.value
  )
  const chatRoomId = useSelector((state: RootState) => state.chatRoomId.value)
  const [newAlarm, setNewAlarm] = useState(false)
  const [socket, setSocket] = useState<WebSocket>()
  const subscription = useSelector(
    (state: RootState) => state.subscription.value
  )

  const connectSocket = useCallback(() => {
    const newSocket = new SockJS(`${localhost}/stomp/chat`) // 서버와 웹소켓 연결
    setSocket(newSocket)

    const stompClient = new Client({
      webSocketFactory: () => newSocket,
      debug: (str) => {
        console.log(str)
      },
      reconnectDelay: 1000,
      // 웹 소켓이 끊어졌을 때 얼마나 빨리 연결을 시도할 지 설정.
      // recconectDelay에 설정된 대기 시간이 지난 후 다시 연결을 자동으로 시도한다.
    })

    stompClient.activate()
    // 웹소켓 연결 활성화
    // 활성화가 성공하면 onConnect가 실행 됨

    stompClient.onConnect = () => {
      console.log('connected!!')
      dispatch(newClient(stompClient))

      const getMemberId = async () => {
        try {
          const res = await axiosInstance.get('/api/auth/members/me')
          console.log(res)
          stompClient.subscribe(
            `/sub/notification/${res.data.data}`, // 알림 토픽 구독
            (notify) => {
              console.log(JSON.parse(notify.body))
              dispatch(setNotification(JSON.parse(notify.body)))
            }
          )
        } catch (err) {
          console.log(err)
        }
      }

      getMemberId()
    }
  }, [dispatch])

  useEffect(() => {
    const loginStatus = cookies.get('ISLOGIN')
    if (loginStatus === true) {
      setLogin(true)
      if (!client) {
        console.log('connectSocket')
        connectSocket()
      } // 웹 소켓이 연결되어 있다면 연결 요청 x
    } else {
      setLogin(false)
    }
  }, [login, client, connectSocket])

  useEffect(() => {
    if (notification?.notificationType === 'CHAT') setNewAlarm(true)
    else if (chatRoomId || notificationView) setNewAlarm(false)
  }, [notification, chatRoomId, notificationView])

  const handleLogout = () => {
    dispatch(view(false))
    axiosInstance
      .delete(`/api/logout`)
      .then((res) => {
        if (res.status === 200) {
          if (client) {
            socket?.close()
            window.location.replace('/')
          }
        }
      })
      .catch((err) => console.log(err))
  }

  const outChatting = () => {
    if (client?.connected && subscription) {
      console.log('구독해제!!')
      client.unsubscribe(subscription.id)
      dispatch(setSubscription(null))
    }
  }

  const moveToHome = () => {
    navigation('/')
  }

  const moveToMyPage = () => {
    dispatch(view(false))
    navigation('/mypage')
  }

  const moveToPage = (url: string) => {
    navigation(url)
  }

  const handleClickAlarm = () => {
    dispatch(setNotificationView(!notificationView))
    dispatch(enterChatRoom(null))
  }

  const handleClickChat = () => {
    outChatting()
    dispatch(view(!chatView))
    dispatch(enterChatRoom(null))
  }

  return (
    <div className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.headertop}>
          <div className={styles.hamburger}>
            <span onClick={() => setNavClick(!navClick)}>
              <RxHamburgerMenu />
            </span>
          </div>
          <div className={styles.logo} onClick={moveToHome}>
            <img
              src={process.env.PUBLIC_URL + '/img/투계곡-logo.png'}
              alt="tovalley logo"
              width="120px"
            />
          </div>
          {login ? (
            <div className={styles.login}>
              <div className={styles.alarm}>
                <div onClick={handleClickAlarm}>
                  <FaRegBell />
                </div>
                {newAlarm && <span>•</span>}
              </div>
              <div className={styles.chatIcon} onClick={handleClickChat}>
                <IoChatbubblesSharp />
              </div>
              <span className={styles.myPage} onClick={moveToMyPage}>
                마이페이지
              </span>
              <span className={styles.logout} onClick={handleLogout}>
                로그아웃
              </span>
              <span className={styles.myPageIcon} onClick={moveToMyPage}>
                <BiUser />
              </span>
              <span className={styles.logOutIcon} onClick={handleLogout}>
                <FiLogOut />
              </span>
            </div>
          ) : (
            <div className={styles.signup}>
              <span onClick={() => moveToPage('/signup')}>회원가입</span>
              <span onClick={() => moveToPage('/login')}>로그인</span>
            </div>
          )}
        </div>
        <div className={styles.nav}>
          {navList.map(({ name, url }) => (
            <span
              onClick={() => {
                moveToPage(url)
              }}
              className={cn(styles.navMenu, {
                [styles.clicked]: location.pathname === url,
              })}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
      <div className={cn(styles.mobileNav, { [styles.clicked]: navClick })}>
        {navList.map(({ name, url }) => (
          <span
            onClick={() => {
              moveToPage(url)
            }}
            className={cn(styles.mobileNavMenu, {
              [styles.clicked]: location.pathname === url,
            })}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Header
