import { createSlice } from '@reduxjs/toolkit'

type ModalState = {
  isShow: boolean
}

const initialState: ModalState = {
  isShow: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => {
      state.isShow = true
    },

    close: (state) => {
      state.isShow = false
    },
  },
})

export const { open, close } = modalSlice.actions

export default modalSlice.reducer
