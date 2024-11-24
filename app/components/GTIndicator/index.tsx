import {View, ActivityIndicator} from 'react-native';
import React, {FC} from 'react';
import CONSTANTS from '../../utils/constants';
import style from './style';
interface GTIndicatorProps {
  size?: number | 'small' | 'large' | undefined;
  color?: string;
}
const GTIndicator: FC<GTIndicatorProps> = ({size, color}) => {
  return (
    <View style={style.mainContainer}>
      <ActivityIndicator
        size={size || 'large'}
        color={color || CONSTANTS.THEME.colors.PRIMARY_COLOR}
      />
    </View>
  );
};

export default GTIndicator;
