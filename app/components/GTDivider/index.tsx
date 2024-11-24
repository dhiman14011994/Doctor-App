import {View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';

interface GTDividerProps {
  customStyle?: ViewStyle;
}

const GTDivider: FC<GTDividerProps> = ({customStyle}) => {
  return <View style={[styles.container, customStyle]} />;
};

export default GTDivider;
