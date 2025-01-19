import { useCallback, useEffect, useState } from 'react'
import styles from '@styles/chat/Chat.module.scss'
import { MdLogout } from 'react-icons/md'
import { MdArrowBackIos } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { elapsedTime } from '@utils/elapsedTime'
import { RootState } from '@store/store'
import { ChatRoomItem, NotificationType } from 'types/chat'
import { enterChatRoom } from '@store/chat/chatRoomIdSlice'
import { setChatRoomName } from '@store/chat/chatRoomNameSlice'
import ChatRoom from './ChatRoom'
import Drawer from './Drawer'
import { chatList } from 'dummy/chat-data'

const Chat = () => {
  const dispatch = useDispatch()

  const chatView = useSelector((state: RootState) => state.view.value)
  const chatRoomId = useSelector((state: RootState) => state.chatRoomId.value)
  const notification = useSelector(
    (state: RootState) => state.notification.value
  )
  const chatRoomName = useSelector(
    (state: RootState) => state.chatRoomName.value
  )

  const [chatRoomList, setChatRoomList] = useState<{
    memberName: String
    chatRooms: ChatRoomItem[]
  }>({
    memberName: '',
    chatRooms: [],
  })

  useEffect(() => {
    if (chatView) {
      setChatRoomList(chatList)
    }
  }, [chatView])

  const arrangeChat = useCallback((notification: NotificationType) => {
    setChatRoomList((prev) => {
      const index = prev.chatRooms.findIndex(
        (room) => room.chatRoomId === notification.chatRoomId
      )

      const updatedChatRooms = prev.chatRooms
      const newChatRoom = {
        chatRoomId: notification.chatRoomId,
        chatRoomTitle: '',
        otherUserProfileImage: null,
        otherUserNick: notification.senderNick,
        createdChatRoomDate: notification.createdDate,
        lastMessageContent: notification.content,
        unReadMessageCount: 1,
        lastMessageTime: notification.createdDate,
      }

      if (index >= 0) {
        const existingRoom = updatedChatRooms[index]
        updatedChatRooms.splice(index, 1)

        return {
          ...prev,
          chatRooms: [
            {
              ...existingRoom,
              lastMessageContent: notification.content,
              unReadMessageCount: existingRoom.unReadMessageCount + 1,
              lastMessageTime: notification.createdDate,
            },
            ...updatedChatRooms,
          ],
        }
      }

      return {
        ...prev,
        chatRooms: [newChatRoom, ...updatedChatRooms],
      }
    })
  }, [])

  useEffect(() => {
    if (chatView && notification?.notificationType === 'CHAT') {
      arrangeChat(notification)
    }
  }, [notification, chatView, arrangeChat])

  const handleClickBack = () => {
    dispatch(enterChatRoom(null))
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
                  {chatRoom.unReadMessageCount > 0 && (
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
