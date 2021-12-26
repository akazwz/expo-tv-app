import {
  Container,
  StatusBar,
  Text,
  useColorModeValue,
  Spacer,
  Center,
  Box,
  Pressable,
  HStack,
  Icon,
  Square
} from 'native-base'
import { useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'

const SettingScreen = ({ navigation }) => {
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
    <Box
      flex={1}
      bg={bgMain}
    >
      <StatusBar
        barStyle={useColorModeValue('dark-content', 'light-content')}
        backgroundColor={bgMain}
      />
      <Pressable
        onPress={() => {console.log('You touched me')}}
        bg={bgSecond}
      >
        <Box
          pl="4"
          pr="5"
          py="2"
        >
          <HStack alignItems="center" space={3}>
            <Square bg={useColorModeValue('lightBlue.500', 'darkBlue.500')} size="xs" rounded="lg">
              <Icon
                as={Ionicons}
                name="ios-text"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                size="md"
              />
            </Square>
            <Text bold>
              Display & Performance
            </Text>
            <Spacer/>
            <Icon
              as={Ionicons}
              name="ios-chevron-forward"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              size="xs"
            />
          </HStack>
        </Box>
      </Pressable>
    </Box>
  )
}

export default SettingScreen
