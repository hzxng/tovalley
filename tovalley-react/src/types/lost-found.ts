export interface RecentPostType {
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

export interface LostList {
  id: number
  title: string
  content: string
  author: string
  category: string
  commentCnt: number
  postCreateAt: string
  postImage: string
}

export interface PlaceName {
  waterPlaceId: number
  waterPlaceName: string
  address: string
}
