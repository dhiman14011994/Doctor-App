import {TextStyle, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import style from './style';
import CONSTANTS from '../../utils/constants';
import GTLabel from '../GTLabel';

interface GTItemHeaderProps {
  title?: string;
  rightText?: string;
  titleFontSize?: any;
  titleTextColor?: string;
  subTextColor?: string;
  subTextFontSize?: any;
  containerStyle?: ViewStyle;
  titleCustomStyle?: TextStyle;
  subTextCustomStyle?: TextStyle;
  rightTextOnPress?: () => void;
}

const GTItemHeader: FC<GTItemHeaderProps> = ({
  title,
  rightText,
  titleFontSize = CONSTANTS.THEME.size.s12,
  titleTextColor = CONSTANTS.THEME.colors.Dark_Gunmetal,
  subTextColor = CONSTANTS.THEME.colors.PRIMARY_COLOR,
  subTextFontSize = CONSTANTS.THEME.size.s12,
  containerStyle,
  titleCustomStyle,
  subTextCustomStyle,
  rightTextOnPress,
}) => {
  return (
    <View style={[style.container, containerStyle]}>
      <GTLabel
        text={title}
        fontSize={titleFontSize}
        color={titleTextColor}
        customStyle={titleCustomStyle}
        fontWeight="900"
      />
      {rightText ? (
        <GTLabel
          onPress={rightTextOnPress}
          text={rightText}
          fontSize={subTextFontSize}
          color={subTextColor}
          fontFamily="400"
          customStyle={subTextCustomStyle}
        />
      ) : (
        <View />
      )}
    </View>
  );
};

export default GTItemHeader;
