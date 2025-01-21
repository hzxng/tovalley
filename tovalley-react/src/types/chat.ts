export interface ChatRoomList {
  data: {
    content: ChatRoomItem[]
    pageable: {
      sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
      }
      offset: number
      pageSize: number
      pageNumber: number
      paged: boolean
      unpaged: boolean
    }
    first: boolean
    last: boolean
    size: number
    number: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    numberOfElements: number
    empty: boolean
  }
}

export interface ChatRoomItem {
  chatRoomId: number
  chatRoomTitle: string
  otherUserProfileImage: string | null
  otherUserNick: string
  createdChatRoomDate: string
  lastMessageContent: string | null
  unReadMessageCount: number
  lastMessageTime: string | null
}

export interface ChatMessage {
  chatMessageId: string
  chatType: string | null
  imageUrl: string | null
  senderId: number
  myMsg: boolean
  content: string
  createdAt: string
  readCount: number
}

export interface MessageType {
  chatRoomId: number
  chatType: string
  imageName: string
  imageUrl: string
  senderId: number
  content: string
  createdAt: string
  readCount: number
}

export interface MessageListType {
  memberId: number
  chatRoomId: number
  chatMessages: {
    content: ChatMessage[]
    pageable: {
      sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
      }
      offset: number
      pageNumber: number
      pageSize: number
      paged: boolean
      unpaged: boolean
    }
    first: boolean
    last: boolean
    size: number
    number: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    numberOfElements: number
    empty: boolean
  }
}

export interface NotificationType {
  chatRoomId: number
  recipientId: string
  senderNick: string
  createdDate: string
  content: string
  notificationType: string
}

export interface AlarmListType {
  chatNotificationId: number
  chatRoomId: number
  senderNick: string
  createdDate: string
  content: string | null
  hasRead: boolean
}

export interface AlarmListResp {
  data: {
    content: AlarmListType[]
    pageable: {
      sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
      }
      offset: number
      pageNumber: number
      pageSize: number
      paged: boolean
      unpaged: boolean
    }
    first: boolean
    last: boolean
    size: number
    number: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    numberOfElements: number
    empty: boolean
  }
}
