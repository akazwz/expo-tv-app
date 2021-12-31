import { useState } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
  Pressable, useWindowDimensions,
} from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view';
import { NativeBaseProvider, Box, Text, Center, Icon } from 'native-base'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons'

const CCTVRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
)

const ProvinceRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
)

const LocalRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#07ffa8' }} />
)

const renderScene = SceneMap({
  cctv: CCTVRoute,
  province: ProvinceRoute,
  local: LocalRoute,
})

export default function HomeScreen() {
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'cctv', title: 'CCTV' },
    { key: 'province', title: 'Province TV' },
    { key: 'local', title: 'Local TV' },
  ])

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color = index === i ? '#9b2020' : '#a1a1aa';
          const borderColor = index === i ? 'cyan.500' : 'coolGray.200';

          return (
            <Box
              key={route.title}
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              borderWidth={3}
              borderRadius={10}
            >
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}>
                <Animated.Text style={{ color: color }}>{route.title}</Animated.Text>
              </Pressable>
            </Box>
          )
        })}
      </Box>
    )
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}
