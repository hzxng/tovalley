import { useCallback, useEffect, useState } from 'react'
import styles from '@styles/chat/Chat.module.scss'
import { MdLogout } from 'react-icons/md'
import { MdArrowBackIos } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { elapsedTime } from '@utils/elapsedTime'
import { RootState } from '@store/store'
import { ChatRoomItem, NotificationType } from 'types/chat'
import axiosInstance from '@utils/axios_interceptor'
import { enterChatRoom } from '@store/chat/chatRoomIdSlice'
import { setChatRoomName } from '@store/chat/chatRoomNameSlice'
import { setSubscription } from '@store/chat/subscriptionSlice'
import ChatRoom from './ChatRoom'
import Drawer from './Drawer'

const Chat = () => {
  const chatView = useSelector((state: RootState) => state.view.value)

  const [chatRoomList, setChatRoomList] = useState<{
    memberName: String
    chatRooms: ChatRoomItem[]
  }>({
    memberName: '',
    chatRooms: [],
  })
  const dispatch = useDispatch()
  const client = useSelector((state: RootState) => state.client.value)
  const chatRoomId = useSelector((state: RootState) => state.chatRoomId.value)
  const notification = useSelector(
    (state: RootState) => state.notification.value
  )
  const subscription = useSelector(
    (state: RootState) => state.subscription.value
  )
  const chatRoomName = useSelector(
    (state: RootState) => state.chatRoomName.value
  )

  useEffect(() => {
    if (client && chatView && !chatRoomId) {
      axiosInstance
        .get('/api/auth/chatroom') // 채팅방 목록
        .then((res) => {
          res.data !== '' && setChatRoomList(res.data.data)
        })
        .catch((err) => console.log(err))
    }
  }, [client, chatView, chatRoomId])

  const arrangeChat = useCallback((notification: NotificationType) => {
    setChatRoomList((prevChatRoomList) => {
      const index = prevChatRoomList.chatRooms.findIndex(
        (el) => el.chatRoomId === notification.chatRoomId
      )

      if (index >= 0) {
        let newList = prevChatRoomList.chatRooms
        const originChat = newList[index]
        const newChat = {
          ...originChat,
          lastMessageContent: notification.content,
          unReadMessageCount: originChat.unReadMessageCount + 1,
          lastMessageTime: notification.createdDate,
        }

        newList.splice(index, 1)

        return {
          ...prevChatRoomList,
          chatRooms: [newChat, ...newList],
        }
      } else
        return {
          ...prevChatRoomList,
          chatRooms: [
            {
              chatRoomId: notification.chatRoomId,
              chatRoomTitle: '',
              otherUserProfileImage: null,
              otherUserNick: notification.senderNick,
              createdChatRoomDate: notification.createdDate,
              lastMessageContent: notification.content,
              unReadMessageCount: 1,
              lastMessageTime: notification.createdDate,
            },
            ...prevChatRoomList.chatRooms,
          ],
        }
    })
  }, [])

  useEffect(() => {
    if (chatView && notification?.notificationType === 'CHAT') {
      console.log(notification.notificationType)
      arrangeChat(notification)
    }
  }, [notification, chatView, arrangeChat])

  const outChatting = () => {
    if (client?.connected && subscription) {
      console.log('구독해제!!')
      client.unsubscribe(subscription.id)
      dispatch(setSubscription(null))
    }
  }

  const handleClickBack = () => {
    dispatch(enterChatRoom(null))
    outChatting()
  }

  const clickChatRoom = (chatRoom: ChatRoomItem) => {
    dispatch(enterChatRoom(chatRoom.chatRoomId))
    dispatch(setChatRoomName(chatRoom.otherUserNick))
  }

  return (
    <Drawer
      classNames={{
        container: styles.chatContainer,
        wrapper: styles.chatWrap,
      }}
      size={420}
      isView={chatView}
    >
      <div className={styles.header}>
        {chatRoomId && (
          <span onClick={handleClickBack}>
            <MdArrowBackIos />
          </span>
        )}
        <h1>{!chatRoomId ? chatRoomList?.memberName : chatRoomName}</h1>
        <span>
          <MdLogout />
        </span>
      </div>
      {!chatRoomId ? (
        <>
          <h4>채팅목록 {chatRoomList?.chatRooms.length}</h4>
          <div className={styles.chatList}>
            {chatRoomList?.chatRooms.map((chatRoom) => (
              <div
                key={chatRoom.chatRoomId}
                className={styles.chatItem}
                onClick={() => clickChatRoom(chatRoom)}
              >
                <div className={styles.chatTitle}>
                  <div className={styles.userInfo}>
                    <div className={styles.profileImg}>
                      <img
                        src={
                          chatRoom.otherUserProfileImage ??
                          process.env.PUBLIC_URL + '/img/user-profile.png'
                        }
                        alt="profile-img"
                      />
                    </div>
                    <span className={styles.nickName}>
                      {chatRoom.otherUserNick}
                    </span>
                  </div>
                  {chatRoom.lastMessageTime && (
                    <span>{elapsedTime(chatRoom.lastMessageTime)}</span>
                  )}
                </div>
                <div className={styles.chatContent}>
                  <span className={styles.content}>
                    {chatRoom.lastMessageContent ?? '사진을 보냈습니다.'}
                  </span>
                  {chatRoom.unReadMessageCount !== 0 && (
                    <div className={styles.count}>
                      {chatRoom.unReadMessageCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <ChatRoom />
      )}
    </Drawer>
  )
}

export default Chat
