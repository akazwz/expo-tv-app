import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import AppLoading from 'expo-app-loading'
import { Asset } from 'expo-asset'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  NativeBaseProvider,
  extendTheme,
  useColorModeValue,
  StorageManager,
  ColorMode,
  Center,
  HStack,
  Spinner,
  Heading,
} from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import i18n from 'i18n-js'
import { store } from './src/redux/store'
import { useAppDispatch, useSystemTheme } from './src/hooks/redux'
import HomeScreen from './src/screens/HomeScreen'
import SettingScreen from './src/screens/SettingScreen'
import DisplaySetting from './src/screens/Settings/DisplaySetting'
import LanguagesSetting from './src/screens/Settings/LanguagesSetting'
import { setLocale, setUseSystemColorMode } from './src/redux/theme'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const HomeTab = () => {
  const [homeBar, setHomeBar] = useState<string>(i18n.t('tabBar.home'))
  const [settingBar, setSettingBar] = useState<string>(i18n.t('tabBar.setting'))

  useEffect(() => {
    setHomeBar(i18n.t('tabBar.home'))
    setSettingBar(i18n.t('tabBar.setting'))
  }, [useSystemTheme().theme.locale])

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
          headerTitleAlign: 'center',
          title: homeBar,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerTitleAlign: 'center',
          title: settingBar,
        }}
      />
    </Tab.Navigator>
  )
}

const Container = () => {
  const [isReady, setIsReady] = useState(false)
  const themeValue = useSystemTheme()
  const dispatch = useAppDispatch()
  const getAsyncStorageUseSystemUi = async() => {
    try {
      const value = await AsyncStorage.getItem('@storage-use-system-color-mode')
      console.log('get use system color mode:' + value)
      return value === 'yes'
    } catch (e) {
      return true
    }
  }

  const getAsyncStorageCustomLocale = async() => {
    try {
      const value = await AsyncStorage.getItem('@storage-custom-locale')
      console.log('get custom locale:' + value)
      return value
    } catch (e) {
      return 'en'
    }
  }

  // set default color mode
  const config = {
    useSystemColorMode: themeValue.theme.useSystemColorMode,
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

  const cacheImages = (images) => {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image)
      } else {
        return Asset.fromModule(image).downloadAsync()
      }
    })
  }

  const preLoadAssets = async() => {
    const images = cacheImages([
      require('./src/assets/images/moon2.jpg'),
      require('./src/assets/images/sun3.jpg'),
    ])
    dispatch(setUseSystemColorMode(await getAsyncStorageUseSystemUi()))
    dispatch(setLocale(await getAsyncStorageCustomLocale()))
    await Promise.all(images)
  }

  i18n.translations = {
    en: require('./src/assets/languges/en.json'),
    zh: require('./src/assets/languges/zh.json'),
  }

  i18n.locale = useSystemTheme().theme.locale

  i18n.fallbacks = true

  if (!isReady) {
    return (
      <AppLoading
        startAsync={preLoadAssets}
        onFinish={() => {setIsReady(true)}}
        onError={() => {console.log('err')}}
      >
        <Center flex={1}>
          <HStack space={2} alignItems="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              Loading
            </Heading>
          </HStack>
        </Center>
      </AppLoading>
    )
  }

  return (
    <NavigationContainer>
      <NativeBaseProvider
        theme={customTheme}
        colorModeManager={themeValue.theme.useSystemColorMode ? null : colorModeManager}
      >
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
                headerTitleAlign: 'center',
                title: i18n.t('setting.display.title'),
              }}
            />
            <Stack.Screen
              name="Languages"
              component={LanguagesSetting}
              options={{
                headerTitleAlign: 'center',
                title: i18n.t('setting.languages.title'),
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

export default function App() {

  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}

