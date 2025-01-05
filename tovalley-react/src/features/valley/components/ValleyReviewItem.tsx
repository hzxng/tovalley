import styles from '@styles/valley/ValleyReviewItem.module.scss'
import { ReviewContent } from 'types/valley'
import { MdImage } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineComment } from 'react-icons/ai'
import RatingStar from '@component/RatingStar'
import axiosInstance from '@utils/axios_interceptor'
import useMobile from '@hooks/useMobile'
import { useState } from 'react'
import cn from 'classnames'
import DetailReviewImg from './DetailReviewImg'
import { useSetRecoilState } from 'recoil'
import { chatRoomIdState, chatViewState } from 'recoil/atom'

const ValleyReviewItem = ({ item }: { item: ReviewContent }) => {
  const { innerWidth } = useMobile()
  const [detailReview, setDetailReview] = useState<{
    view: boolean
    images: string[]
  }>({ view: false, images: [] })

  const setChatRoomId = useSetRecoilState(chatRoomIdState)
  const setChatView = useSetRecoilState(chatViewState)

  const newChatRoom = (nickname: string) => {
    axiosInstance
      .post('/api/auth/chatroom', {
        // 채팅방 생성 or 기존채팅방 id 요청
        recipientNick: nickname,
      })
      .then((res) => {
        console.log(res)
        setChatRoomId(res.data.data.chatRoomId)
        setChatView(true)
      })
  }

  const handleClickImg = () => {
    item.reviewImages &&
      setDetailReview({ view: true, images: item.reviewImages })
  }

  const handleChatting = () => {
    newChatRoom(item.nickname)
  }

  return (
    <div className={styles.reviewItem}>
      <div
        className={cn(styles.valleyImg, {
          [styles.cursor]: item.reviewImages?.length,
        })}
        onClick={handleClickImg}
      >
        <img
          src={
            item.reviewImages?.length
              ? `${item.reviewImages[0]}`
              : process.env.PUBLIC_URL + '/img/default-image.png'
          }
          alt="계곡 이미지"
        />
        {item.reviewImages.length > 1 && (
          <span>{item.reviewImages.length}</span>
        )}
      </div>
      <div className={styles.reviewDetail}>
        <div className={styles.reviewInfo}>
          <div className={styles.userInfo}>
            {item.memberProfileImg ? (
              <div className={styles.userInfoProfileImg}>
                <img src={item.memberProfileImg} alt="profileImg" />
              </div>
            ) : (
              <span className={styles.defaultProfile}>
                <FaUserCircle />
              </span>
            )}
            <span className={styles.nickname}>{item.nickname}</span>
            {!item.isMyReview && (
              <div className={styles.chatBtn} onClick={handleChatting}>
                <AiOutlineComment size="20px" />
                <span>채팅하기</span>
              </div>
            )}
          </div>
          <span className={styles.reviewDate}>{item.createdReviewDate}</span>
        </div>
        <div className={styles.reviewItemRating}>
          <span>
            <RatingStar
              rating={item.rating}
              size={innerWidth <= 730 ? '16px' : '20px'}
            />
          </span>
          <span>{item.rating}</span>
          {item.waterQuality && (
            <span className={styles.waterQuality}>{item.waterQuality}</span>
          )}
          {item.reviewImages && (
            <span className={styles.imgIcon} onClick={handleClickImg}>
              <MdImage />
            </span>
          )}
        </div>
        <span className={styles.content}>{item.content}</span>
      </div>
      {detailReview.view && (
        <DetailReviewImg
          detailReview={detailReview}
          setDetailReview={setDetailReview}
        />
      )}
    </div>
  )
}

export default ValleyReviewItem
