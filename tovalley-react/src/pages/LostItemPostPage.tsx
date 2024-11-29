import { useEffect, useState } from 'react'
import styles from '@styles/lostItem/LostItemPost.module.scss'
import { AiOutlineComment } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { MdLocationPin } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { view } from '../store/chat/chatViewSlice'
import { enterChatRoom } from '../store/chat/chatRoomIdSlice'
import { Cookies } from 'react-cookie'
import { LostPost, LostPostComment } from 'types/lost-found'
import { elapsedTime } from '@utils/elapsedTime'
import cn from 'classnames'
import CommentItem from '@features/lostItem/components/CommentItem'
import CustomModal from '@component/CustomModal'
import axiosInstance from '@utils/axios_interceptor'

const LostItemPostPage = () => {
  const { category, id } = useParams()

  const [lostPost, setLostPost] = useState<LostPost | null>(null)
  const [commentList, setCommentList] = useState<LostPostComment[] | null>(null)
  const [resolveCheck, setResolveCheck] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cookies = new Cookies()

  useEffect(() => {
    axiosInstance
      .get(`/api/lostItem/${id}`)
      .then((res) => {
        setLostPost(res.data.data)
        setCommentList(res.data.data.comments)
        setResolveCheck(res.data.data.isResolved)
      })
      .catch((err) => console.log(err))
  }, [id])

  const checkResolve = () => {
    axiosInstance
      .patch(
        `/api/auth/lostItem/${id}`,
        {},
        {
          params: {
            isResolved: !resolveCheck,
          },
        }
      )
      .then(() => {
        setResolveCheck(!resolveCheck)
      })
      .catch((err) => console.log(err))
  }

  const deletePost = () => {
    axiosInstance
      .delete(`/api/auth/lostItem/${id}`)
      .then((res) => {
        console.log(res)
        window.location.replace('/lost-item')
      })
      .catch((err) => console.log(err))
  }

  const closeDeleteModal = () => {
    setDeleteModal(false)
  }

  const addComment = () => {
    axiosInstance
      .post(`/api/auth/lostItem/${id}/comment`, {
        commentContent: commentText,
      })
      .then((res) => {
        const newComment = {
          commentId: res.data.data.commentId,
          commentAuthor: res.data.data.commentAuthor,
          commentContent: res.data.data.commentContent,
          commentCreateAt: res.data.data.commentCreateAt,
          commentByUser: true,
          commentAuthorProfile: res.data.data.commentAuthorProfile,
        }
        if (commentList && commentList.length > 0) {
          setCommentList([...commentList, newComment])
        } else {
          setCommentList([newComment])
        }
        // const newCommentList = commentList?.concat([res.data.data]);
        setCommentText('')
      })
      .catch((err) => console.log(err))
  }

  const deleteComment = (item: LostPostComment) => {
    axiosInstance
      .delete(`/api/auth/lostItem/${id}/comment/${item.commentId}`)
      .then((res) => {
        console.log(res)

        const newCommentList = commentList!.filter((comment) => {
          return comment !== item
        })
        setCommentList(newCommentList)
      })
      .catch((err) => console.log(err))
  }

  const moveToUpdatePage = () => {
    navigate(`/lost-item/${category}/${id}/update`)
  }

  const newChatRoom = (nickname: string) => {
    axiosInstance
      .post('/api/auth/chatroom', {
        // 채팅방 생성 or 기존채팅방 id 요청
        recipientNick: nickname,
      })
      .then((res) => {
        console.log(res)
        dispatch(enterChatRoom(res.data.data.chatRoomId))
        dispatch(view(true))
      })
  }

  if (!lostPost || !commentList) return <div>loading</div>

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
                  onClick={checkResolve}
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
      {cookies.get('ISLOGIN') && (
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
      {commentList.length > 0 && (
        <div className={styles.commentList}>
          {commentList.map((item) => (
            <CommentItem
              item={item}
              newChatRoom={newChatRoom}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      )}
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

export default LostItemPostPage
