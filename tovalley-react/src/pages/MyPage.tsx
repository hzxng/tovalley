import { useEffect, useState } from 'react'
import styles from '@styles/user/MyPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { elapsedTime } from '@utils/elapsedTime'
import { LostFoundContent, User } from 'types/user'
import ProfileImage from '@features/user/components/ProfileImage'
import MyNickName from '@features/user/components/MyNickName'
import MyReviewItem from '@features/user/components/MyReviewItem'
import axiosInstance from '@utils/axios_interceptor'
import LoginModal from '@component/LoginModal'
import useObserver from '@hooks/useObserver'
import TripSchedule from '@features/user/components/TripSchedule'
import Category from '@features/user/components/Category'

const MyPage = () => {
  const [loginModal, setLoginModal] = useState(false)
  const navigation = useNavigate()
  const [currentCategory, setCurrentCategory] = useState('내 리뷰')
  const [myLostFoundBoards, setMyLostFoundBoards] = useState<
    LostFoundContent[] | null
  >(null)
  const [user, setUser] = useState<User | null>(null)

  const [isPageEnd, setIsPageEnd] = useState<boolean>(false)

  const getMyPost = async () => {
    try {
      const res = await axiosInstance.get('/api/auth/my-board', {
        params: {
          page,
        },
      })
      const newMyPost = myLostFoundBoards?.concat(res.data.data.content)
      newMyPost && setMyLostFoundBoards(newMyPost)
      if (res.data.data.last || res.data.data.content.length < 5) {
        setIsPageEnd(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const { target, page } = useObserver(getMyPost, isPageEnd)

  useEffect(() => {
    axiosInstance
      .get('/api/auth/my-page')
      .then((res) => {
        console.log(res)
        setUser(res.data.data)
        setMyLostFoundBoards(res.data.data.myLostFoundBoards.content)

        if (res.data.data.myLostFoundBoards.pageable.last) setIsPageEnd(true)
      })
      .catch((err) => {
        console.log(err)
        err.response.status === 401 && setLoginModal(true)
      })
  }, [])

  const moveToLostItemPage = () => {
    navigation(`/lost-item`)
  }

  if (!user || !myLostFoundBoards) return <div>loading</div>

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
                <Category
                  name="내 리뷰"
                  category={currentCategory}
                  setCategory={setCurrentCategory}
                />
                <Category
                  name="내 글"
                  category={currentCategory}
                  setCategory={setCurrentCategory}
                />
              </div>
              <div className={styles.reviewContainer}>
                {currentCategory === '내 리뷰' ? (
                  user.myReviews.content.map((item) => {
                    return <MyReviewItem key={item.reviewId} item={item} />
                  })
                ) : (
                  <div>
                    {myLostFoundBoards.map((post) => {
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
                    {!isPageEnd && (
                      <div
                        ref={target}
                        style={{ width: '100%', height: '5px' }}
                      />
                    )}
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
