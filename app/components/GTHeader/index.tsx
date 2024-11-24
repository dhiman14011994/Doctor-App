import {TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import CONSTANTS from '../../utils/constants';
import styles from './styles';
import GTLabel from '../GTLabel';
import GTLinearGradientView from '../GTLinearGradientView';
// props of header define here
interface GTHeaderProps {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  customStyle?: ViewStyle;
  onHandleLeftPress?: () => void;
  onHandleRightPress?: () => void;
  leftIcon?: any;
  rightIcon?: any;
  leftIconStyle?: ViewStyle;
  rightIconStyle?: ViewStyle;
  appIcon?: any;
  rightButtonDisabled?: boolean;
  leftButtonDisabled?: boolean;
  isFilter?: boolean;
  textColor?: string;
  color1?: any;
  color2?: any;
  iconRightViewStyle?: ViewStyle;
  iconRightLeftStyle?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * GTHeader is component to display View and it supports nesting and styling.
 * @param {string} text message that you wants to display
 * @param {number} fontSize change the size of font.
 * @param {string} fontFamily change the size of font family.
 * @param {ViewStyle} customStyle if you want to add custom styling.
 * @param {Function} onHandleLeftPress onPress  left handle by this props.
 * @param {Function} onHandleRightPress onPress right handle by this props.
 * @param {any} leftIcon if you want to add custom icon inside button left side.
 * @param {any} rightIcon if you want to add custom icon inside button right side.
 * @param {ViewStyle} leftIconStyle if you want to add custom styling.
 * @param {ViewStyle} rightIconStyle if you want to add custom styling.
 * @param {any} appIcon  if you want to add custom icon inside center of this props.
 * @param {boolean} rightButtonDisabled  disabled right side button of this props.
 * @param {boolean} leftButtonDisabled  disabled left side button of this props.
 * @param {boolean} isFilter filter view of this props.
 * @returns The styled header
 */

// return the component
const GTHeader: FC<GTHeaderProps> = ({
  text,
  fontSize = CONSTANTS.THEME.size.s18,
  fontFamily = CONSTANTS.THEME.typography.fontFamily.Regular,
  customStyle = {},
  onHandleLeftPress,
  onHandleRightPress,
  leftIcon,
  rightIcon,
  leftIconStyle,
  rightIconStyle,
  appIcon,
  rightButtonDisabled = false,
  leftButtonDisabled = false,
  isFilter = false,
  textColor,
  color1 = CONSTANTS.THEME.colors.PRIMARY_ONE_COLOR,
  color2 = CONSTANTS.THEME.colors.PRIMARY_SECOND_COLOR,
  iconRightViewStyle,
  iconRightLeftStyle,
  textStyle,
}) => {
  return (
    <GTLinearGradientView
      color1={color1}
      color2={color2}
      container={{
        ...styles.mainContainer,
        ...customStyle,
      }}>
      <View
        style={{
          ...styles.iconViewStyle,
          ...iconRightLeftStyle,
          marginLeft: '3%',
        }}>
        {leftIcon && (
          <TouchableOpacity
            onPress={onHandleLeftPress}
            style={[styles.iconStyle, {...leftIconStyle}]}
            disabled={leftButtonDisabled}>
            {leftIcon}
          </TouchableOpacity>
        )}
      </View>
      {appIcon ? (
        <View style={styles.appIconStyle}>{appIcon}</View>
      ) : (
        <GTLabel
          text={text}
          fontSize={fontSize}
          color={textColor}
          fontFamily={fontFamily}
          fontWeight="700"
          customStyle={{...styles.textStyle, ...textStyle}}
        />
      )}

      {isFilter ? (
        <View
          style={{
            ...styles.iconViewStyle,
            ...iconRightViewStyle,
            marginRight: '3%',
          }}>
          {rightIcon && (
            <TouchableOpacity
              onPress={onHandleRightPress}
              disabled={rightButtonDisabled}
              style={[{...rightIconStyle}]}>
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View
          style={{
            ...styles.iconViewStyle,
            ...iconRightViewStyle,
            marginRight: '3%',
          }}>
          {rightIcon && (
            <TouchableOpacity
              onPress={onHandleRightPress}
              disabled={rightButtonDisabled}
              style={[
                styles.iconStyle,
                {...rightIconStyle, ...styles.rightIconStyle},
              ]}>
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
      )}
    </GTLinearGradientView>
  );
};

export default GTHeader;
