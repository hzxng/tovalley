import CustomModal from '@component/CustomModal'
import styles from '@styles/lostItem/CommentItem.module.scss'
import { elapsedTime } from '@utils/elapsedTime'
import { useState } from 'react'
import { LostPostComment } from 'types/lost-found'
import { AiOutlineComment } from 'react-icons/ai'

const CommentItem = ({
  item,
  newChatRoom,
  deleteComment,
}: {
  item: LostPostComment
  newChatRoom: (nickname: string) => void
  deleteComment: (item: LostPostComment) => void
}) => {
  const [commentDeleteModal, setCommentDeleteModal] = useState(false)
  const closeDeleteModal = () => {
    setCommentDeleteModal(false)
  }

  return (
    <div key={item.commentId} className={styles.commentItem}>
      <div className={styles.commentTop}>
        <div className={styles.commentInfo}>
          <div className={styles.commentProfileImage}>
            <img
              src={
                item.commentAuthorProfile ??
                process.env.PUBLIC_URL + '/img/user-profile.png'
              }
              alt="author-profile"
            />
          </div>
          <span className={styles.commentWriterName}>{item.commentAuthor}</span>
          <span>{elapsedTime(item.commentCreateAt)}</span>
        </div>
        {item.commentByUser ? (
          <div
            className={styles.deleteComment}
            onClick={() => {
              setCommentDeleteModal(true)
            }}
          >
            삭제
          </div>
        ) : (
          <div
            className={styles.commentChatBtn}
            onClick={() => newChatRoom(item.commentAuthor)}
          >
            <AiOutlineComment size="25px" />
            <span>채팅</span>
          </div>
        )}
        {commentDeleteModal && (
          <CustomModal
            content="댓글을 삭제하시겠습니까?"
            customFunc={() => deleteComment(item)}
            handleModal={closeDeleteModal}
          />
        )}
      </div>
      <p>{item.commentContent}</p>
    </div>
  )
}

export default CommentItem
