import { configureStore } from '@reduxjs/toolkit'
import { modalReducer } from '@/services/store/modal/modalSlice'
import { videoReducer } from '@/services/store/video/videoSlice'
import { appReducer } from '@/services/store/app/appSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    video: videoReducer,
    app: appReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
