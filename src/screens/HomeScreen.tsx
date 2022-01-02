import { useLayoutEffect, useRef, useState } from 'react'
import {
  Animated,
  useWindowDimensions,
} from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  Pressable,
  useColorModeValue,
} from 'native-base'
import ChannelList from '../components/ChannelList'

const CCTVRoute = () => (
  <ScrollView flex={1} px="3" bg="blue.200">
    <ChannelList />
  </ScrollView>
)

const ProvinceRoute = () => (
  <Center flex={1} bg="blue.300">
    <Text>
      Province TV
    </Text>
  </Center>
)

const LocalRoute = () => (
  <Center flex={1} bg="blue.400">
    <Text>
      Local TV
    </Text>
  </Center>
)

const HKRoute = () => (
  <Center flex={1} bg="blue.500">
    <Text>
      HK TV
    </Text>
  </Center>
)

const WorldRoute = () => (
  <Center flex={1} bg="blue.600">
    <Text>
      World TV
    </Text>
  </Center>
)

const MusicRoute = () => (
  <Center flex={1} bg="blue.700">
    <Text>
      MUSIC TV
    </Text>
  </Center>
)

const renderScene = SceneMap({
  cctv: CCTVRoute,
  province: ProvinceRoute,
  local: LocalRoute,
  hk: HKRoute,
  world: WorldRoute,
  music: MusicRoute,
})

export default function HomeScreen({ navigation }) {
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

  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'cctv', title: 'CCTV' },
    { key: 'province', title: 'Province TV' },
    { key: 'local', title: 'Local TV' },
    { key: 'hk', title: 'HK TV' },
    { key: 'world', title: 'World TV' },
    { key: 'music', title: 'Music TV' },
  ])

  const scrollRef = useRef(null)

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i)
    return (
      <ScrollView
        ref={scrollRef}
        horizontal
        h="50px"
        maxH="50px"
        showsHorizontalScrollIndicator={false}
        bg={bgMain}
      >
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          })
          const color = index === i ? '#3b82f6' : '#a1a1aa'
          const borderColor = index === i ? 'cyan.500' : 'coolGray.200'
          const show = index === i

          return (
            <Pressable
              key={route.title}
              onPress={() => {
                console.log(i)
                setIndex(i)
              }}
            >
              <Box
                flex={1}
                alignItems="center"
                p="3"
                w="100px"
              >
                <Animated.Text style={{ color: color }}>{route.title}</Animated.Text>
                {show
                  ? <Center mt={1}>
                    <HStack
                      w={5}
                      h={1}
                      bg={color}
                      borderWidth={3}
                      borderRadius={3}
                      borderColor={color}
                    />
                  </Center>
                  : null
                }
              </Box>
            </Pressable>
          )
        })}
      </ScrollView>
    )
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={(index) => {
        setIndex(index)
        scrollRef.current.scrollTo({
          x: 100 * index,
          animated: true,
        })
      }}
      initialLayout={{ width: layout.width }}
    />
  )
}
