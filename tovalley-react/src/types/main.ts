import { RecentPostType, RecentReviewType } from '../typings/db'

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

interface WeatherAlerts {
  weatherAlertType: string
  title: string
  announcementTime: string
  effectiveTime: string
  content: string
}

interface WeatherPreAlerts {
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

interface AccidentCountPerMonth {
  month: number
  deathCnt: number
  disappearanceCnt: number
  injuryCnt: number
}

interface AccidentCountDto {
  accidentCountPerMonth: AccidentCountPerMonth[]
  province: string
  totalDeathCnt: number
  totalDisappearanceCnt: number
  totalInjuryCnt: number
}

interface NationalPopularWaterPlaces {
  waterPlaceId: number
  waterPlaceName: string
  waterPlaceImageUrl: string
  location: string
  rating: number
  reviewCnt: number
}

export interface MainData {
  nationalWeather: NationalWeather[]
  weatherAlert: WeatherAlert
  accidentCountDto: AccidentCountDto
  nationalPopularWaterPlaces: NationalPopularWaterPlaces[]
  recentReviews: RecentReviewType[]
  recentLostFoundBoards: RecentPostType[]
}
