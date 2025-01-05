import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from '@pages/Home'
import Layout from 'layout/Layout'
import Login from '@pages/Login'
import Signup from '@pages/Signup'
import ValleyListPage from '@pages/ValleyList'
import Valley from '@pages/Valley'
import MyPage from '@pages/MyPage'
import SafetyGuide from '@pages/SafetyGuide'
import LostItemList from '@pages/LostItemList'
import LostItemPost from '@pages/LostItemPost'
import LostItemUpdate from '@pages/LostItemUpdate'
import LostItemWrite from '@pages/LostItemWrite'
import SocialLoginException from '@pages/SocialLoginException'
import Chat from '@features/chat/components/Chat'
import Alarm from '@features/chat/components/Alarm'
import AlarmList from '@features/chat/components/AlarmList'
import { useAtomValue } from 'jotai'
import { notificationAtom } from 'jotai/atom'

function App() {
  const notification = useAtomValue(notificationAtom)

  return (
    <div>
      {notification?.notificationType === 'CHAT' && <Alarm />}
      <AlarmList />
      <Chat />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/valleylist" element={<ValleyListPage />} />
          <Route path="/valley/:id" element={<Valley />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/safety-guide" element={<SafetyGuide />} />
          <Route path="/lost-item" element={<LostItemList />} />
          <Route path="/lost-item/:category/:id" element={<LostItemPost />} />
          <Route
            path="/lost-item/:category/:id/update"
            element={<LostItemUpdate />}
          />
          <Route path="/lost-item/write" element={<LostItemWrite />} />
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
