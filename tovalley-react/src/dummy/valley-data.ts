export const data = {
  waterPlaceWeathers: [
    // 물놀이 장소 날씨 리스트(5일)
    {
      weatherDate: '2024-08-14', // 날짜
      climateIcon: '10d', // 날씨 아이콘 Id
      climateDescription: '실 비', // 날씨 상세설명
      lowestTemperature: 24.08, // 일일 최저 온도
      highestTemperature: 26.29, // 일일 최고 온도
      humidity: 85, // 습도
      windSpeed: 3.56, // 풍속
      rainPrecipitation: 0.24, // 강수량
      clouds: 73, // 흐림 정도
      dayFeelsLike: 25.28, // 주간 체감 온도
    },
    {
      weatherDate: '2024-08-15',
      climateIcon: '03d',
      climateDescription: '구름조금',
      lowestTemperature: 25.53,
      highestTemperature: 27.82,
      humidity: 80,
      windSpeed: 1.58,
      rainPrecipitation: 0.0,
      clouds: 37,
      dayFeelsLike: 26.38,
    },
    {
      weatherDate: '2024-08-16',
      climateIcon: '01d',
      climateDescription: '맑음',
      lowestTemperature: 27.53,
      highestTemperature: 34.82,
      humidity: 80,
      windSpeed: 1.58,
      rainPrecipitation: 0.0,
      clouds: 37,
      dayFeelsLike: 26.38,
    },
    {
      weatherDate: '2024-08-17',
      climateIcon: '01d',
      climateDescription: '맑음',
      lowestTemperature: 27.53,
      highestTemperature: 33.82,
      humidity: 80,
      windSpeed: 1.58,
      rainPrecipitation: 0.0,
      clouds: 37,
      dayFeelsLike: 26.38,
    },
    {
      weatherDate: '2024-08-18',
      climateIcon: '03d',
      climateDescription: '구름조금',
      lowestTemperature: 25.53,
      highestTemperature: 33.82,
      humidity: 80,
      windSpeed: 1.58,
      rainPrecipitation: 0.0,
      clouds: 37,
      dayFeelsLike: 26.38,
    },
  ],
  waterPlaceDetails: {
    waterPlaceImage: null, // 물놀이 장소 이미지 Url
    waterPlaceName: '명곡저수지 상류계곡', // 물놀이 장소 명칭
    latitude: '35.42507209841541', // 위도
    longitude: '129.19863150208593', // 경도
    managementType: '일반지역', // 관리유형(일반지역, 중점관리지역)
    detailAddress: '경상남도 양산시 서창동 명동 산20-1 명곡저수지 상류계곡', // 주소 + 세부지명(세부지명은 null, 즉 빈문자열일 수 있음)
    town: '서창동', // 읍면 (null이면 빈문자열)
    annualVisitors: '0.5', // 연평균 총 이용객 수(천명)
    safetyMeasures: '', // 안전조치 사항(null일 경우 빈문자열)
    waterPlaceSegment: 320, // 물놀이구간(m)
    dangerSegments: '', // 위험구역구간(null일 경우 빈문자열)
    dangerSignboardsNum: '', // 위험구역 설정 안내표지판(합계, null일 경우 빈문자열)
    deepestDepth: 6, // 수심(깊은곳)
    avgDepth: 3, // 평균 수심
    waterTemperature: 27.8, // 계곡 수온(°C)
    bod: 3.8, // BOD(mg/L)
    turbidity: 7.9, // 탁도(NTU)
    waterQualityReviews: {
      // 사용자가 평가한 계곡 수질
      깨끗해요: 3,
      괜찮아요: 1,
      더러워요: 2,
    },
  },
  rescueSupplies: {
    // 구조용품 현황
    lifeBoatNum: 5, // 인명구조함(null일 경우 -1)
    portableStandNum: 0, // 이동식거치대(null일 경우 -1)
    lifeJacketNum: 5, // 구명조끼(null일 경우 -1)
    lifeRingNum: 5, // 구명환(null일 경우 -1)
    rescueRopeNum: 5, // 구명로프(null일 경우 -1)
    rescueRodNum: 0, // 구조봉(null일 경우 -1)
  },
  accidents: {
    // 최근 5년간 사건사고 수
    totalDeathCnt: 0,
    totalDisappearanceCnt: 3,
    totalInjuryCnt: 4,
  },
  tripPlanToWaterPlace: {
    // 해당 계곡의 여행 계획자 수
    '2025-01-03': 5, // 날짜 : 인원수
    '2025-01-15': 10,
    '2025-01-20': 15,
    '2025-01-22': 16,
    '2025-02-11': 10,
    '2025-02-20': 10,
    '2025-02-25': 16,
    '2025-02-26': 10,
    '2025-03-03': 10,
    '2025-03-05': 16,
    '2025-03-27': 10,
    '2025-04-20': 10,
    '2025-04-25': 16,
    '2025-05-05': 10,
    '2025-05-06': 16,
    '2025-05-08': 31,
    '2025-05-12': 16,
    '2025-05-15': 10,
    '2025-05-20': 10,
    '2025-06-08': 10,
    '2025-06-12': 10,
    '2025-06-15': 10,
    '2025-06-20': 16,
    '2025-06-26': 31,
    '2025-06-29': 16,
    '2025-07-03': 10,
    '2025-07-08': 16,
    '2025-07-10': 10,
    '2025-07-12': 10,
    '2025-07-15': 10,
    '2025-07-18': 16,
    '2025-07-20': 16,
    '2025-07-21': 31,
    '2025-07-26': 31,
    '2025-07-27': 46,
    '2025-07-28': 31,
    '2025-07-30': 10,
    '2025-08-01': 16,
    '2025-08-04': 16,
    '2025-08-10': 31,
    '2025-08-12': 31,
    '2025-08-15': 46,
    '2025-08-16': 31,
    '2025-08-17': 16,
    '2025-08-18': 31,
    '2025-08-21': 31,
    '2025-08-24': 46,
    '2025-08-25': 10,
    '2025-08-27': 10,
  },
  reviewRespDto: {
    waterPlaceRating: 3.2, // 물놀이 장소 평점
    reviewCnt: 6, // 물놀이 장소 리뷰수
    ratingRatio: {
      // 평점 비율
      '1': 1, // 평점: 인원수
      '2': 1,
      '3': 1,
      '4': 2,
      '5': 1,
    },
    reviews: {
      // 해당 계곡의 리뷰(페이징)
      content: [
        // 리뷰 리스트 (5개)
        {
          reviewId: 6, // 리뷰 아이디
          memberProfileImg: '/img/dummy/profile-img4.jpg', // 작성자 프로필 이미지
          nickname: '계곡탐험가', // 작성자 닉네임
          rating: 5, // 작성자가 작성한 평점
          createdReviewDate: '2024-08-10 14:43:23', // 작성 시간
          content: '좋아요~', // 리뷰 작성 내용
          reviewImages: [
            // 리뷰 이미지 Url 리스트
            '/img/dummy/계곡이미지15.jpg',
            '/img/dummy/계곡이미지16.jpg',
            '/img/dummy/계곡이미지17.jpg',
            '/img/dummy/계곡이미지18.jpg',
            '/img/dummy/계곡이미지19.jpg',
            '/img/dummy/계곡이미지20.jpg',
          ],
          waterQuality: '깨끗해요',
          isMyReview: false,
        },
        {
          reviewId: 2,
          memberProfileImg: null,
          nickname: 'jeong',
          rating: 3,
          createdReviewDate: '2024-08-08 12:40:11',
          content: '물이 맑아요~',
          reviewImages: ['/img/dummy/계곡이미지14.jpg'],
          waterQuality: '깨끗해요',
          isMyReview: false,
        },
        {
          reviewId: 3,
          memberProfileImg: '/img/dummy/profile-img1.jpg',
          nickname: 'mom',
          rating: 4,
          createdReviewDate: '2024-07-29 19:22:05',
          content: '가족들이랑 오기 좋아요~',
          reviewImages: [
            '/img/dummy/계곡이미지9.jpg',
            '/img/dummy/계곡이미지8.jpg',
          ],
          waterQuality: '괜찮아요',
          isMyReview: false,
        },
        {
          reviewId: 4,
          memberProfileImg: '/img/dummy/profile-img3.jpg',
          nickname: 'user1',
          rating: 4,
          createdReviewDate: '2024-07-22 13:01:29',
          content: '잘 놀고 갑니다',
          reviewImages: [],
          waterQuality: '깨끗해요',
          isMyReview: false,
        },
      ],
      pageable: {
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
        offset: 0,
        pageNumber: 0,
        pageSize: 5,
        paged: true,
        unpaged: false,
      },
      last: false,
      totalPages: 2,
      totalElements: 6,
      first: true,
      sort: {
        empty: false,
        unsorted: false,
        sorted: true,
      },
      number: 0,
      size: 5,
      numberOfElements: 5,
      empty: false,
    },
  },
}
