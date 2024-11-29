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

export interface LostPostComment {
  commentId: number
  commentAuthor: string
  commentContent: string
  commentCreateAt: string
  commentByUser: boolean
  commentAuthorProfile: string
}

export interface LostPost {
  title: string
  content: string
  author: string
  waterPlaceName: string
  waterPlaceAddress: string
  postCreateAt: string
  postImages: string[]
  isResolved: boolean
  isMyBoard: boolean
  boardAuthorProfile: string
  commentCnt: number
  comments: LostPostComment[]
}
