import { Route, Routes } from 'react-router-dom'
import './App.css'
import ValleyPage from './pages/ValleyPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import MyPage from './pages/MyPage'
import SafetyGuidePage from './pages/SafetyGuidePage'
import SocialLoginException from './pages/SocialLoginException'
import LostItemListPage from './pages/LostItemListPage'
import LostItemPostPage from './pages/LostItemPostPage'
import LostItemWritePage from './pages/LostItemWritePage'
import LostItemUpdatePage from './pages/LostItemUpdatePage'
import Alarm from './component/common/Alarm'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import AlarmList from './component/common/AlarmList'
import { setNotificationView } from './store/notification/notificationViewSlice'
import Chat from './component/header/Chat'
import Home from '@pages/Home'
import Layout from 'layout/Layout'
import ValleyListPage from '@pages/ValleyListPage'

function App() {
  const notification = useSelector(
    (state: RootState) => state.notification.value
  )
  const chatView = useSelector((state: RootState) => state.view.value)
  const dispatch = useDispatch()

  useEffect(() => {
    if (chatView) dispatch(setNotificationView(false))
  }, [chatView])

  return (
    <div>
      {notification && notification.notificationType === 'CHAT' && <Alarm />}
      <AlarmList />
      <Chat />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/valleylist" element={<ValleyListPage />} />
          <Route path="/valley/:id" element={<ValleyPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/safety-guide" element={<SafetyGuidePage />} />
          <Route path="/lost-item" element={<LostItemListPage />} />
          <Route
            path="/lost-item/:category/:id"
            element={<LostItemPostPage />}
          />
          <Route
            path="/lost-item/:category/:id/update"
            element={<LostItemUpdatePage />}
          />
          <Route path="/lost-item/write" element={<LostItemWritePage />} />
          <Route
            path="/social-login-exception"
            element={<SocialLoginException />}
          />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
