import { StompSubscription } from '@stomp/stompjs'
import { create } from 'zustand'

interface ChatStore {
  chatRoomId: number | null
  chatRoomName: string | null
  chatView: boolean
  subscribe: StompSubscription | null
  setChatRoomId: (id: number | null) => void
  setChatRoomName: (name: string | null) => void
  setChatView: (view: boolean) => void
  setSubscribe: (sub: StompSubscription | null) => void
}

const useChatStore = create<ChatStore>((set) => ({
  chatRoomId: null,
  chatRoomName: null,
  chatView: false,
  subscribe: null,
  setChatRoomId: (id) => set({ chatRoomId: id }),
  setChatRoomName: (name) => set({ chatRoomName: name }),
  setChatView: (view) => set({ chatView: view }),
  setSubscribe: (sub) => set({ subscribe: sub }),
}))

export default useChatStore
