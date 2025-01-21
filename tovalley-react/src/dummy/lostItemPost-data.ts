import { LostPost } from 'types/lost-found'

export const data1: LostPost = {
  title: '금오동천에서 키링 봤습니다',
  content: '채팅 주세요',
  author: 'yunej',
  waterPlaceName: '금오동천',
  waterPlaceAddress: '경상북도 칠곡군 북삼읍 숭오리 산31-10',
  postCreateAt: '2024-05-06 19:28:16',
  postImages: ['/img/dummy/키링.jpg'],
  isResolved: false,
  isMyBoard: false,
  boardAuthorProfile: '/img/dummy/profile-img4.jpg',
  commentCnt: 0,
  comments: [],
}

export const data2: LostPost = {
  title: '금오계곡에서 찾았어요',
  content: '아이폰 15 입니다',
  author: 'yj2727',
  waterPlaceName: '금오동천',
  waterPlaceAddress: '경상북도 칠곡군 북삼읍 숭오리 산31-10',
  postCreateAt: '2024-05-05 21:19:49',
  postImages: ['/img/dummy/아이폰.jpg'],
  isResolved: false,
  isMyBoard: true,
  boardAuthorProfile: '/img/dummy/profile-img2.jpg',
  commentCnt: 1,
  comments: [
    {
      commentId: 24,
      commentAuthor: 'yunej',
      commentContent: '안녕하세요',
      commentCreateAt: '2024-05-06 19:28:28',
      commentByUser: false,
      commentAuthorProfile: '/img/dummy/profile-img4.jpg',
    },
  ],
}

export const data3: LostPost = {
  title: '핸드폰 잃어버리신 분 채팅주세요',
  content: '관악산 계곡에서 주웠어요~',
  author: 'hzei27',
  waterPlaceName: '관악산계곡어린이물놀이장-신림계곡지구',
  waterPlaceAddress: '서울특별시 관악구 신림동 210',
  postCreateAt: '2024-05-05 21:16:13',
  postImages: [],
  isResolved: false,
  isMyBoard: false,
  boardAuthorProfile: '/img/dummy/profile-img3.jpg',
  commentCnt: 2,
  comments: [
    {
      commentId: 19,
      commentAuthor: 'yj2727',
      commentContent: '제 거 같아요 ㅜㅜ',
      commentCreateAt: '2024-05-05 21:22:14',
      commentByUser: true,
      commentAuthorProfile: '/img/dummy/profile-img2.jpg',
    },
    {
      commentId: 26,
      commentAuthor: 'yj2727',
      commentContent: '채팅 확인해주시겠어요??',
      commentCreateAt: '2024-05-05 21:24:06',
      commentByUser: true,
      commentAuthorProfile: '/img/dummy/profile-img2.jpg',
    },
  ],
}

export const data4: LostPost = {
  title: '튜브 보신 분 있나요?',
  content: '채팅 부탁드려요',
  author: '계곡탐험가',
  waterPlaceName: '가평천-까치유원지앞',
  waterPlaceAddress: '경기도 가평군 가평읍 개곡리 836-3',
  postCreateAt: '2024-05-05 21:15:14',
  postImages: [],
  isResolved: false,
  isMyBoard: false,
  boardAuthorProfile: null,
  commentCnt: 3,
  comments: [
    {
      commentId: 15,
      commentAuthor: 'yj2727',
      commentContent: '저 본 거 같아요',
      commentCreateAt: '2024-05-05 21:20:56',
      commentByUser: true,
      commentAuthorProfile: '/img/dummy/profile-img2.jpg',
    },
    {
      commentId: 16,
      commentAuthor: 'yj2727',
      commentContent: '노란색 맞으세요??',
      commentCreateAt: '2024-05-05 21:20:58',
      commentByUser: true,
      commentAuthorProfile: '/img/dummy/profile-img2.jpg',
    },
    {
      commentId: 17,
      commentAuthor: 'yj2727',
      commentContent: '맞으시면 채팅 보내주세요',
      commentCreateAt: '2024-05-05 21:21:04',
      commentByUser: true,
      commentAuthorProfile: '/img/dummy/profile-img2.jpg',
    },
  ],
}

export const data5: LostPost = {
  title: '관악산 계곡에서 키링 보신분 있나요?',
  content: '쿠로미 키링입니다 ㅜㅜ',
  author: 'yj2727',
  waterPlaceName: '관악산계곡어린이물놀이장-신림계곡지구',
  waterPlaceAddress: '서울특별시 관악구 신림동 210',
  postCreateAt: '2024-05-05 21:06:14',
  postImages: [],
  isResolved: false,
  isMyBoard: true,
  boardAuthorProfile: '/img/dummy/profile-img2.jpg',
  commentCnt: 0,
  comments: [],
}

export const data6: LostPost = {
  title: '관악산 계곡에서 오리발 찾아요',
  content: '이렇게 생긴 거 보신 분 있으신가요?',
  author: 'yunej',
  waterPlaceName: '관악산계곡어린이물놀이장-신림계곡지구',
  waterPlaceAddress: '서울특별시 관악구 신림동 210',
  postCreateAt: '2024-05-05 20:57:35',
  postImages: ['/img/dummy/오리발.png'],
  isResolved: true,
  isMyBoard: false,
  boardAuthorProfile: '/img/dummy/profile-img4.jpg',
  commentCnt: 2,
  comments: [
    {
      commentId: 22,
      commentAuthor: 'yj2727',
      commentContent: '저도 저번에 잃어버렸는데 ~ ㅜㅜ',
      commentCreateAt: '2024-05-05 21:25:27',
      commentByUser: true,
      commentAuthorProfile: '/img/dummy/profile-img2.jpg',
    },
    {
      commentId: 23,
      commentAuthor: 'hzei27',
      commentContent: '저 본 것 같아요',
      commentCreateAt: '2024-05-06 19:16:13',
      commentByUser: false,
      commentAuthorProfile: '/img/dummy/profile-img3.jpg',
    },
  ],
}
