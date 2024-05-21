import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

type VideoState = {
  isMuted: boolean
  volume: number
  preVolume: number
}

const initialState: VideoState = {
  isMuted: false,
  volume: 0.5,
  preVolume: 0.5,
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    mute: (state) => {
      state.volume = 0
      state.isMuted = true
    },

    unmute: (state) => {
      state.isMuted = false
      state.volume = state.preVolume
    },

    adjustVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },
  },
})

export const { mute, unmute, adjustVolume } = videoSlice.actions

export const videoReducer = videoSlice.reducer
