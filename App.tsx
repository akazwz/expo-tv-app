import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeBaseProvider, StorageManager, ColorMode, extendTheme, useColorModeValue } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HomeScreen from './src/screens/HomeScreen'
import SettingScreen from './src/screens/SettingScreen'
import DisplaySetting from './src/screens/Settings/DisplaySetting'
import LanguagesSetting from './src/screens/Settings/LanguagesSetting'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const HomeTab = () => {
  return (
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
  )
}

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
        <Stack.Navigator initialRouteName="Index">
          {/*tab screen*/}
          <Stack.Screen
            name="Index"
            component={HomeTab}
            options={{ headerShown: false }}
          />
          {/*setting group*/}
          <Stack.Group>
            <Stack.Screen
              name="Display"
              component={DisplaySetting}
              options={{
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name="Languages"
              component={LanguagesSetting}
              options={{
                headerTitleAlign: 'center'
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

