import { createSlice } from '@reduxjs/toolkit'

interface ValleyType {
  value: {
    name: string
    addr: string
    type: string
    review: number
    reviewCnt: number
  } | null
}

const initialState: ValleyType = {
  value: null,
}

const clientSlice = createSlice({
  name: 'valley',
  initialState,
  reducers: {
    newValley(state, action) {
      state.value = action.payload
    },
  },
})

export default clientSlice.reducer
export const { newValley } = clientSlice.actions
