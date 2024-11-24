import {Text, TextStyle, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import CONSTANTS from '../../utils/constants';
import styles from './styles';

interface GTLabelProps {
  text?: any;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  color?: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  customStyle?: TextStyle;
  numberOfLines?: number;
  onPress?: () => void;
}

const GTLabel: FC<GTLabelProps> = ({
  text,
  fontSize = CONSTANTS.THEME.size.s14,
  fontFamily = CONSTANTS.THEME.typography.fontFamily.Regular,
  fontWeight = CONSTANTS.THEME.typography.fontWeights.medium,
  color = CONSTANTS.THEME.colors.WHITE_COLOR,
  textAlign = 'left',
  customStyle = {},
  numberOfLines,
  onPress,
}) => {
  return (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      lineBreakMode="tail"
      //@ts-ignore
      style={{
        ...styles.label,
        fontFamily,
        color,
        fontSize,
        textAlign,
        fontWeight,
        ...customStyle,
      }}>
      {text}
    </Text>
  );
};

export default GTLabel;
