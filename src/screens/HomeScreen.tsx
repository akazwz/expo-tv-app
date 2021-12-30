import { useLayoutEffect, useRef } from 'react'
import {
  AspectRatio,
  Box,
  ScrollView,
  StatusBar,
  useColorModeValue
} from 'native-base'
import i18n from 'i18n-js'
import { Video } from 'expo-av'

const HomeScreen = ({ navigation }) => {
  // set navigation props
  const bgMain = useColorModeValue('#f5f5f4', '#000000')
  const bgSecond = useColorModeValue('#ffffff', '#18181b')
  const color = useColorModeValue('#27272a', '#ffffff')
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: bgMain,
      },
      headerTitleStyle: {
        color: color,
      },
    })
  }, [navigation, bgMain, color])

  const videoRef = useRef(null)

  return (
    <Box
      flex={1}
      bg={bgMain}
      safeArea
      safeAreaTop={0}
    >
      <StatusBar
        barStyle={useColorModeValue('dark-content', 'light-content')}
        backgroundColor={bgMain}
      />
      <ScrollView>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Video
            source={{ uri: 'http://39.134.115.163:8080/PLTV/88888910/224/3221225618/index.m3u8' }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
          />
        </AspectRatio>
      </ScrollView>
    </Box>
  )
}

export default HomeScreen
