import { useEffect, useState } from 'react'
import styles from '@styles/lostItem/LostItemPost.module.scss'
import { AiOutlineComment } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { MdLocationPin } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa6'
import { LostPost, LostPostComment } from 'types/lost-found'
import { elapsedTime } from '@utils/elapsedTime'
import cn from 'classnames'
import CommentItem from '@features/lostItem/components/CommentItem'
import CustomModal from '@component/CustomModal'
import {
  data1,
  data2,
  data3,
  data4,
  data5,
  data6,
} from 'dummy/lostItemPost-data'

const LostItemPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [lostPost, setLostPost] = useState<LostPost | null>(null)
  const [commentList, setCommentList] = useState<LostPostComment[]>([])
  const [resolveCheck, setResolveCheck] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)

  useEffect(() => {
    if (id === '18') {
      setLostPost(data1)
      setCommentList(data1.comments)
      setResolveCheck(data1.isResolved)
    } else if (id === '17') {
      setLostPost(data2)
      setCommentList(data2.comments)
      setResolveCheck(data2.isResolved)
    } else if (id === '16') {
      setLostPost(data3)
      setCommentList(data3.comments)
      setResolveCheck(data3.isResolved)
    } else if (id === '15') {
      setLostPost(data4)
      setCommentList(data4.comments)
      setResolveCheck(data4.isResolved)
    } else if (id === '14') {
      setLostPost(data5)
      setCommentList(data5.comments)
      setResolveCheck(data5.isResolved)
    } else if (id === '11') {
      setLostPost(data6)
      setCommentList(data6.comments)
      setResolveCheck(data6.isResolved)
    }
  }, [id])

  const toggleResolveStatus = async () => {
    setResolveCheck((prev) => !prev)
  }

  const deletePost = async () => {
    navigate('/lost-item')
  }

  const closeDeleteModal = () => {
    setDeleteModal(false)
  }

  const addComment = async () => {
    if (!commentText.trim()) return
    const user = JSON.parse(localStorage.getItem('user') ?? '')
    const date = new Date()
    const month = date.getMonth() + 1
    const newComment = {
      commentId: 1,
      commentAuthor: user.id,
      commentContent: commentText,
      commentCreateAt: `${date.getFullYear()}-${month
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`,
      commentByUser: true,
      commentAuthorProfile: '/img/dummy/profile-img2.jpg',
    }
    setCommentList((prev) => [...prev, newComment])
    setCommentText('')
  }

  const deleteComment = async (item: LostPostComment) => {
    setCommentList((prev) =>
      prev.filter((comment) => comment.commentId !== item.commentId)
    )
  }

  const moveToUpdatePage = () => {
    // navigate(`/lost-item/${category}/${id}/update`)
  }

  const newChatRoom = async (nickname: string) => {}

  if (!lostPost || !lostPost) return <div>loading</div>

  return (
    <div className={styles.body}>
      <div className={styles.lostItemPost}>
        <div className={styles.locationInfo}>
          <MdLocationPin color="#66A5FC" size="28px" />
          <h4>{lostPost.waterPlaceName}</h4>
          <span>{lostPost.waterPlaceAddress}</span>
        </div>
        <div className={styles.postTop}>
          <div className={styles.authorInfo}>
            <div className={styles.profileImage}>
              <img
                src={
                  lostPost.boardAuthorProfile ??
                  process.env.PUBLIC_URL + '/img/user-profile.png'
                }
                alt="author-profile"
              />
            </div>
            <div className={styles.authorName}>
              <h4>{lostPost.author}</h4>
              <span>{elapsedTime(lostPost.postCreateAt)}</span>
            </div>
          </div>
          {!lostPost.isMyBoard && (
            <div
              className={styles.chatBtn}
              onClick={() => newChatRoom(lostPost.author)}
            >
              <AiOutlineComment size="22px" />
              <span>채팅하기</span>
            </div>
          )}
        </div>
        <h1>{lostPost.title}</h1>
        <p>{lostPost.content}</p>
        <div className={styles.imageList}>
          {lostPost.postImages.map((img) => {
            return (
              <div key={img} className={styles.imageContainer}>
                <img src={img} alt="post-img" />
              </div>
            )
          })}
        </div>
        <div className={styles.postBottom}>
          <div className={styles.comment}>
            <FaRegComment />
            {/* <span>{lostPost.commentCnt}</span> */}
            <span>{commentList.length}</span>
          </div>
          {lostPost.isMyBoard && (
            <div className={styles.modifyBtn}>
              <div className={styles.solvedStatus}>
                <div
                  className={cn(styles.checkBox, {
                    [styles.checked]: resolveCheck,
                  })}
                  onClick={toggleResolveStatus}
                >
                  <FaCheck />
                </div>
                <span>해결 완료</span>
              </div>
              <div className={styles.deleteBtn}>
                <div>
                  <span onClick={() => setDeleteModal(true)}>삭제</span>
                </div>
                <div>
                  <span onClick={moveToUpdatePage}>수정</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {localStorage.getItem('user') && (
        <div className={styles.postComment}>
          <div className={styles.commentInput}>
            <input
              placeholder="댓글을 입력하세요."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
          <div className={styles.uploadBtn} onClick={addComment}>
            등록
          </div>
        </div>
      )}
      <div className={styles.commentList}>
        {commentList.map((item) => (
          <CommentItem
            key={item.commentCreateAt}
            item={item}
            newChatRoom={newChatRoom}
            deleteComment={deleteComment}
          />
        ))}
      </div>
      {deleteModal && (
        <CustomModal
          content="정말 삭제하시겠습니까?"
          customFunc={deletePost}
          handleModal={closeDeleteModal}
        />
      )}
    </div>
  )
}

export default LostItemPost
