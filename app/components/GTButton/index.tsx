import {TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import CONSTANTS from '../../utils/constants';
import styles from './styles';
import GTLabel from '../GTLabel';
// props of buttons define here
interface GTButtonProps {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  backgroundColor?: string;
  customStyle?: ViewStyle;
  leftStyle?: ViewStyle;
  rightStyle?: ViewStyle;
  onHandlePress?: () => void;
  leftIcon?: any;
  rightIcon?: any;
  disabled?: boolean;
  color?: string;
  fontWeight?: string;
}

/**
 * GTButton is component to display button and it supports nesting and styling.
 * @param {string} text message that you wants to display
 * @param {number} fontSize change the size of font.
 * @param {string} fontFamily change the size of font family.
 * @param {string} backgroundColor you can change color of text.
 * @param {string} color you can change color of text.
 * @param {ViewStyle} customStyle if you want to add custom styling.
 * @param {Function} onHandlePress onPress handle by this props.
 * @param {any} leftIcon if you want to add custom icon inside button left side.
 * @param {any} rightIcon if you want to add custom icon inside button right side.
 * @param {boolean} disabled disabled button of this props.
 * @returns The styled button
 */

// return the component
const GTButton: FC<GTButtonProps> = ({
  text,
  backgroundColor = CONSTANTS.THEME.colors.PRIMARY_COLOR,
  fontSize = CONSTANTS.THEME.size.s14,
  fontFamily = CONSTANTS.THEME.typography.fontFamily.Black,
  color = CONSTANTS.THEME.colors.BLACK,
  customStyle = {},
  onHandlePress,
  leftIcon,
  rightIcon,
  disabled = false,
  leftStyle,
  rightStyle,
  fontWeight = '400',
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onHandlePress}
      activeOpacity={0.8}
      style={[
        styles.mainContainer,
        {
          backgroundColor,
          ...customStyle,
        },
      ]}>
      {leftIcon && (
        <View
          style={{
            height: CONSTANTS.THEME.size.s24,
            width: CONSTANTS.THEME.size.s24,
            ...leftStyle,
          }}>
          {leftIcon}
        </View>
      )}
      <GTLabel
        text={text}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        customStyle={styles.textStyle}
        color={color}
      />
      {rightIcon && (
        <View
          style={{
            height: CONSTANTS.THEME.size.s24,
            width: CONSTANTS.THEME.size.s24,
            ...rightStyle,
          }}>
          {rightIcon}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default GTButton;
