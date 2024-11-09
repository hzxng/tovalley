import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import styles from "../css/user/MyPage.module.css";
import RatingStar from "../component/common/RatingStar";
import axiosInstance from "../axios_interceptor";
import ConfirmModal from "../component/common/ConfirmModal";
import TripSchedule from "../component/user/TripSchedule";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { elapsedTime } from "../composables/elapsedTime";

type user = {
  userProfile: {
    memberProfileImg: string | null;
    memberName: string;
    memberNick: string;
  };
  myReviews: {
    content: {
      reviewId: number; // 리뷰 Id(PK)
      waterPlaceId: number; // 물놀이 장소 Id(PK)
      waterPlaceName: string; // 물놀이 장소명
      rating: number; // 내가 작성한 평점
      createdReviewDate: string; // 내가 리뷰를 작성한 시간
      content: string; // 내가 작성한 리뷰 내용
      reviewImages: string | null; // 내가 추가한 리뷰 이미지들
      waterQuality: string; // 내가 작성한 수질 정보
    }[];
    pageable: {
      sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
      };
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      unpaged: boolean;
    };
    size: number; // 요청한 응답 개수
    number: number; // 응답된 페이지
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    first: boolean; // 첫번째 페이지인지 여부
    last: boolean; // 마지막 페이지인지 여부
    numberOfElements: number; // 조회된 개수
    empty: boolean;
  };
  myUpcomingTripSchedules: // 앞으로의 일정 리스트 (최대 5개)
  {
    tripScheduleId: number; // 여행 일정 Id(PK)
    waterPlaceId: number; // 물놀이 장소 Id(PK)
    waterPlaceName: string; // 물놀이 장소명
    waterPlaceImg: string | null; // 물놀이 장소 이미지
    waterPlaceAddr: string; // 물놀이 장소 주소
    waterPlaceRating: number; // 물놀이 장소 평점
    waterPlaceReviewCnt: number; // 물놀이 장소 리뷰 개수
    waterPlaceTraffic: number; // 물놀이 장소 혼잡도(해당 날짜에 해당 계곡에 가는 인원수)
    tripDate: string; // 내가 계획한 여행 날자
    tripPartySize: number; // 함께 가는 여행 인원수
    rescueSupplies: {
      lifeBoatNum: number; // 인명구조함
      portableStandNum: number; // 이동식거치대
      lifeJacketNum: number; // 구명조끼
      lifeRingNum: number; // 구명환
      rescueRopeNum: number; // 구명로프
      rescueRodNum: number; // 구조봉
    };
    hasReview: boolean; // 리뷰 작성 여부(앞으로의 일정은 리뷰를 작성할 수 없음)
  }[];
  myLostFoundBoards: {
    content: {
      lostFoundBoardId: number;
      title: string;
      postCreateAt: string;
    }[];
    pageable: {
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      unpaged: boolean;
    };
    first: boolean;
    last: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    empty: boolean;
  };
};

