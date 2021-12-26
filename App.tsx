import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeBaseProvider, StorageManager, ColorMode, extendTheme, useColorModeValue } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ColorModeExample from './src/Screens/ColorModeExample'
import HomeScreen from './src/Screens/HomeScreen'
import SettingScreen from './src/Screens/SettingScreen'

const Tab = createBottomTabNavigator()

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
    <NavigationContainer>
      <NativeBaseProvider theme={customTheme} colorModeManager={colorModeManager}>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            switch (route.name) {
              case 'Home':
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home-outline'
                break
              case 'Video':
                iconName = focused
                  ? 'ios-videocam'
                  : 'ios-videocam-outline'
                break
              case 'Setting':
                iconName = focused
                  ? 'ios-settings'
                  : 'ios-settings-outline'
                break
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {
            backgroundColor: useColorModeValue('#fafaf9', '#1f2937'),
          },
        })}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
          />
          <Tab.Screen
            name="Setting"
            component={SettingScreen}
          />
        </Tab.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

