import React from 'react'
import { NativeBaseProvider, StorageManager, ColorMode, extendTheme } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  // set default color mode
  const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  }
  const customTheme = extendTheme({ config })

  // persisting the color mode
  const colorModeManager: StorageManager = {
    get: async() => {
      try {
        let val = await AsyncStorage.getItem('@color-mode')
        return val === 'dark' ? 'dark' : 'light'
      } catch (e) {
        return 'light'
      }
    },
    set: async(value: ColorMode) => {
      try {
        await AsyncStorage.setItem('@color-mode', value)
      } catch (e) {
        console.log(e)
      }
    },
  }

  return (
    <NativeBaseProvider theme={customTheme} colorModeManager={colorModeManager}>
    </NativeBaseProvider>
  )
}

