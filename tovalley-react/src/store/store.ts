import { combineReducers, configureStore } from '@reduxjs/toolkit'
import clientSlice from './client/clientSlice'
import chatViewSlice from './chat/chatViewSlice'
import chatRoomIdSlice from './chat/chatRoomIdSlice'
import notificationSlice from './notification/notificationSlice'
import notificationViewSlice from './notification/notificationViewSlice'
import { persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import subscriptionSlice from './chat/subscriptionSlice'
import chatRoomNameSlice from './chat/chatRoomNameSlice'
import valleySlice from './valley/valleySlice'

const rootReducer = combineReducers({
  client: clientSlice,
  notification: notificationSlice,
  view: chatViewSlice,
  chatRoomId: chatRoomIdSlice,
  notificationView: notificationViewSlice,
  subscription: subscriptionSlice,
  chatRoomName: chatRoomNameSlice,
  valley: valleySlice,
})

const persistConfig = {
  key: 'login',
  storage: storageSession,
  whitelist: ['login'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  // 기본 값이 true지만 배포할때 코드를 숨기기 위해서 false로 변환하기 쉽게 설정에 넣어놨다.
  devTools: true,
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
