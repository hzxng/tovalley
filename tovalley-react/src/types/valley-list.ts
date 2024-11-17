import { Paging } from './paging'

export interface ValleyItemType {
  waterPlaceId: number
  waterPlaceName: string
  waterPlaceAddr: string
  waterPlaceRating: number | string
  waterPlaceReviewCnt: number | string
  managementType: string
  waterPlaceCategory: string
  waterPlaceImageUrl: string | null
}

export interface ValleyList extends Paging {
  content: ValleyItemType[]
}
