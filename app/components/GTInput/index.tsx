import {TouchableOpacity, View, ViewStyle, TextInput} from 'react-native';
import React, {FC, useState} from 'react';
import CONSTANTS from '../../utils/constants';
import styles from './styles';
import GTLabel from '../GTLabel';
import GTButtonContainer from '../GTButtonContainer';
import CountryPicker from 'react-native-country-picker-modal';
// props of inputs define here
interface GTInputProps {
  label?: string;
  labelFontSize?: number;
  labelFontFamily?: string;
  backgroundColor?: string;
  customStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  onRightIconPress?: () => void;
  leftIcon?: any;
  rightIcon?: any;
  inputStyle?: any;
  placeholder?: string;
  placeholderTextColor?: string;
  focus?: boolean;
  input?: string;
  setInput?: (input: string) => void;
  setfocus?: (focus: boolean) => void;
  keytype?: string;
  secureTextEntry?: boolean;
  isError?: any;
  errorStyle?: ViewStyle;
  autoCapitalize?: string;
  labelColor?: string;
  labelFontWeight?: any;
  inputContainer?: ViewStyle;
  isEditable?: boolean;
  maxLength?: any;
  isCountryCode?: boolean;
  disabled?: boolean;
  onSelect?: any;
  countryName?: string;
  countryCodeStyle?: any;
  containerButtonStyle?: any;
  keyboardType?: any;
  multiline?: boolean;
}

/**
 * GTInput is component to display input with label and it supports nesting and styling.
 * @param {string} label is the title of input value that you wants to display.
 * @param {number} labelFontSize change the size of font.
 * @param {string} labelFontFamily change the size of font family.
 * @param {string} backgroundColor you can change color of text.
 * @param {ViewStyle} customStyle if you want to add custom styling.
 * @param {ViewStyle} labelStyle if you want to add custom styling of label of the input.
 * @param {Function} onRightIconPress onPress handle by this props.
 * @param {any} leftIcon if you want to add custom icon inside button left side.
 * @param {any} rightIcon if you want to add custom icon inside button right side.
 * @param {ViewStyle} inputStyle if you want to add custom styling of TextInput.
 * @param {string} placeholder message that you wants to display in input field.
 * @param {string} placeholderTextColor you can change color of text
 * @param {boolean} focus if you want to add custom styling.
 * @param {string} input if you want to add custom styling of label of the input.
 * @param {void} setInput onPress handle by this props.
 * @param {void} setFocus if you want to add custom icon inside button left side.
 * @param {string} keytype if you want to add custom icon inside button right side.
 * @param {boolean} secureTextEntry if you want to add custom styling of TextInput.
 * @param {any} isError message that you wants to display in input field.
 * @param {ViewStyle} errorStyle you can change color of text
 * @param {string} autoCapitalize you can change autoCapitalize value.
 * @returns The styled input
 */

// return the component
const GTInput: FC<GTInputProps> = ({
  label,
  labelFontSize = CONSTANTS.THEME.size.s14,
  labelFontFamily = CONSTANTS.THEME.typography.fontFamily.Regular,
  customStyle = {},
  labelStyle = {},
  onRightIconPress,
  leftIcon,
  rightIcon,
  inputStyle,
  placeholder,
  placeholderTextColor,
  focus,
  input,
  setInput = () => {},
  setfocus = () => {},
  keytype,
  secureTextEntry,
  isError,
  errorStyle,
  autoCapitalize,
  labelColor = CONSTANTS.THEME.colors.Dark_Gunmetal,
  labelFontWeight = '600',
  inputContainer,
  isEditable = true,
  maxLength,
  isCountryCode,
  onSelect,
  disabled,
  countryName = 'IN',
  countryCodeStyle,
  containerButtonStyle,
  keyboardType,
  multiline,
}) => {
  const [isVisable, setIsVisable] = useState(false);
  const [countryCode, setCountryCode] = useState('IN');
  return (
    <View style={[styles.mainContainer, {...customStyle}]}>
      {/* Title */}
      <GTLabel
        text={label}
        fontSize={labelFontSize}
        fontFamily={labelFontFamily}
        color={labelColor}
        fontWeight={labelFontWeight}
        customStyle={{...styles.textStyle, ...labelStyle}}
      />
      {/* Input */}
      <View style={{...styles.inputContainer, ...inputContainer}}>
        {leftIcon && <View style={styles.actionIcon}>{leftIcon}</View>}
        {isCountryCode && (
          <View
            style={{
              ...styles.countryCodeStyle,
              ...countryCodeStyle,
              pointerEvents: isEditable ? 'auto' : 'none',
            }}>
            <CountryPicker
              withAlphaFilter={true}
              withCallingCode={true}
              //@ts-ignore
              countryCode={countryName || countryCode}
              withFilter={true}
              withFlag={true}
              withCountryNameButton={false}
              withCallingCodeButton={true}
              withFlagButton={false}
              onSelect={onSelect}
              containerButtonStyle={{
                ...containerButtonStyle,
              }}
              visible={false}
              onClose={() => {
                setIsVisable(false);
              }}
            />
            {/* <GTLabel text={'91'} color={CONSTANTS.THEME.colors.Dark_Gunmetal} /> */}
          </View>
        )}
        <TextInput
          placeholder={focus ? '' : placeholder}
          placeholderTextColor={placeholderTextColor}
          value={input}
          editable={isEditable}
          style={[
            styles.inputStyle,
            inputStyle,
            multiline
              ? {
                  width: leftIcon
                    ? rightIcon
                      ? '80%'
                      : '90%'
                    : rightIcon
                    ? '90%'
                    : isCountryCode
                    ? '90%'
                    : '100%',
                  minHeight: CONSTANTS.THEME.size.BUTTON_HEIGHT,
                }
              : {
                  width: leftIcon
                    ? rightIcon
                      ? '80%'
                      : '90%'
                    : rightIcon
                    ? '90%'
                    : isCountryCode
                    ? '90%'
                    : '100%',
                  height: CONSTANTS.THEME.size.BUTTON_HEIGHT,
                },
          ]}
          maxLength={maxLength}
          onChangeText={em => setInput(em)}
          onFocus={() => {
            setfocus(true);
          }}
          keyboardType={
            keytype == 'numeric' ? 'numeric' : keyboardType || 'default'
          }
          onBlur={() => setfocus(false)}
          blurOnSubmit
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize == 'none' ? 'none' : 'words'}
          multiline={multiline || false}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            activeOpacity={0.8}
            style={styles.actionIcon}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {/* Error */}
      <GTLabel
        text={`${isError ? isError : ''}`}
        customStyle={{...styles.errorStyle, ...errorStyle}}
      />
    </View>
  );
};

export default GTInput;
