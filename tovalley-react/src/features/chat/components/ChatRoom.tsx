import { useEffect, useRef, useState } from 'react'
import styles from '@styles/chat/ChatRoom.module.scss'
import { useSelector } from 'react-redux'
import { MdImage } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'
import { useSaveImg } from '@hooks/useSaveImg'
import { MessageListType, MessageType } from 'types/chat'
import { RootState } from '@store/store'
import useObserver from '@hooks/useObserver'
import SpeechBubble from './SpeechBubble'
import { chat1, chat2, chat3 } from 'dummy/chat-data'

const ChatRoom = () => {
  const [prevMessages, setPrevMessages] = useState<MessageListType>()
  const [newMessages, setNewMessages] = useState<MessageType[]>([])
  const [content, setContent] = useState('') // 보낼 메시지
  const [showNewMessageAlert, setShowNewMessageAlert] = useState(false)
  const [isPageEnd] = useState<boolean>(false)
  const chatRoomId = useSelector((state: RootState) => state.chatRoomId.value)

  const { uploadImg, imgFiles, saveImgFile } = useSaveImg()

  const endRef = useRef<HTMLDivElement>(null)
  const messageListRef = useRef<HTMLDivElement>(null)

  const observeFunc = () => {
    setShowNewMessageAlert(false)
  }
  const { target: messageEndRef } = useObserver({ observeFunc })

  useEffect(() => {
    if (chatRoomId === 8) setPrevMessages(chat1)
    else if (chatRoomId === 1) setPrevMessages(chat2)
    else if (chatRoomId === 7) setPrevMessages(chat3)
  }, [chatRoomId])

  const sendMessage = async () => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    content &&
      setNewMessages((prev) => [
        ...prev,
        {
          chatRoomId: 1,
          chatType: '',
          imageName: '',
          imageUrl: '',
          senderId: 6,
          content: content,
          createdAt: `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}`,
          readCount: 1,
        },
      ])

    setContent('')
  }

  useEffect(() => {
    endRef.current?.scrollIntoView()
  }, [prevMessages])

  return (
    <div className={styles.chatComponent}>
      <div className={styles.messageList} ref={messageListRef}>
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
                endRef={endRef}
              />
            )
          })}
        </div>
        {newMessages.map((el, index) => {
          return (
            <SpeechBubble
              key={`${index}-${el.createdAt}`}
              message={el}
              isMyMsg={el.senderId === prevMessages?.memberId}
            />
          )
        })}
        <div ref={messageEndRef} className={styles.ref} />
      </div>
      <div className={styles.bottom}>
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
    </div>
  )
}

export default ChatRoom
