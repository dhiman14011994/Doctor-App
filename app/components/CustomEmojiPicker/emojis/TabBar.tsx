import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {fontResize} from '../../../utils/fontResize';
import Animated, {Extrapolation, interpolate} from 'react-native-reanimated';

const TabBar = ({route, position, index, setIndex}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const inputRange = navigationState.routes.map((x: any, i: number) => i);
  // console.log('ITem', route);
  // const opacity = interpolate(
  //   position,
  //   [index - 1, index, index + 1],
  //   [0.5, 1, 0.5],
  //   Extrapolation.CLAMP,
  // );
  console.log('optiacity', index, currentIndex);
  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.tab,
          {
            marginLeft: 8,
            fontSize: fontResize(22),
            opacity: currentIndex === index ? 1 : 0.6,
          },
        ]}
        onPress={() => setCurrentIndex(index)}>
        {route?.title || ''}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: fontResize(45),
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
});

export default TabBar;
