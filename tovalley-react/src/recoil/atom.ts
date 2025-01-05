import { Client, StompSubscription } from '@stomp/stompjs'
import { atom } from 'recoil'
import { NotificationType } from 'types/chat'

export const clientState = atom<Client | null>({
  key: 'client',
  default: null,
})

export const chatViewState = atom<boolean>({
  key: 'chatViewState',
  default: false,
})

export const chatRoomIdState = atom<number | null>({
  key: 'chatRoomIdState',
  default: null,
})

export const chatRoomNameState = atom<string>({
  key: 'chatRoomNameState',
  default: '',
})

export const subscriptionState = atom<StompSubscription | null>({
  key: 'subscriptionState',
  default: null,
})

export const notificationState = atom<NotificationType | null>({
  key: 'notificationState',
  default: null,
})

export const notificationViewState = atom<boolean>({
  key: 'notificationViewState',
  default: false,
})
