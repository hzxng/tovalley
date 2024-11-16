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
