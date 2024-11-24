import {TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import CONSTANTS from '../../utils/constants';
import styles from './styles';
import GTLabel from '../GTLabel';
import GTDivider from '../GTDivider';
import {Right_Back_Icon} from '../../assets';

interface GTProfileOptionProps {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  backgroundColor?: string;
  customStyle?: ViewStyle;
  leftStyle?: ViewStyle;
  rightStyle?: ViewStyle;
  onHandlePress?: (data: any) => void;
  leftIcon?: any;
  rightIcon?: any;
  disabled?: boolean;
  color?: string;
}

/**
 * GTProfileOption is component to display button and it supports nesting and styling.
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
const GTProfileOption: FC<GTProfileOptionProps> = ({
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
}) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onHandlePress(item.id)}
        style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          {item.icon}
          <GTLabel
            text={item.name}
            fontFamily={CONSTANTS.THEME.typography.fontFamily.Regular}
            customStyle={{paddingHorizontal: CONSTANTS.THEME.size.s6}}
          />
        </View>

        <Right_Back_Icon width={18} height={18} />
      </TouchableOpacity>
      <GTDivider />
    </>
  );
};

export default GTProfileOption;
