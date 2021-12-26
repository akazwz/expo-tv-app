import { Center, StatusBar, Text, useColorModeValue } from 'native-base'
import { useLayoutEffect } from 'react'

const SettingScreen = ({navigation}) => {
  // set navigation props
  const bg = useColorModeValue('#fafaf9', '#1f2937')
  const color = useColorModeValue('#1f2937', '#fafaf9')
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: bg,
      },
      headerTitleStyle: {
        color: color,
      },
    })
  }, [navigation, bg, color])
  return (
    <Center flex={1} bg={useColorModeValue('warmGray.50', 'coolGray.800')}>
      <StatusBar
        barStyle={useColorModeValue('dark-content', 'light-content')}
        backgroundColor={useColorModeValue('#fafaf9', '#1f2937')}
      />
      <Text
        bold
        fontSize="lg"
        display="flex"
        mb={20}
      >
        Setting Screen
      </Text>
    </Center>
  )
}

export default SettingScreen
