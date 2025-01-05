import { Client, StompSubscription } from '@stomp/stompjs'
import { atom } from 'jotai'
import { NotificationType } from 'types/chat'

export const clientAtom = atom<Client | null>(null)
export const chatViewAtom = atom<boolean>(false)
export const chatRoomIdAtom = atom<number | null>(null)
export const notificationAtom = atom<NotificationType | null>(null)
export const notificationViewAtom = atom<boolean>(false)
export const subscriptionAtom = atom<StompSubscription | null>(null)
export const chatRoomNameAtom = atom<string>('')
