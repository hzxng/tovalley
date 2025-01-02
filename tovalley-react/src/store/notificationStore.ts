import { NotificationType } from 'types/chat'
import { create } from 'zustand'

interface NotificationStore {
  notification: NotificationType | null
  notificationView: boolean
  setNotification: (notification: NotificationType | null) => void
  setNotificationView: (view: boolean) => void
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notification: null,
  notificationView: false,
  setNotification: (notification) => set({ notification }),
  setNotificationView: (view) => set({ notificationView: view }),
}))

export default useNotificationStore
