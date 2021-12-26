import { useLayoutEffect } from 'react'
import {
  Center,
  StatusBar,
  Text,
  Button,
  useColorMode,
  useColorModeValue
} from 'native-base'

const ColorModeExample = ({ navigation }) => {
  const { toggleColorMode } = useColorMode()
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
      <Text fontSize="lg" display="flex" mb={20}>
        The active color mode is {' '}
        <Text bold fontSize="18px">
          {useColorModeValue('Light', 'Dark')}
        </Text>
      </Text>
      <Button onPress={toggleColorMode}>Toggle</Button>
    </Center>
  )
}

export default ColorModeExample
