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
  const [prevMessages, setPrevMessages] = useState<MessageListType>()
  const [newMessages, setNewMessages] = useState<MessageType[]>([])
  const [content, setContent] = useState('') // 보낼 메시지
  const [showNewMessageAlert, setShowNewMessageAlert] = useState(false)
  const [isPageEnd, setIsPageEnd] = useState<boolean>(false)
  const [reqMsg, setReqMsg] = useState(false)

  const client = useSelector((state: RootState) => state.client.value)
  const chatRoomId = useSelector((state: RootState) => state.chatRoomId.value)

  const dispatch = useDispatch()
  const { uploadImg, imgFiles, saveImgFile, handleDeleteImage } = useSaveImg()

  const observeFunc = () => {
    setReqMsg(false)
    setShowNewMessageAlert(false)
  }
  const endRef = useRef<HTMLDivElement>(null)
  const { target: messageEndRef } = useObserver({ observeFunc })

  const getMessageList = useCallback(
    async (cursorId?: string | number) => {
      try {
        setReqMsg(true)

        const params = cursorId ? { params: { cursor: cursorId } } : undefined
        const { data } = await axiosInstance.get(
          `/api/auth/chat/messages/${chatRoomId}`,
          params
        )

        setPrevMessages((prev) => ({
          ...prev!,
          chatMessages: {
            ...data.data.chatMessages,
            content: [
              ...data.data.chatMessages.content,
              ...(prev?.chatMessages.content || []),
            ],
          },
        }))

        if (data.data.chatMessages.last) setIsPageEnd(true)
      } catch (error) {
        console.error('메시지 불러오기 실패:', error)
      }
    },
    [chatRoomId]
  )

  const { target } = useObserver({
    getData: getMessageList,
    isPageEnd,
    value: prevMessages?.chatMessages.content[0].chatMessageId,
  })

  const sendMessage = async () => {
    if (!client?.connected) return alert('웹소켓 연결이 활성화되지 않았습니다.')

    if (imgFiles.length > 0) {
      try {
        const formData = new FormData()
        formData.append('image', imgFiles[0])
        const { data } = await axiosInstance.post(
          '/api/auth/chat/images/upload',
          formData
        )

        client.publish({
          destination: '/pub/chat/message',
          body: JSON.stringify({
            chatRoomId,
            content: '',
            chatType: 'IMAGE',
            imageName: data.data.storeFileName,
            imageUrl: data.data.storeFileUrl,
          }),
        })

        handleDeleteImage(0)
      } catch (error) {
        console.error('이미지 전송 실패:', error)
      }
    } else if (content.trim()) {
      client.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({ chatRoomId, content }),
      }) // 메시지 전송
      setContent('')
    }
  }

  useEffect(() => {
    setShowNewMessageAlert(false)
  }, [uploadImg])

  const handleNewMessage = useCallback(
    (msg: MessageType) => {
      setNewMessages((prev) => [...prev, msg])
      if (reqMsg && msg.senderId !== prevMessages?.memberId)
        setShowNewMessageAlert(true)
      else {
        setShowNewMessageAlert(false)
        messageEndRef.current?.scrollIntoView()
      }
    },
    [reqMsg, messageEndRef, prevMessages]
  )

  useEffect(() => {
    if (client?.connected) {
      // console.log('채팅방 구독 시작!!')
      const subscribe = client.subscribe(
        `/sub/chat/room/${chatRoomId}`,
        (msg) => {
          // 특정 채팅방 구독
          // console.log(JSON.parse(msg.body))
          handleNewMessage(JSON.parse(msg.body))
        }
      )
      dispatch(setSubscription(subscribe))
    }
  }, [client, chatRoomId, dispatch, handleNewMessage])

  useEffect(() => {
    getMessageList()
  }, [getMessageList])

  useEffect(() => {
    endRef.current?.scrollIntoView()
  }, [prevMessages])

  return (
    <div className={styles.chatComponent}>
      <div className={styles.messageList}>
        <div>
          {prevMessages?.chatMessages.content.map((message, index) => {
            return (
              <SpeechBubble
                key={`${index}-${message.createdAt}`}
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
        {newMessages.map((el) => {
          return (
            <SpeechBubble
              key={el.createdAt}
              message={el}
              isMyMsg={el?.senderId === prevMessages?.memberId}
            />
          )
        })}
        <div ref={messageEndRef} className={styles.ref} />
      </div>
      {showNewMessageAlert && (
        <div className={styles.newMessageContainer}>
          <div
            className={styles.newMessage}
            onClick={() => {
              setShowNewMessageAlert(false)
              messageEndRef.current?.scrollIntoView()
            }}
          >
            <p>
              {newMessages[newMessages.length - 1]?.content ||
                '사진을 보냈습니다.'}
            </p>
            <span>
              <IoIosArrowDown />
            </span>
          </div>
        </div>
      )}
      <div className={styles.sendMessage}>
        <div>
          {uploadImg.length > 0 && (
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
            readOnly={imgFiles.length > 0}
            maxLength={200}
            onKeyDown={(e) => {
              e.key === 'Enter' && sendMessage()
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
          <button onClick={sendMessage}>전송</button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom
