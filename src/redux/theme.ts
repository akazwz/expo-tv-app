import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    useSystemColorMode: true,
  },
  reducers: {
    setUseSystemColorMode: (state, actions: PayloadAction<boolean>) => {
      state.useSystemColorMode = actions.payload
    },
  }
})

export const { setUseSystemColorMode } = themeSlice.actions

export const theme = (state: { theme: { useSystemColorMode: boolean } }) => state

export default themeSlice.reducer
