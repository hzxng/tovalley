export interface DailyNationalWeather {
  clouds: number
  dayFeelsLike: number
  humidity: number
  windSpeed: number
  region: string
  weatherIcon: string
  weatherDesc: string
  minTemp: number
  maxTemp: number
  rainPrecipitation: number
}

export interface NationalWeather {
  weatherDate: string
  dailyNationalWeather: DailyNationalWeather[]
}

export interface WeatherAlerts {
  weatherAlertType: string
  title: string
  announcementTime: string
  effectiveTime: string
  content: string
}

export interface WeatherPreAlerts {
  announcementTime: string
  title: string
  weatherAlertType: string
  contents: {
    content: string
  }[]
}

export interface WeatherAlert {
  weatherAlerts: WeatherAlerts[]
  weatherPreAlerts: WeatherPreAlerts[]
}

export interface AccidentCountPerMonth {
  month: number
  deathCnt: number
  disappearanceCnt: number
  injuryCnt: number
}

export interface AccidentCountDto {
  accidentCountPerMonth: AccidentCountPerMonth[]
  province: string
  totalDeathCnt: number
  totalDisappearanceCnt: number
  totalInjuryCnt: number
}

export interface NationalPopularWaterPlaces {
  waterPlaceId: number
  waterPlaceName: string
  waterPlaceImageUrl: string | null
  location: string
  rating: number
  reviewCnt: number
}

export interface RecentLostPostType {
  lostFoundBoardId: number
  lostFoundBoardCategory: string
  lostFoundBoardTitle: string
  lostFoundBoardContent: string
  lostFoundBoardCreatedAt: string
}

export interface RecentReviewType {
  reviewId: number
  reviewRating: number
  reviewContent: string
  reviewCreatedAt: string
  waterPlaceId: number
}

export interface MainData {
  nationalWeather: NationalWeather[]
  weatherAlert: WeatherAlert
  accidentCountDto: AccidentCountDto
  nationalPopularWaterPlaces: NationalPopularWaterPlaces[]
  recentReviews: RecentReviewType[]
  recentLostFoundBoards: RecentLostPostType[]
}
