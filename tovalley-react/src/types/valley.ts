interface WaterPlaceWeathers {
  weatherDate: string
  climateIcon: string
  climateDescription: string
  lowestTemperature: number
  highestTemperature: number
  humidity: number
  windSpeed: number
  rainPrecipitation: number
  clouds: number
  dayFeelsLike: number
}

interface WaterQualityReviews {
  깨끗해요: number
  괜찮아요: number
  더러워요: number
}

interface WaterPlaceDetails {
  waterPlaceImage: string | null
  waterPlaceName: string
  latitude: string
  longitude: string
  managementType: string
  detailAddress: string
  town: string
  annualVisitors: string
  safetyMeasures: number | string
  waterPlaceSegment: number
  dangerSegments: string
  dangerSignboardsNum: number | string
  deepestDepth: number
  avgDepth: number
  waterTemperature: number
  bod: number
  turbidity: number
  waterQualityReviews: WaterQualityReviews
}

interface RescueSupplies {
  lifeBoatNum: number
  portableStandNum: number
  lifeJacketNum: number
  lifeRingNum: number
  rescueRopeNum: number
  rescueRodNum: number
}

interface Accidents {
  totalDeathCnt: number
  totalDisappearanceCnt: number
  totalInjuryCnt: number
}

export interface TripPeopleCnt {
  [key: string]: number
}

interface ReviewContent {
  reviewId: number
  memberProfileImg: string | null
  nickname: string
  rating: number
  createdReviewDate: string
  content: string
  reviewImages: string[]
  waterQuality: string
  isMyReview: boolean
}

interface ReviewRespDto {
  waterPlaceRating: number
  reviewCnt: number
  ratingRatio: {
    '1': number
    '2': number
    '3': number
    '4': number
    '5': number
  }
  reviews: {
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
    last: boolean
    totalPages: number
    totalElements: number
    first: boolean
    sort: {
      empty: boolean
      unsorted: boolean
      sorted: boolean
    }
    number: number
    size: number
    numberOfElements: number
    empty: boolean
  }
}

export interface ValleyData {
  waterPlaceWeathers: WaterPlaceWeathers[]
  waterPlaceDetails: WaterPlaceDetails
  rescueSupplies: RescueSupplies
  accidents: Accidents
  tripPlanToWaterPlace: TripPeopleCnt
  reviewRespDto: ReviewRespDto
}
