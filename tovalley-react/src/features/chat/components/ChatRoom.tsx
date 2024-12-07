import { useCallback, useEffect, useRef, useState } from 'react'
import styles from '@styles/chat/ChatRoom.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { MdImage } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'
import { useSaveImg } from '@hooks/useSaveImg'
import { MessageListType, MessageType } from 'types/chat'
import { RootState } from '@store/store'
import axiosInstance from '@utils/axios_interceptor'
import { setSubscription } from '@store/chat/subscriptionSlice'
import useObserver from '@hooks/useObserver'
import SpeechBubble from './SpeechBubble'

const ChatRoom = () => {
  const [prevMessage, setPrevMessage] = useState<MessageListType>()
  const [newMessage, setNewMessage] = useState<MessageType>()
  const [newMessageList, setNewMessageList] = useState<MessageType[]>([])
  const [content, setContent] = useState('') // 보낼 메시지
  const [newMessageView, setNewMessageView] = useState(false)
  const [isPageEnd, setIsPageEnd] = useState<boolean>(false)
  const [reqMsg, setReqMsg] = useState(false)

  const client = useSelector((state: RootState) => state.client.value)
  const chatRoomId = useSelector((state: RootState) => state.chatRoomId.value)

  const dispatch = useDispatch()
  const { uploadImg, imgFiles, saveImgFile, handleDeleteImage } = useSaveImg()
  const endRef = useRef<HTMLDivElement>(null)
  const { target: messageEndRef } = useObserver({
    setReqMsg,
    setNewMessageView,
  })

  useEffect(() => {
    const requestMessageList = async () => {
      const response = await axiosInstance.get(
        `/api/auth/chat/messages/${chatRoomId}` // 채팅 메시지 목록 조회
      )
      setPrevMessage(response.data.data)

      if (client?.connected) {
        // console.log('채팅방 구독 시작!!')
        const subscribe = client.subscribe(
          `/sub/chat/room/${chatRoomId}`,
          (msg) => {
            // 특정 채팅방 구독
            // console.log(JSON.parse(msg.body))
            setNewMessage(JSON.parse(msg.body))
            setNewMessageList((prev) => {
              return [...prev, JSON.parse(msg.body)]
            })
          }
        )
        dispatch(setSubscription(subscribe))
      }
    }

    if (client) requestMessageList()
  }, [client, chatRoomId, dispatch])

  useEffect(() => {
    endRef.current?.scrollIntoView()
  }, [prevMessage])

  useEffect(() => {
    if (newMessage && newMessage.senderId === prevMessage?.memberId) {
      messageEndRef.current?.scrollIntoView()
      setNewMessageView(false)
    }

    if (reqMsg && newMessage && newMessage.senderId !== prevMessage?.memberId) {
      setNewMessageView(true)
    }
  }, [newMessage, messageEndRef, prevMessage?.memberId, reqMsg])

  const getMessageList = useCallback(
    async (id?: string) => {
      setReqMsg(true)
      let config

      if (id) {
        config = {
          params: {
            cursor: id,
          },
        }
      } else {
        config = undefined
      }

      const res = await axiosInstance.get(
        `/api/auth/chat/messages/${chatRoomId}`,
        config // 채팅 메시지 목록 조회
      )

      setPrevMessage((prev) => {
        return {
          ...prev!,
          chatMessages: {
            ...res.data.data.chatMessages,
            content: [
              ...res.data.data.chatMessages.content,
              ...prev!.chatMessages.content,
            ],
          },
        }
      })

      if (res.data.data.chatMessages.last) {
        setIsPageEnd(true)
      }
    },
    [chatRoomId]
  )

  const { target } = useObserver({
    getData: getMessageList,
    isPageEnd,
    value: prevMessage?.chatMessages.content[0].chatMessageId,
  })

  const sendMessage = () => {
    if (client?.connected && content !== '') {
      const chatMessage = {
        chatRoomId: chatRoomId,
        content,
      }
      client.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify(chatMessage),
      }) // 메시지 전송
      setContent('')
    } else if (!client?.connected) {
      console.error('웹소켓 연결이 활성화되지 않았습니다.')
      alert('잠시 후 다시 시도해주세요.')
    }
  }

  const sendImageMessage = () => {
    if (client?.connected) {
      const formData = new FormData()
      formData.append('image', imgFiles[0])

      axiosInstance
        .post('/api/auth/chat/images/upload', formData)
        .then((res) => {
          const chatMessage = {
            chatRoomId: chatRoomId,
            content: '',
            chatType: 'IMAGE',
            imageName: res.data.data.storeFileName,
            imageUrl: res.data.data.storeFileUrl,
          }
          client.publish({
            destination: '/pub/chat/message',
            body: JSON.stringify(chatMessage),
          }) // 메시지 전송
          setContent('')
          handleDeleteImage(0)
        })
    } else {
      console.error('웹소켓 연결이 활성화되지 않았습니다.')
    }
  }

  const confirmNewMessage = () => {
    setNewMessageView(false)
    messageEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    setNewMessageView(false)
  }, [uploadImg])

  const handleSendMessage = () => {
    if (imgFiles.length !== 0) {
      sendImageMessage()
    } else sendMessage()
  }

  return (
    <div className={styles.chatComponent}>
      <div className={styles.messageList}>
        <div>
          {prevMessage?.chatMessages.content.map((message, index) => {
            return (
              <SpeechBubble
                message={message}
                isMyMsg={message.myMsg}
                isPrev={true}
                isPageEnd={isPageEnd}
                index={index}
                target={target}
                endRef={endRef}
              />
            )
          })}
        </div>
        {newMessageList.map((el) => {
          return (
            <SpeechBubble
              key={el.createdAt}
              message={el}
              isMyMsg={el?.senderId === prevMessage?.memberId}
            />
          )
        })}
        <div ref={messageEndRef} className={styles.ref} />
      </div>
      {newMessageView && (
        <div className={styles.newMessageContainer}>
          <div className={styles.newMessage} onClick={confirmNewMessage}>
            <p>{newMessage?.content ?? '사진을 보냈습니다.'}</p>
            <span>
              <IoIosArrowDown />
            </span>
          </div>
        </div>
      )}
      <div className={styles.sendMessage}>
        <div>
          {uploadImg.length !== 0 && (
            <div className={styles.previewImg}>
              {uploadImg.map((image, id) => (
                <div key={id} className={styles.imageContainer}>
                  <div>
                    <img src={`${image}`} alt={`${image}-${id}`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ backgroundColor: 'white' }}>
          <input
            type="text"
            placeholder="메시지 보내기"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            readOnly={imgFiles.length !== 0}
            maxLength={200}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage()
              }
            }}
          />
          <span className={styles.imageIcon}>
            <label htmlFor="input-file">
              <input
                className={styles.imgInput}
                type="file"
                accept="image/*"
                id="input-file"
                multiple
                onChange={saveImgFile}
              />
              <MdImage />
            </label>
          </span>
          <button onClick={handleSendMessage}>전송</button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom
