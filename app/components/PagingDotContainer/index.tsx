import {View, Text, Animated} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
interface IPagingDotProps {
  position: Animated.AnimatedDivision<string | number>;
  dotColor: string;
  elements: any[];
}

const PagingDotContainer: FC<IPagingDotProps> = ({
  position,
  dotColor,
  elements = [],
}) => {
  return (
    <View style={styles.dotView}>
      {elements.map((_, i) => {
        let opacity = position.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        let width = position.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [8, 30, 8],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i.toString()}
            style={[
              styles.dot,
              {
                opacity,
                width,
                backgroundColor: dotColor,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default PagingDotContainer;
