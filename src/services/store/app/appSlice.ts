import { createSlice } from '@reduxjs/toolkit'

type AppState = {
  isBlur: boolean
}

const initialState: AppState = {
  isBlur: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    focus: (state) => {
      state.isBlur = false
    },
    blur: (state) => {
      state.isBlur = true
    },
  },
})

export const { focus, blur } = appSlice.actions

export const appReducer = appSlice.reducer
