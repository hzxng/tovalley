import { createSlice } from '@reduxjs/toolkit'

const chatRoomIdSlice = createSlice({
  name: 'chatRoomId',
  initialState: { value: null },
  reducers: {
    enterChatRoom(state, action) {
      state.value = action.payload
    },
  },
})

export default chatRoomIdSlice.reducer
export const { enterChatRoom } = chatRoomIdSlice.actions
