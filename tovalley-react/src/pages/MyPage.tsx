import { useEffect, useState } from 'react'
import styles from '@styles/user/MyPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { elapsedTime } from '@utils/elapsedTime'
import { LostFoundContent, PreSchedule, Schedule, User } from 'types/user'
import ProfileImage from '@features/user/components/ProfileImage'
import MyNickName from '@features/user/components/MyNickName'
import cn from 'classnames'
import MyReviewItem from '@features/user/components/MyReviewItem'
import axiosInstance from '@utils/axios_interceptor'
import LoginModal from '@component/LoginModal'
import useObserver from '@hooks/useObserver'
import TripSchedule from '@features/user/components/TripSchedule'

const MyPage = () => {
  const [scheduleBtn, setScheduleBtn] = useState('앞으로의 일정')
  const [deleteBtn, setDeleteBtn] = useState(false)
  const [loginModal, setLoginModal] = useState(false)
  const navigation = useNavigate()
  const [currentCategory, setCurrentCategory] = useState('내 리뷰')
  const [myLostFoundBoards, setMyLostFoundBoards] = useState<
    LostFoundContent[] | null
  >(null)
  const [user, setUser] = useState<User | null>(null)
  const [upCommingSchedule, setUpCommingSchedule] = useState<Schedule[] | null>(
    null
  )
  const [preSchedule, setPreSchedule] = useState<PreSchedule | null>(null)
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
    getPreSchedule()
    axiosInstance
      .get('/api/auth/my-page')
      .then((res) => {
        console.log(res)
        setUser(res.data.data)
        setUpCommingSchedule(res.data.data.myUpcomingTripSchedules)
        setMyLostFoundBoards(res.data.data.myLostFoundBoards.content)

        if (res.data.data.myLostFoundBoards.pageable.last) setIsPageEnd(true)
      })
      .catch((err) => {
        console.log(err)
        err.response.status === 401 && setLoginModal(true)
      })
  }, [])

  const getPreSchedule = () => {
    axiosInstance
      .get('/api/auth/my-page/pre-schedules')
      .then((res) => {
        setPreSchedule(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  const getUpcomingSchedule = () => {
    axiosInstance
      .get('/api/auth/my-page/upcoming-schedules')
      .then((res) => {
        setUpCommingSchedule(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  const moveToLostItemPage = () => {
    navigation(`/lost-item`)
  }

  const Category = ({
    name,
    category,
    setCategory,
  }: {
    name: string
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
  }) => {
    return (
      <span
        className={cn(styles.category, {
          [styles.active]: category === name,
        })}
        onClick={() => {
          setCategory(name)
          getUpcomingSchedule()
        }}
      >
        {name}
      </span>
    )
  }

  if (!user || !upCommingSchedule || !preSchedule || !myLostFoundBoards)
    return <div>loading</div>

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
        <div className={styles.schedule}>
          <div className={styles.scheduleControl}>
            <div className={styles.categoryWrap}>
              <Category
                name="앞으로의 일정"
                category={scheduleBtn}
                setCategory={setScheduleBtn}
              />
              <Category
                name="지난 일정"
                category={scheduleBtn}
                setCategory={setScheduleBtn}
              />
            </div>
            {scheduleBtn === '앞으로의 일정' && (
              <>
                <span
                  onClick={() => setDeleteBtn(true)}
                  className={styles.deleteButton}
                >
                  삭제
                </span>
                <span
                  onClick={() => setDeleteBtn(true)}
                  className={styles.deleteIcon}
                >
                  <RiDeleteBin6Line color="#66a5fc" size="25px" />
                </span>
              </>
            )}
          </div>
          <div className={styles.scheduleList}>
            {scheduleBtn === '앞으로의 일정' ? (
              <TripSchedule
                scheduleBtn={scheduleBtn}
                tripSchedules={upCommingSchedule}
                setUpCommingSchedule={setUpCommingSchedule}
                setPreSchedule={setPreSchedule}
                preSchedule={preSchedule}
                deleteBtn={deleteBtn}
                setDeleteBtn={setDeleteBtn}
              />
            ) : (
              <TripSchedule
                scheduleBtn={scheduleBtn}
                tripSchedules={preSchedule.content}
                setUpCommingSchedule={setUpCommingSchedule}
                setPreSchedule={setPreSchedule}
                preSchedule={preSchedule}
                deleteBtn={deleteBtn}
                setDeleteBtn={setDeleteBtn}
              />
            )}
          </div>
        </div>
      </div>
      {loginModal && <LoginModal />}
    </div>
  )
}

export default MyPage
