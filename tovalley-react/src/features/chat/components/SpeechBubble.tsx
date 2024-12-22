import { ChatMessage, MessageType } from 'types/chat'
import styles from '@styles/chat/SpeechBubble.module.scss'
import cn from 'classnames'
import dateFormat from '../utils/dateFormat'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

interface SpeechBubbleProps {
  message: ChatMessage | MessageType
  isMyMsg: boolean
  isPageEnd?: boolean
  isPrev?: boolean
  index?: number
  target?: React.RefObject<HTMLDivElement>
  endRef?: React.RefObject<HTMLDivElement>
}

const SpeechBubble = ({
  message,
  isMyMsg,
  isPrev = false,
  isPageEnd,
  index,
  target,
  endRef,
}: SpeechBubbleProps) => {
  const notification = useSelector(
    (state: RootState) => state.notification.value
  )
  const chatRoomId = useSelector((state: RootState) => state.chatRoomId.value)

  const formattedDate = isPrev
    ? new Date(message.createdAt)
    : dateFormat(message.createdAt)

  const shouldShowReadCount = (): boolean => {
    if (
      notification?.notificationType === 'READ_COUNT_UPDATE' &&
      dateFormat(notification.createdDate) > formattedDate
    ) {
      return false
    }
    return message.readCount !== 0
  }

  const formatTime = (date: Date): string =>
    `${date.getHours()}`.padStart(2, '0') +
    ':' +
    `${date.getMinutes()}`.padStart(2, '0')

  return (
    <div key={message.createdAt} className={styles.bubbleContainer}>
      <div
        className={cn(styles.speechBubble, {
          [styles.reply]: !isMyMsg,
        })}
      >
        {isMyMsg && (
          <div className={styles.alignRight}>
            {shouldShowReadCount() && (
              <span className={styles.readCount}>{message.readCount}</span>
            )}
            <span className={styles.sendTime}>{formatTime(formattedDate)}</span>
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
            <span className={styles.sendTime}>{formatTime(formattedDate)}</span>
          </div>
        )}
      </div>
      {isPrev && (
        <>
          {index === 0 && !isPageEnd && (
            <div ref={target} className={styles.ref} />
          )}
          {index === 19 && <div ref={endRef} className={styles.ref} />}
        </>
      )}
    </div>
  )
}

export default SpeechBubble
