import { useLayoutEffect } from 'react'
import {
  Actionsheet,
  Box,
  Flex,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  VStack,
  Spacer,
  useColorModeValue,
  useDisclose,
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'

export type Language = {
  name: string,
  transName: string,
  code: string,
}

const LanguagesSetting = ({ navigation }) => {
  // set navigation props
  const bgMain = useColorModeValue('#f5f5f4', '#000000')
  const bgSecond = useColorModeValue('#ffffff', '#18181b')
  const color = useColorModeValue('#27272a', '#ffffff')
  const colorFontSecond = useColorModeValue('#5c5c60', '#adaaaa')
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

  const { isOpen, onOpen, onClose } = useDisclose()

  const LanguagesOptions = () => {
    const languages: Language[] = [
      {
        name: '中文',
        transName: 'Chinese',
        code: 'ZH',
      },
      {
        name: 'English',
        transName: 'English',
        code: 'EN',
      },
    ]

    const list = languages.map((item) => {
      return (
        <Actionsheet.Item
          key={item.code}
          alignItems="center"
          justifyContent="center"
        >
          <HStack>
            <VStack w={Platform.OS === 'web' ? '45vw' : '50%'}>
              <Text>
                {item.name}
              </Text>
              <Text sub>
                {item.transName}
              </Text>
            </VStack>
            <VStack w={Platform.OS === 'web' ? '45vw' : '50%'} alignItems="flex-end" justifyContent="center">
              {item.code === 'ZH'
                ? <Icon
                  as={Ionicons}
                  name="ios-checkmark"
                  color="green.500"
                  size="md"
                />
                : null
              }
            </VStack>
          </HStack>
        </Actionsheet.Item>
      )
    })

    return (
      <>{list}</>
    )
  }

  return (
    <>
      <Box
        flex={1}
        bg={bgMain}
      >
        <StatusBar
          barStyle={useColorModeValue('dark-content', 'light-content')}
          backgroundColor={bgMain}
        />
        <ScrollView mt={1}>
          <Pressable w="100%" alignItems="center" onPress={onOpen}>
            <Box w="90%" bg={bgSecond} rounded="lg">
              <Flex flexDirection="row" alignItems="center" textAlign="left" p={3}>
                <Text>APP Language</Text>
                <Spacer />
                <Text color={colorFontSecond}>Chinese</Text>
                <Icon
                  as={Ionicons}
                  name="ios-chevron-forward"
                  color={colorFontSecond}
                  size="xs"
                />
              </Flex>
            </Box>
          </Pressable>
          <Actionsheet
            isOpen={isOpen}
            onClose={onClose}
            safeArea
            safeAreaTop={0}
            safeAreaBottom={0}
          >
            <Actionsheet.Content>
              <Box w="100%" justifyContent="center" alignItems="center">
                <Text>
                  APP Languages
                </Text>
              </Box>
              <LanguagesOptions />
            </Actionsheet.Content>
          </Actionsheet>
        </ScrollView>
      </Box>
    </>
  )
}

export default LanguagesSetting
