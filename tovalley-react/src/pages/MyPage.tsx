import { useState } from 'react'
import styles from '@styles/user/MyPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { elapsedTime } from '@utils/elapsedTime'
import ProfileImage from '@features/user/components/ProfileImage'
import MyNickName from '@features/user/components/MyNickName'
import MyReviewItem from '@features/user/components/MyReviewItem'
import LoginModal from '@component/LoginModal'
import TripSchedule from '@features/user/components/TripSchedule'
import Category from '@features/user/components/Category'
import Loading from '@component/Loading'
import useUserData from '@features/user/hooks/useUserData'
import useMyPostData from '@features/user/hooks/useMyPostData'

const MyPage = () => {
  const navigation = useNavigate()
  const [currentCategory, setCurrentCategory] = useState('내 리뷰')
  const { user, loginModal } = useUserData()
  const { myPosts, target, isPageEnd } = useMyPostData()

  const moveToLostItemPage = () => {
    navigation(`/lost-item`)
  }

  if (!user || !myPosts) return <Loading />

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.body}>
        <div className={styles.myPage}>
          <h1>마이페이지</h1>
          <div className={styles.userInfo}>
            <div className={styles.userBasicInfo}>
              <span>기본정보</span>
              <ProfileImage profileImg={user.userProfile.memberProfileImg} />
              <MyNickName userNickName={user.userProfile.memberNick} />
              <div className={styles.userEmail}>
                <span>이름</span>
                <span>{user.userProfile.memberName}</span>
              </div>
            </div>
            <div className={styles.myReview}>
              <div className={styles.categoryWrap}>
                {['내 리뷰', '내 글'].map((name) => (
                  <Category
                    key={name}
                    name={name}
                    category={currentCategory}
                    setCategory={setCurrentCategory}
                  />
                ))}
              </div>
              <div className={styles.reviewContainer}>
                {currentCategory === '내 리뷰' ? (
                  user.myReviews.content.map((item) => {
                    return <MyReviewItem key={item.reviewId} item={item} />
                  })
                ) : (
                  <div>
                    {myPosts.map((post) => {
                      return (
                        <div
                          key={post.lostFoundBoardId}
                          className={styles.postItem}
                          onClick={moveToLostItemPage}
                        >
                          <p>{post.title}</p>
                          <span>{elapsedTime(post.postCreateAt)}</span>
                        </div>
                      )
                    })}
                    {!isPageEnd && <div ref={target} className={styles.ref} />}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <TripSchedule tripSchedules={user.myUpcomingTripSchedules} />
      </div>
      {loginModal && <LoginModal />}
    </div>
  )
}

export default MyPage
