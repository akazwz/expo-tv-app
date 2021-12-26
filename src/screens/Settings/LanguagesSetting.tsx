import { useLayoutEffect } from 'react'
import {
  Center,
  StatusBar,
  Text,
  useColorMode,
  useColorModeValue
} from 'native-base'

const LanguagesSetting = ({ navigation }) => {
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

  const { toggleColorMode } = useColorMode()

  return (
    <Center flex={1} bg={bgMain}>
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
        Languages Setting Screen
      </Text>
    </Center>
  )
}

export default LanguagesSetting
