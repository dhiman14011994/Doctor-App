import {TextInput, View, ViewStyle} from 'react-native';
import React, {FC, useState, useEffect} from 'react';
import CONSTANTS from '../../utils/constants';
import styles from './styles';
import GTLabel from '../GTLabel';
import {Error_Icon} from '../../assets';
// props of two labels define here
interface GTOtpViewProps {
  inputCount?: number;
  fontSize?: number;
  fontFamily?: string;
  colorText?: string;
  customStyle?: ViewStyle;
  textStyle?: ViewStyle;
  errorMessage?: string;
  onCodeFilled?: any;
  isError?: boolean;
  setError?: any;
}

/**
 * GTOtpView is component to display button and it supports nesting and styling.
 * @param {number} inputCount how many digit of code you want to display.
 * @param {number} fontSize change the size of font.
 * @param {string} fontFamily change the size of font family.
 * @param {string} colorText change the color of the text.
 * @param {ViewStyle} customStyle if you want to add custom styling.
 * @param {ViewStyle} textStyle if you want to add custom text styling.
 * @param {ViewStyle} dividerStyle if you want to add custom divider styling.
 * @returns The styled button
 */

// return the component
const GTOtpView: FC<GTOtpViewProps> = ({
  inputCount = 4,
  fontSize = CONSTANTS.THEME.size.s24,
  fontFamily = CONSTANTS.THEME.typography.fontFamily.Regular,
  colorText = CONSTANTS.THEME.colors.Dark_Gunmetal,
  customStyle = {},
  textStyle = {},
  errorMessage,
  onCodeFilled,
  isError = false,
  setError,
}) => {
  const [focusIndex, setFocusIndex] = useState(0);
  var otp: any = [];
  for (let i = 0; i < 4; i++) {
    otp[i] = React.createRef();
  }
  const [oldotp, setOldOtp] = useState(['', '', '', '']);

  const onTextChange = (text: string, index: number) => {
    const newOtp = [...oldotp];
    newOtp[index] = text;
    onCodeFilled(newOtp);
    setOldOtp(newOtp);
    // Move to the next input field if a digit is entered
    if (index < 3 && text !== '') {
      if (oldotp[0] && oldotp[1] && oldotp[2] && oldotp[3]) {
        otp[index].focus();
        setFocusIndex(index);
      } else {
        otp[index + 1].focus();
        setFocusIndex(index + 1);
      }
    }
  };
  const handleBackspace = (index: number) => {
    if (index > 0) {
      otp[index - 1].focus();
    }
  };

  const onKeyPress = (e: any, i: any) => {
    if (e.nativeEvent.key === 'Backspace') {
      handleBackspace(i);
    } else {
      if (
        oldotp[i] &&
        i < 3 &&
        e.nativeEvent.key < 10 &&
        e.nativeEvent.key != ' '
      ) {
        otp[i + 1]?.focus();
        // handleInputChange(index + 1, nativeEvent.key);
      }
    }
  };
  return (
    <View
      style={[
        styles.mainContainer,
        {
          ...customStyle,
        },
      ]}>
      <View style={styles.inputContainer}>
        {oldotp.map((digit, index): any => (
          <TextInput
            key={(index + 1).toString()}
            ref={input => (otp[index] = input)}
            style={[
              {
                ...styles.inputStyle,
                borderColor: isError
                  ? CONSTANTS.THEME.colors.RED
                  : oldotp[0] && oldotp[1] && oldotp[2] && oldotp[3]
                  ? '#08875D'
                  : index == focusIndex
                  ? CONSTANTS.THEME.colors.PRIMARY_COLOR
                  : '#E1E6EF',
              },
            ]}
            onKeyPress={e => onKeyPress(e, index)}
            autoFocus={index === 0}
            value={digit}
            maxLength={1}
            onTouchStart={() => {
              otp[index].focus();
            }}
            onChangeText={text => onTextChange(text, index)}
            keyboardType="phone-pad"
          />
        ))}
      </View>
      {isError && (
        <View style={styles.errorView}>
          <Error_Icon
            width={CONSTANTS.THEME.size.s14}
            height={CONSTANTS.THEME.size.s14}
          />
          <GTLabel
            text={errorMessage}
            color={CONSTANTS.THEME.colors.RED}
            fontSize={CONSTANTS.THEME.size.s12}
            fontWeight="400"
            customStyle={{marginLeft: '2%'}}
          />
        </View>
      )}
    </View>
  );
};

export default GTOtpView;