type preSchedule = {
  content: {
    tripScheduleId: number;
    waterPlaceId: number;
    waterPlaceName: string;
    waterPlaceImg: string | null;
    waterPlaceAddr: string;
    waterPlaceRating: number | string;
    waterPlaceReviewCnt: number | string;
    waterPlaceTraffic: number;
    tripDate: string;
    tripPartySize: number;
    rescueSupplies: {
      lifeBoatNum: number;
      portableStandNum: number;
      lifeJacketNum: number;
      lifeRingNum: number;
      rescueRopeNum: number;
      rescueRodNum: number;
    };
    hasReview: boolean;
  }[];
  pageable: {
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  first: boolean;
  last: boolean;
  size: number;
  numberOfElements: number;
  empty: boolean;
};

type schedule = {
  tripScheduleId: number;
  waterPlaceId: number;
  waterPlaceName: string;
  waterPlaceImg: string | null;
  waterPlaceAddr: string;
  waterPlaceRating: number | string;
  waterPlaceReviewCnt: number | string;
  waterPlaceTraffic: number;
  tripDate: string;
  tripPartySize: number;
  rescueSupplies: {
    lifeBoatNum: number;
    portableStandNum: number;
    lifeJacketNum: number;
    lifeRingNum: number;
    rescueRopeNum: number;
    rescueRodNum: number;
  };
  hasReview: boolean;
}[];

const MyPage = () => {
  const [nickUpdate, setNickUpdate] = useState({
    click: false,
    duplicateCheck: false,
    inputNick: "",
    available: false,
  });
  const [confirmView, setConfirmView] = useState({
    view: false,
    content: "",
  });
  const [changeImg, setChangeImg] = useState<{
    modal: boolean;
    imgFile: string | null | ArrayBuffer;
  }>({
    modal: false,
    imgFile: "",
  });

  const imgRef = useRef<HTMLInputElement>(null);
  const [scheduleBtn, setScheduleBtn] = useState("앞으로의 일정");
  const [userImg, setUserImg] = useState("");
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const navigation = useNavigate();
  const [currentCategory, setCurrentCategory] = useState("내 리뷰");
  const target = useRef<HTMLDivElement>(null);
  const [isPageEnd, setIsPageEnd] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [newMyPost, setNewMyPost] = useState();

  const [user, setUser] = useState<user>({
    userProfile: {
      memberProfileImg: "",
      memberName: "",
      memberNick: "",
    },
    myReviews: {
      content: [
        {
          reviewId: 0,
          waterPlaceId: 0,
          waterPlaceName: "",
          rating: 0,
          createdReviewDate: "",
          content: "",
          reviewImages: "",
          waterQuality: "",
        },
      ],
      pageable: {
        sort: {
          empty: false,
          unsorted: false,
          sorted: false,
        },
        offset: 0,
        pageNumber: 0,
        pageSize: 0,
        paged: false,
        unpaged: false,
      },
      size: 0,
      number: 0,
      sort: {
        empty: false,
        unsorted: false,
        sorted: false,
      },
      first: false,
      last: false,
      numberOfElements: 0,
      empty: false,
    },
    myUpcomingTripSchedules: [
      {
        tripScheduleId: 0,
        waterPlaceId: 0,
        waterPlaceName: "",
        waterPlaceImg: "",
        waterPlaceAddr: "",
        waterPlaceRating: 0,
        waterPlaceReviewCnt: 0,
        waterPlaceTraffic: 0,
        tripDate: "",
        tripPartySize: 0,
        rescueSupplies: {
          lifeBoatNum: 0,
          portableStandNum: 0,
          lifeJacketNum: 0,
          lifeRingNum: 0,
          rescueRopeNum: 0,
          rescueRodNum: 0,
        },
        hasReview: false,
      },
    ],
    myLostFoundBoards: {
      content: [
        {
          lostFoundBoardId: 0,
          title: "",
          postCreateAt: "",
        },
      ],
      pageable: {
        sort: {
          empty: false,
          unsorted: false,
          sorted: false,
        },
        offset: 0,
        pageNumber: 0,
        pageSize: 0,
        paged: false,
        unpaged: false,
      },
      first: false,
      last: false,
      size: 0,
      number: 0,
      sort: {
        empty: false,
        unsorted: false,
        sorted: false,
      },
      numberOfElements: 0,
      empty: false,
    },
  });

  const [upCommingSchedule, setUpCommingSchedule] = useState<schedule>([
    {
      tripScheduleId: 0,
      waterPlaceId: 0,
      waterPlaceName: "",
      waterPlaceImg: "",
      waterPlaceAddr: "",
      waterPlaceRating: 0,
      waterPlaceReviewCnt: 0,
      waterPlaceTraffic: 0,
      tripDate: "",
      tripPartySize: 0,
      rescueSupplies: {
        lifeBoatNum: 0,
        portableStandNum: 0,
        lifeJacketNum: 0,
        lifeRingNum: 0,
        rescueRopeNum: 0,
        rescueRodNum: 0,
      },
      hasReview: false,
    },
  ]);

  const [preSchedule, setPreSchedule] = useState<preSchedule>({
    content: [
      {
        tripScheduleId: 0,
        waterPlaceId: 0,
        waterPlaceName: "",
        waterPlaceImg: "",
        waterPlaceAddr: "",
        waterPlaceRating: 0,
        waterPlaceReviewCnt: 0,
        waterPlaceTraffic: 0,
        tripDate: "",
        tripPartySize: 0,
        rescueSupplies: {
          lifeBoatNum: 0,
          portableStandNum: 0,
          lifeJacketNum: 0,
          lifeRingNum: 0,
          rescueRopeNum: 0,
          rescueRodNum: 0,
        },
        hasReview: false,
      },
    ],
    pageable: {
      sort: {
        empty: false,
        unsorted: false,
        sorted: false,
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 0,
      paged: false,
      unpaged: false,
    },
    number: 0,
    sort: {
      empty: false,
      unsorted: false,
      sorted: false,
    },
    first: false,
    last: false,
    size: 0,
    numberOfElements: 0,
    empty: false,
  });

  useEffect(() => {
    axiosInstance
      .get("/api/auth/my-page")
      .then((res) => {
        console.log(res);
        setUser(res.data.data);
        setUserImg(res.data.data.userProfile.memberProfileImg);
        setUpCommingSchedule(res.data.data.myUpcomingTripSchedules);
      })
      .catch((err) => {
        console.log(err);
        err.response.status === 401 && setLoginModal(true);
      });
  }, []);

  const checkNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = /^[가-힣a-zA-Z0-9]{1,10}$/;
    if (regExp.test(e.target.value) === true) {
      setNickUpdate({ ...nickUpdate, available: true });
    } else {
      setNickUpdate({ ...nickUpdate, available: false });
    }
  };

  // 닉네임 중복 체크
  const checkDuplication = () => {
    const data = {
      nickname: nickUpdate.inputNick,
    };

    nickUpdate.available
      ? axiosInstance
          .post(`/api/members/check-nickname`, data)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              setConfirmView({
                view: true,
                content: "사용 가능한 닉네임입니다.",
              });
              setNickUpdate({ ...nickUpdate, duplicateCheck: true });
            }
          })
          .catch((err) => console.log(err))
      : setConfirmView({
          view: true,
          content: "한/영, 숫자 포함 20자 이내로 작성해주세요.",
        });
  };

  // 닉네임 수정
  const handleResetNicname = () => {
    const data = {
      nickname: nickUpdate.inputNick,
    };

    axiosInstance
      .post("/api/auth/members/set-nickname", data)
      .then((res) => {
        console.log(res);
        setNickUpdate({ ...nickUpdate, click: false });
      })
      .catch((err) => console.log(err));
  };

  const getPreSchedule = () => {
    axiosInstance
      .get("/api/auth/my-page/pre-schedules")
      .then((res) => {
        console.log(res);
        setPreSchedule(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getUpcomingSchedule = () => {
    axiosInstance
      .get("/api/auth/my-page/upcoming-schedules")
      .then((res) => {
        console.log(res);
        setUpCommingSchedule(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setChangeImg({ imgFile: reader.result, modal: false });
        reader.result === null || reader.result === ""
          ? setUserImg("")
          : setUserImg(reader.result.toString());
      };

      const formData = new FormData();
      if (file !== undefined) {
        formData.append("image", file);
      }

      axiosInstance
        .post("/api/auth/members/profile-image", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  const getMyPost = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/api/auth/my-board", {
        params: {
          page,
        },
      });
      console.log(res);
      setNewMyPost(res.data.content);
      if (res.data.last || res.data.data.content.length < 5) {
        setIsPageEnd(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    let newUser = user;
    if (newMyPost)
      newUser.myLostFoundBoards.content = [
        ...user.myLostFoundBoards.content,
        ...newMyPost,
      ];
    setUser(newUser);
  }, [newMyPost]);

  const handleObserver = useCallback(
    async (
      [entry]: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        setPage((prev) => prev + 1);
        await getMyPost();
      }
    },
    []
  );

  useEffect(() => {
    if (!target.current) return;

    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    target.current && observer.observe(target.current);

    return () => observer && observer.disconnect();
  }, [handleObserver, isPageEnd]);

  return (
    <div className={styles.myPageContainer}>
      <Header />
      <div className={styles.body}>
        <div className={styles.myPage}>
          <h1>마이페이지</h1>
          <div className={styles.userInfo}>
            <div className={styles.userBasicInfo}>
              <span>기본정보</span>
              <form encType="multipart/form-data">
                <div className={styles.profileImg}>
                  <div
                    className={styles.profileUser}
                    onClick={() =>
                      setChangeImg({ ...changeImg, modal: !changeImg.modal })
                    }
                  >
                    <img
                      src={
                        userImg === null || userImg === ""
                          ? process.env.PUBLIC_URL + "/img/user-profile.png"
                          : userImg
                      }
                      alt="사용자 프로필 이미지"
                    />
                  </div>
                  <input
                    name="accountProfileImage"
                    className={styles.profileInput}
                    type="file"
                    accept="image/*"
                    id="profileImg"
                    onChange={saveImgFile}
                    ref={imgRef}
                  />
                  <span
                    onClick={() =>
                      setChangeImg({ ...changeImg, modal: !changeImg.modal })
                    }
                  >
                    프로필 이미지 변경
                  </span>
                </div>
                {changeImg.modal && (
                  <Profile
                    changeImg={changeImg}
                    setChangeImg={setChangeImg}
                    imgRef={imgRef}
                    setUserImg={setUserImg}
                  />
                )}
              </form>
              <div className={styles.userNickname}>
                <div className={styles.nicknameInput}>
                  <span>닉네임</span>
                  {nickUpdate.click ? (
                    <input
                      placeholder="닉네임"
                      value={nickUpdate.inputNick}
                      onChange={(e) =>
                        setNickUpdate({
                          ...nickUpdate,
                          inputNick: e.target.value,
                        })
                      }
                      onBlur={checkNickname}
                      maxLength={20}
                    />
                  ) : (
                    <span>{user.userProfile.memberNick}</span>
                  )}
                </div>
                <div className={styles.nicknameBtn}>
                  {!nickUpdate.click && (
                    <span
                      onClick={() => {
                        if (nickUpdate.inputNick === "") {
                          setNickUpdate({
                            ...nickUpdate,
                            inputNick: user.userProfile.memberNick,
                            click: true,
                          });
                        } else {
                          setNickUpdate({
                            ...nickUpdate,
                            duplicateCheck: false,
                            click: true,
                          });
                        }
                      }}
                      style={
                        user.userProfile.memberNick === ""
                          ? { marginLeft: "0" }
                          : {}
                      }
                    >
                      수정
                    </span>
                  )}
                  {nickUpdate.click && (
                    <span
                      onClick={() => {
                        if (!nickUpdate.duplicateCheck) {
                          checkDuplication();
                        } else {
                          handleResetNicname();
                          setUser({
                            ...user,
                            userProfile: {
                              ...user.userProfile,
                              memberNick: nickUpdate.inputNick,
                            },
                          });
                        }
                      }}
                    >
                      {nickUpdate.duplicateCheck ? "저장" : "중복검사"}
                    </span>
                  )}
                  {nickUpdate.click && (
                    <span
                      onClick={() => {
                        if (nickUpdate.click) {
                          setNickUpdate({
                            ...nickUpdate,
                            inputNick: user.userProfile.memberNick,
                            duplicateCheck: false,
                            click: false,
                          });
                        }
                      }}
                    >
                      취소
                    </span>
                  )}
                </div>

                {confirmView.view && (
                  <ConfirmModal
                    content={confirmView.content}
                    handleModal={setConfirmView}
                  />
                )}
              </div>
              <div className={styles.userEmail}>
                <span>이름</span>
                <span>{user.userProfile.memberName}</span>
              </div>
            </div>
            <div className={styles.myReview}>
              <div className={styles.myReviewCategoryWrap}>
                <div
                  className={`${
                    currentCategory === "내 리뷰"
                      ? styles.categoryClicked
                      : styles.categoryColor
                  } ${styles.myReviewCategory}`}
                  onClick={() => setCurrentCategory("내 리뷰")}
                >
                  <h4>내 리뷰</h4>
                </div>
                <div
                  className={`${
                    currentCategory === "내 글"
                      ? styles.categoryClicked
                      : styles.categoryColor
                  } ${styles.myReviewCategory}`}
                  onClick={() => setCurrentCategory("내 글")}
                >
                  <h4>내 글</h4>
                </div>
              </div>
              <div className={styles.reviewContainer}>
                {currentCategory === "내 리뷰" ? (
                  user.myReviews.content.map((item) => {
                    return (
                      <div key={item.reviewId} className={styles.reviewItem}>
                        <div
                          className={styles.reviewTitle}
                          onClick={() =>
                            navigation(`/valley/${item.waterPlaceId}`)
                          }
                        >
                          <span>{item.waterPlaceName}</span>
                        </div>
                        <div className={styles.reviewContent}>
                          {item.reviewImages !== null && (
                            <img
                              src={item.reviewImages}
                              alt="리뷰 이미지"
                              width="130px"
                            />
                          )}
                          {item.reviewImages !== null && (
                            <span>{item.reviewImages.length}</span>
                          )}
                          <div
                            className={styles.reviewInfo}
                            style={
                              item.reviewImages === null
                                ? {
                                    borderRadius: "0 0 5px 5px",
                                    borderLeft: "1px solid #bcbcbc",
                                  }
                                : {}
                            }
                          >
                            <div className={styles.reviewRating}>
                              <div>
                                <span>
                                  <RatingStar
                                    rating={item.rating}
                                    size="20px"
                                  />
                                </span>
                                <span>{item.rating}</span>
                              </div>
                              <span>{item.waterQuality}</span>
                            </div>
                            <span>{item.createdReviewDate}</span>
                            <div>
                              <span>{item.content}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    {user.myLostFoundBoards.content.map((post) => {
                      return (
                        <div
                          key={post.lostFoundBoardId}
                          className={styles.postItem}
                          onClick={() => navigation(`/lost-item`)}
                        >
                          <p>{post.title}</p>
                          <span>{elapsedTime(post.postCreateAt)}</span>
                        </div>
                      );
                    })}
                    {!isPageEnd && (
                      <div
                        ref={target}
                        style={{ width: "100%", height: "5px" }}
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
            <div className={styles.scheduleBtn}>
              <div>
                <span
                  onClick={() => {
                    setScheduleBtn("앞으로의 일정");
                    getUpcomingSchedule();
                  }}
                  style={
                    scheduleBtn === "앞으로의 일정" ? { color: "black" } : {}
                  }
                >
                  앞으로의 일정
                </span>
              </div>
              <div>
                <span
                  onClick={() => {
                    setScheduleBtn("지난 일정");
                    getPreSchedule();
                  }}
                  style={scheduleBtn === "지난 일정" ? { color: "black" } : {}}
                >
                  지난 일정
                </span>
              </div>
            </div>
            {scheduleBtn === "앞으로의 일정" && (
              <span
                onClick={() => setDeleteBtn(true)}
                className={styles.deleteButton}
              >
                삭제
              </span>
            )}
            {scheduleBtn === "앞으로의 일정" && (
              <span
                onClick={() => setDeleteBtn(true)}
                className={styles.deleteIcon}
              >
                <RiDeleteBin6Line color="#66a5fc" size="25px" />
              </span>
            )}
          </div>
          <div className={styles.scheduleList}>
            {scheduleBtn === "앞으로의 일정" ? (
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
      <Footer />
    </div>
  );
};

interface ProfileProp {
  changeImg: {
    modal: boolean;
    imgFile: string | null | ArrayBuffer;
  };
  setChangeImg: React.Dispatch<
    React.SetStateAction<{
      modal: boolean;
      imgFile: string | null | ArrayBuffer;
    }>
  >;
  imgRef: React.RefObject<HTMLInputElement>;
  setUserImg: React.Dispatch<React.SetStateAction<string>>;
}

const Profile: FC<ProfileProp> = ({
  changeImg,
  setChangeImg,
  imgRef,
  setUserImg,
}) => {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const deleteProfileImg = (e: React.MouseEvent) => {
    e.preventDefault();
    if (imgRef.current) {
      imgRef.current.value = "";
      setUserImg("");
      setChangeImg({ imgFile: "", modal: false });
    }

    axiosInstance
      .post("/api/auth/members/profile-image")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.profileUpdate}>
        <div>
          <h1>프로필 사진 바꾸기</h1>
        </div>
        <div>
          <label htmlFor="profileImg">
            <h2>사진 업로드</h2>
          </label>
        </div>
        <div>
          <h2 onClick={(e) => deleteProfileImg(e)}>기본 이미지로 변경</h2>
        </div>
        <div>
          <p onClick={() => setChangeImg({ ...changeImg, modal: false })}>
            취소
          </p>
        </div>
      </div>
    </div>
  );
};

const LoginModal = () => {
  useEffect(() => {
    document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const navigation = useNavigate();

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBox}>
        <div className={styles.modalContent}>
          <span>로그인이 필요합니다.</span>
        </div>
        <div className={styles.confirm} onClick={() => navigation("/login")}>
          로그인
        </div>
      </div>
    </div>
  );
};

export default MyPage;
