import { Button, Center, StatusBar, Text, useColorMode, useColorModeValue } from 'native-base'
import { useLayoutEffect } from 'react'

const DisplaySetting = ({navigation}) => {
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
    <>
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
    </>
  )
}

export default DisplaySetting
