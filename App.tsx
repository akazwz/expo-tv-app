import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeBaseProvider, StorageManager, ColorMode, extendTheme, useColorModeValue } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HomeScreen from './src/screens/HomeScreen'
import SettingScreen from './src/screens/SettingScreen'

const Tab = createBottomTabNavigator()


export default function App() {
  // set default color mode
  const config = {
    useSystemColorMode: true,
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
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {
            backgroundColor: useColorModeValue('#fafaf9', '#18181b'),
          },
        })}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitleAlign: 'center'
            }}
          />
          <Tab.Screen
            name="Setting"
            component={SettingScreen}
            options={{
              headerTitleAlign: 'center'
            }}
          />
        </Tab.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

