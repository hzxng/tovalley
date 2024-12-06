import { ChatMessage, MessageType } from 'types/chat'
import styles from '@styles/chat/SpeechBubble.module.scss'
import cn from 'classnames'
import dateFormat from '../utils/dateFormat'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

const SpeechBubble = ({
  message,
  isMyMsg,
  isPrev = false,
  isPageEnd,
  index,
  target,
  endRef,
}: {
  message: ChatMessage | MessageType
  isMyMsg: boolean
  isPageEnd?: boolean
  isPrev?: boolean
  index?: number
  target?: React.RefObject<HTMLDivElement>
  endRef?: React.RefObject<HTMLDivElement>
}) => {
  const date = isPrev
    ? new Date(message.createdAt)
    : dateFormat(message.createdAt)

  const notification = useSelector(
    (state: RootState) => state.notification.value
  )
  const chatRoomId = useSelector((state: RootState) => state.chatRoomId.value)

  return (
    <div key={message.createdAt} className={styles.bubbleContainer}>
      <div
        className={cn(styles.speechBubble, {
          [styles.reply]: !isMyMsg,
        })}
      >
        {isMyMsg && (
          <div className={styles.alignRight}>
            {notification?.notificationType === 'READ_COUNT_UPDATE' &&
            dateFormat(notification.createdDate) > date
              ? ''
              : message.readCount !== 0 && (
                  <span className={styles.readCount}>{message.readCount}</span>
                )}
            <span className={styles.sendTime}>
              {`${date.getHours()}`.padStart(2, '0')}:
              {`${date.getMinutes()}`.padStart(2, '0')}
            </span>
          </div>
        )}
        <div
          className={cn(
            styles.bubbleContent,
            { [styles.mine]: isMyMsg },
            { [styles.reply]: !isMyMsg }
          )}
        >
          {message.chatType === 'IMAGE' ? (
            <img
              className={styles.chatImage}
              src={message.imageUrl ?? ''}
              alt="chatImage"
            />
          ) : (
            message.content
          )}
        </div>
        {!isMyMsg && (
          <div>
            {isPrev && message.readCount !== 0 && !chatRoomId && (
              <span className={styles.readCount}>{message.readCount}</span>
            )}
            {!isPrev && message.readCount !== 0 && (
              <span className={styles.readCount}>{message.readCount}</span>
            )}
            <span className={styles.sendTime}>
              {`${date.getHours()}`.padStart(2, '0')}:
              {`${date.getMinutes()}`.padStart(2, '0')}
            </span>
          </div>
        )}
      </div>
      {isPrev && !isPageEnd && index === 0 && (
        <div ref={target} className={styles.ref} />
      )}
      {isPrev && index === 19 && <div ref={endRef} className={styles.ref} />}
    </div>
  )
}

export default SpeechBubble
