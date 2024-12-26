import { createSlice } from '@reduxjs/toolkit'

const notificationViewSlice = createSlice({
  name: 'notificationView',
  initialState: { value: false },
  reducers: {
    setNotificationView(state, action) {
      state.value = action.payload
    },
  },
})

export default notificationViewSlice.reducer
export const { setNotificationView } = notificationViewSlice.actions
