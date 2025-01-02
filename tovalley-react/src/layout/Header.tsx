import { useEffect, useState } from 'react'
import styles from '@styles/header/Header.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import { RxHamburgerMenu } from 'react-icons/rx'
import { BiUser } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { FaRegBell } from 'react-icons/fa'
import { IoChatbubblesSharp } from 'react-icons/io5'
import cn from 'classnames'
import axiosInstance from '@utils/axios_interceptor'
import { navList } from '@features/header/utils/nav'
import useWebSocket from '@hooks/useWebSocket'
import useChatStore from '@store/chatStore'
import useNotificationStore from '@store/notificationStore'

const cookies = new Cookies()

const Header = () => {
  const navigation = useNavigate()
  const location = useLocation()

  const [login, setLogin] = useState(false)
  const [navClick, setNavClick] = useState(false)
  const [newAlarm, setNewAlarm] = useState(false)

  const { chatRoomId, chatView, setChatRoomId, setChatView } = useChatStore()
  const { notification, notificationView, setNotificationView } =
    useNotificationStore()

  const { disconnect, outChatting } = useWebSocket()

  useEffect(() => {
    cookies.get('ISLOGIN') ? setLogin(true) : setLogin(false)
  }, [])

  useEffect(() => {
    if (notification?.notificationType === 'CHAT') setNewAlarm(true)
    else if (chatRoomId || notificationView) setNewAlarm(false)
  }, [notification, chatRoomId, notificationView])

  const handleLogout = () => {
    setChatView(false)
    axiosInstance
      .delete(`/api/logout`)
      .then((res) => {
        if (res.status === 200) {
          disconnect()
          window.location.replace('/')
        }
      })
      .catch((err) => console.log(err))
  }

  const handleClickAlarm = () => {
    setNotificationView(!notificationView)
    setChatRoomId(null)
  }

  const handleClickChat = () => {
    outChatting()
    setChatView(!chatView)
    setChatRoomId(null)
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
                  setChatView(false)
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
                  setChatView(false)
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
      <div className={cn(styles.mobileNav, { [styles.clicked]: navClick })}>
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
