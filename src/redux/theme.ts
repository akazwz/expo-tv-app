import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as  Localization from 'expo-localization'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    useSystemColorMode: true,
    locale: Localization.locale,
  },
  reducers: {
    setUseSystemColorMode: (state, actions: PayloadAction<boolean>) => {
      state.useSystemColorMode = actions.payload
    },
    setLocale: (state, actions: PayloadAction<string>) => {
      state.locale = actions.payload
    },
  }
})

export const { setUseSystemColorMode, setLocale } = themeSlice.actions

export const theme = (state: {
  theme: {
    useSystemColorMode: boolean,
    locale: string,
  }
}) => state

export default themeSlice.reducer
