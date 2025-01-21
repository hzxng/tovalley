import { useEffect, useState } from 'react'
import styles from '@styles/header/Header.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { BiUser } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { FaRegBell } from 'react-icons/fa'
import { IoChatbubblesSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'
import { RootState } from '@store/store'
import { view } from '@store/chat/chatViewSlice'
import { setNotificationView } from '@store/notification/notificationViewSlice'
import { enterChatRoom } from '@store/chat/chatRoomIdSlice'
import { navList } from '@features/header/utils/nav'
import useWebSocket from '@hooks/useWebSocket'

const Header = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const location = useLocation()

  const [login, setLogin] = useState(false)
  const [newAlarm, setNewAlarm] = useState(false)

  const chatView = useSelector((state: RootState) => state.view.value)
  const notificationView = useSelector(
    (state: RootState) => state.notificationView.value
  )
  const notification = useSelector(
    (state: RootState) => state.notification.value
  )
  const chatRoomId = useSelector((state: RootState) => state.chatRoomId.value)

  const { outChatting } = useWebSocket()

  useEffect(() => {
    localStorage.getItem('user') ? setLogin(true) : setLogin(false)
  }, [])

  useEffect(() => {
    if (notification?.notificationType === 'CHAT') setNewAlarm(true)
    else if (chatRoomId || notificationView) setNewAlarm(false)
  }, [notification, chatRoomId, notificationView])

  const handleLogout = () => {
    dispatch(view(false))
    localStorage.removeItem('user')
    window.location.replace('/')
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
          <div className={styles.logo} onClick={() => navigation('/')}>
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
              <span
                className={styles.myPage}
                onClick={() => {
                  dispatch(view(false))
                  navigation('/mypage')
                }}
              >
                마이페이지
              </span>
              <span className={styles.logout} onClick={handleLogout}>
                로그아웃
              </span>
              <span
                className={styles.myPageIcon}
                onClick={() => {
                  dispatch(view(false))
                  navigation('/mypage')
                }}
              >
                <BiUser />
              </span>
              <span className={styles.logOutIcon} onClick={handleLogout}>
                <FiLogOut />
              </span>
            </div>
          ) : (
            <div className={styles.signup}>
              <span onClick={() => navigation('/signup')}>회원가입</span>
              <span onClick={() => navigation('/login')}>로그인</span>
            </div>
          )}
        </div>
        <div className={styles.nav}>
          {navList.map(({ name, url }) => (
            <span
              key={name}
              onClick={() => {
                navigation(url)
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
      <div className={cn(styles.mobileNav)}>
        {navList.map(({ name, url }) => (
          <span
            key={name}
            onClick={() => {
              navigation(url)
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
