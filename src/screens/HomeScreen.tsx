import { useLayoutEffect } from 'react'
import {
  Center,
  StatusBar,
  Text,
  useColorModeValue
} from 'native-base'
import i18n from 'i18n-js'

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
  return (
    <Center
      flex={1}
      bg={bgMain}
      safeArea
      safeAreaTop={0}
    >
      <StatusBar
        barStyle={useColorModeValue('dark-content', 'light-content')}
        backgroundColor={bgMain}
      />
      <Text
        bold
        fontSize="lg"
        display="flex"
        mb={20}
      >
        {i18n.t('home.title')}
      </Text>
    </Center>
  )
}

export default HomeScreen
