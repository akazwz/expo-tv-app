import { useLayoutEffect } from 'react'
import {
  AspectRatio,
  Container,
  Button,
  Center,
  StatusBar,
  Text,
  Image,
  useColorMode,
  useColorModeValue, HStack, VStack, Icon, Radio, Box
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from 'react-native'

const DisplaySetting = ({ navigation }) => {
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
      <Box flex={1} bg={bgMain} alignItems="center">
        <StatusBar
          barStyle={useColorModeValue('dark-content', 'light-content')}
          backgroundColor={bgMain}
        />
        <Radio.Group
          name="chose-color-mode"
          defaultValue={useColorModeValue('light', 'dark')}
          flexDirection="row"
          w="60%"
        >
          <HStack w="100%" flexDirection="row" justifyContent="space-around" flexWrap="wrap" >
            <VStack>
              <Radio
                value="light"
                icon={<Icon as={<Ionicons name="ios-checkmark" />} />}
                accessibilityLabel="light"
                flexDirection="column-reverse"
              >
                <Text bold m={1}>Light</Text>
                <AspectRatio w="20" ratio={9 / 16}>
                  <Image
                    source={{
                      uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                    }}
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
              >
                <Text bold m={1}>Dark</Text>
                <AspectRatio w="20" ratio={9 / 16}>
                  <Image
                    source={{
                      uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                    }}
                    alt="image"
                    rounded="lg"
                  />
                </AspectRatio>
              </Radio>
            </VStack>
          </HStack>
        </Radio.Group>
        <Text fontSize="lg" display="flex" mb={20}>
          The active color mode is {' '}
          <Text bold fontSize="18px">
            {useColorModeValue('Light', 'Dark')}
          </Text>
        </Text>
        <Button onPress={toggleColorMode}>Toggle</Button>
      </Box>
    </>
  )
}

export default DisplaySetting
