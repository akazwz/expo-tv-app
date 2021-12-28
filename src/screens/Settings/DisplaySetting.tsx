import { useLayoutEffect } from 'react'
import { Platform, useColorScheme } from 'react-native'
import {
  AspectRatio,
  StatusBar,
  Text,
  Image,
  HStack,
  VStack,
  Icon,
  Radio,
  Box,
  Flex,
  Spacer,
  useColorMode,
  useColorModeValue, ScrollView, Divider, Switch,
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { useAppDispatch, useSystemTheme } from '../../hooks/redux'
import { setUseSystemColorMode } from '../../redux/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DisplaySetting = ({ navigation }) => {
  const themeValue = useSystemTheme()
  const dispatch = useAppDispatch()

  // set navigation props
  const bgMain = useColorModeValue('#f5f5f4', '#000000')
  const bgSecond = useColorModeValue('#ffffff', '#18181b')
  const color = useColorModeValue('#27272a', '#ffffff')
  const colorSecond = useColorModeValue('#27272a', '#ffffff')

  const moon = require('../../assets/images/moon2.jpg')
  const sun = require('../../assets/images/sun3.jpg')

  const setUseSystemColorModeStorage = async(value: 'yes' | 'no') => {
    try {
      await AsyncStorage.setItem('@storage-use-system-color-mode', value)
    } catch (e) {
      console.log('set storage use system color mode error:')
      console.log(e)
    }
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

  const { toggleColorMode, setColorMode } = useColorMode()

  const colorScheme = useColorScheme()

  return (
    <>
      <Box flex={1} bg={bgMain} alignItems="center">
        <StatusBar
          barStyle={useColorModeValue('dark-content', 'light-content')}
          backgroundColor={bgMain}
        />
        <ScrollView>
          <Box alignItems="center">
            <Flex alignItems="flex-start" w="90%" m={2}>
              <Text color={color} fontWeight="100">APPEARANCE</Text>
            </Flex>
            <Box bg={bgSecond} w="90%" alignItems="center" rounded="lg" pt={3} pl={3} pr={3}>
              <Radio.Group
                name="chose-color-mode"
                value={useColorModeValue('light', 'dark')}
                onChange={toggleColorMode}
                flexDirection="row"
                mb={4}
              >
                <HStack w={Platform.OS === 'web' ? '80vw' : '100%'} flexDirection="row" justifyContent="space-evenly">
                  <VStack>
                    <Radio
                      value="light"
                      icon={<Icon as={<Ionicons name="ios-checkmark" />} />}
                      accessibilityLabel="light"
                      flexDirection="column-reverse"
                      isDisabled={themeValue.theme.useSystemColorMode}
                    >
                      <Text bold m={3}>Light</Text>
                      <AspectRatio w="20" ratio={9 / 16}>
                        <Image
                          source={sun}
                          w="100%"
                          h="100%"
                          alt="image"
                          rounded="lg"
                        />
                      </AspectRatio>
                    </Radio>
                  </VStack>
                  <VStack>
                    <Radio
                      value="dark"
                      icon={<Icon as={<Ionicons name="ios-checkmark" />} />}
                      accessibilityLabel="light"
                      flexDirection="column-reverse"
                      isDisabled={themeValue.theme.useSystemColorMode}
                    >
                      <Text bold m={3}>Dark</Text>
                      <AspectRatio w="20" ratio={9 / 16}>
                        <Image
                          source={moon}
                          w="100%"
                          h="100%"
                          alt="image"
                          rounded="lg"
                        />
                      </AspectRatio>
                    </Radio>
                  </VStack>
                </HStack>
              </Radio.Group>
              <Divider />
              {/*android have margin*/}
              <Flex w="100%" flexDirection="row" alignItems="center" m={Platform.OS === 'android' ? 0 : 3}>
                <Text>FOLLOW SYSTEM</Text>
                <Spacer />
                <Switch isChecked={themeValue.theme.useSystemColorMode} onToggle={() => {
                  const val = themeValue.theme.useSystemColorMode ? 'no' : 'yes'
                  setUseSystemColorModeStorage(val).then(() => {
                    setColorMode(colorScheme)
                    dispatch(setUseSystemColorMode(!themeValue.theme.useSystemColorMode))
                  })
                }} />
              </Flex>
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </>
  )
}

export default DisplaySetting
