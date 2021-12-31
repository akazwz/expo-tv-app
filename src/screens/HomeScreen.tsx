import { useRef, useState } from 'react'
import {
  View,
  Animated,
  Pressable,
  useWindowDimensions,
} from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { Box, Center, HStack, ScrollView } from 'native-base'

const CCTVRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
)

const ProvinceRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
)

const LocalRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#07ffa8' }} />
)

const HKRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#07ffa8' }} />
)

const WorldRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#07ffa8' }} />
)

const MusicRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#07ffa8' }} />
)

const renderScene = SceneMap({
  cctv: CCTVRoute,
  province: ProvinceRoute,
  local: LocalRoute,
  hk: HKRoute,
  world: WorldRoute,
  music: MusicRoute,
})

export default function HomeScreen() {
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
            <Box
              key={route.title}
              flex={1}
              alignItems="center"
              p="3"
              w="100px"
            >
              <Pressable
                onPress={() => {
                  console.log(i)
                  setIndex(i)
                }}
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
              </Pressable>
            </Box>
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
