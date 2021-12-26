import {
  Box,
  Divider,
  HStack,
  Icon,
  Pressable,
  Square,
  StatusBar,
  Text,
  Spacer,
  useColorModeValue
} from 'native-base'
import { useLayoutEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export type settingOptions = {
  iconBg: string
  iconName: string
  title: string
  route: string
}

const SettingScreen = ({ navigation }) => {
  // set navigation props
  const bgMain = useColorModeValue('#f5f5f4', '#000000')
  const bgSecond = useColorModeValue('#ffffff', '#18181b')
  const color = useColorModeValue('#27272a', '#ffffff')

  const [options] = useState<settingOptions[]>([
    {
      iconBg: 'lightBlue.500',
      iconName: 'ios-text',
      title: 'Display & Performance',
      route: 'setting',
    },
    {
      iconBg: 'pink.500',
      iconName: 'ios-language',
      title: 'Languages',
      route: 'languages',
    }
  ])

  const OptionsList = () => {
    const list = options.map((item: settingOptions) => {
      return (
        <Pressable
          key={item.route}
          onPress={() => {console.log('You touched me')}}
          bg={bgSecond}
        >
          <Box
            pl="15px"
            pr="15px"
            py="10px"
          >
            <HStack alignItems="center" space="10px">
              <Square bg={item.iconBg} size="30px" rounded="lg">
                <Icon
                  as={Ionicons}
                  name={item.iconName}
                  color="coolGray.800"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  size="20px"
                />
              </Square>
              <Text bold>
                {item.title}
              </Text>
              <Spacer />
              <Icon
                as={Ionicons}
                name="ios-chevron-forward"
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}
                size="xs"
              />
            </HStack>
          </Box>
          <Divider ml="55px" />
        </Pressable>
      )
    })
    return <>{list}</>
  }

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
      <OptionsList />
    </Box>
  )
}

export default SettingScreen
