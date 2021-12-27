import { useState } from 'react'
import AppLoading from 'expo-app-loading'
import { Image } from 'react-native'
import { Asset } from 'expo-asset'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  NativeBaseProvider,
  StorageManager,
  ColorMode,
  extendTheme,
  useColorModeValue,
  Progress,
  Center, HStack, Spinner, Heading
} from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
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
  const [isReady, setIsReady] = useState(false)

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
    await Promise.all(images)
  }

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

