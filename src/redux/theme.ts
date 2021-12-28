import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'

const getIsFollowSystemStorage = async() => {
  try {
    let value = await AsyncStorage.getItem('@storage_is_follow_system')
    return value === 'yes' ? 'yes' : 'no'
  } catch (e) {
    return 'yes'
  }
}

let useSystemColorMode = true
getIsFollowSystemStorage().then((res) => {
  useSystemColorMode = res === 'yes'
}).catch((err) => {
  useSystemColorMode = err === 'yes'
})

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    useSystemColorMode: useSystemColorMode,
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
