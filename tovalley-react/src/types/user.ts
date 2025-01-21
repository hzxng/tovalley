interface UserProfile {
  memberProfileImg: string | null
  memberName: string
  memberNick: string
}

export interface ReviewContent {
  reviewId: number // 리뷰 Id(PK)
  waterPlaceId: number // 물놀이 장소 Id(PK)
  waterPlaceName: string // 물놀이 장소명
  rating: number // 내가 작성한 평점
  createdReviewDate: string // 내가 리뷰를 작성한 시간
  content: string // 내가 작성한 리뷰 내용
  reviewImages: string[] | null // 내가 추가한 리뷰 이미지들
  waterQuality: string // 내가 작성한 수질 정보
}

export interface LostFoundContent {
  lostFoundBoardId: number
  title: string
  postCreateAt: string
}

interface MyReview {
  content: ReviewContent[]
  pageable: {
    sort: {
      empty: boolean
      unsorted: boolean
      sorted: boolean
    }
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  size: number // 요청한 응답 개수
  number: number // 응답된 페이지
  sort: {
    empty: boolean
    unsorted: boolean
    sorted: boolean
  }
  first: boolean // 첫번째 페이지인지 여부
  last: boolean // 마지막 페이지인지 여부
  numberOfElements: number // 조회된 개수
  empty: boolean
}

interface Boards {
  content: LostFoundContent[]
  pageable: {
    sort: {
      empty: boolean
      unsorted: boolean
      sorted: boolean
    }
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  size: number
  number: number
  sort: {
    empty: boolean
    unsorted: boolean
    sorted: boolean
  }
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
}

export interface Schedule {
  tripScheduleId: number // 여행 일정 Id(PK)
  waterPlaceId: number // 물놀이 장소 Id(PK)
  waterPlaceName: string // 물놀이 장소명
  waterPlaceImg: string | null // 물놀이 장소 이미지
  waterPlaceAddr: string // 물놀이 장소 주소
  waterPlaceRating: number | string // 물놀이 장소 평점
  waterPlaceReviewCnt: number // 물놀이 장소 리뷰 개수
  waterPlaceTraffic: number // 물놀이 장소 혼잡도(해당 날짜에 해당 계곡에 가는 인원수)
  tripDate: string // 내가 계획한 여행 날자
  tripPartySize: number // 함께 가는 여행 인원수
  rescueSupplies: {
    lifeBoatNum: number // 인명구조함
    portableStandNum: number // 이동식거치대
    lifeJacketNum: number // 구명조끼
    lifeRingNum: number // 구명환
    rescueRopeNum: number // 구명로프
    rescueRodNum: number // 구조봉
  }
  hasReview: boolean | null // 리뷰 작성 여부(앞으로의 일정은 리뷰를 작성할 수 없음)
}

export interface PreSchedule {
  content: Schedule[]
  pageable: {
    sort: {
      empty: boolean
      unsorted: boolean
      sorted: boolean
    }
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  number: number
  sort: {
    empty: boolean
    unsorted: boolean
    sorted: boolean
  }
  first: boolean
  last: boolean
  size: number
  numberOfElements: number
  empty: boolean
}

export interface User {
  userProfile: UserProfile
  myReviews: MyReview
  myUpcomingTripSchedules: Schedule[]
  myLostFoundBoards: Boards
}
