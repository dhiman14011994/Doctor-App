import {ViewStyle} from 'react-native';
import React, {FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CONSTANTS from '../../utils/constants';

interface GTLinearGradientViewProps {
  color1?: any;
  color2?: any;
  container?: ViewStyle;
  children?: any;
}

const GTLinearGradientView: FC<GTLinearGradientViewProps> = ({
  color1 = CONSTANTS.THEME.colors.PRIMARY_ONE_COLOR,
  color2 = CONSTANTS.THEME.colors.PRIMARY_SECOND_COLOR,
  container,
  children,
}) => {
  return (
    <LinearGradient
      colors={[color1, color2]}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      style={container}>
      {children}
    </LinearGradient>
  );
};

export default GTLinearGradientView;
