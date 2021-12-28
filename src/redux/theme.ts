import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as  Localization from 'expo-localization'

const lang = Localization.locale.slice(0, 2)

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    useSystemColorMode: true,
    localeCode: lang,
  },
  reducers: {
    setUseSystemColorMode: (state, actions: PayloadAction<boolean>) => {
      state.useSystemColorMode = actions.payload
    },
    setLocale: (state, actions: PayloadAction<string>) => {
      state.localeCode = actions.payload
    },
  }
})

export const { setUseSystemColorMode, setLocale } = themeSlice.actions

export const theme = (state: {
  theme: {
    useSystemColorMode: boolean,
    localeCode: string,
  }
}) => state

export default themeSlice.reducer
