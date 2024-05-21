import { configureStore } from '@reduxjs/toolkit'
import { modalReducer } from '@/services/store/modal/modalSlice'
import { videoReducer } from '@/services/store/video/videoSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    video: videoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
