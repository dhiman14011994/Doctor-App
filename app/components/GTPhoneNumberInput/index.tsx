import {View, Text, TextInput, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import GTButtonContainer from '../GTButtonContainer';
import {Close_Icon} from '../../assets';
import CONSTANTS from '../../utils/constants';
import styles from './styles';

// props of input define here
interface GTPhoneNumberInputProps {
  inputViewContainer?: ViewStyle;
  countryContainer?: ViewStyle;
  ref?: any;
  customContainerStyle?: ViewStyle;
  countryCode?: string;
  autoCapitalize?: any;
  placeholder?: any;
  keyboardType?: any;
  placeholderTextColor?: any;
  editable?: boolean;
  onKeyPress?: any;
  maxLength?: number;
  onChangeText?: any;
  value?: string;
  crossButtonPress?: () => void;
}

const GTPhoneNumberInput: FC<GTPhoneNumberInputProps> = ({
  inputViewContainer,
  ref,
  customContainerStyle,
  autoCapitalize,
  placeholder,
  keyboardType,
  placeholderTextColor,
  onKeyPress,
  editable,
  maxLength,
  onChangeText,
  value,
  countryCode,
  crossButtonPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.codeView}>
        <Text style={styles.codeText}>
          {countryCode ? `+${countryCode}` : '+91'}
        </Text>
      </View>

      <View style={{...styles.inputViewContainer, ...inputViewContainer}}>
        <TextInput
          ref={ref}
          style={{
            fontFamily: CONSTANTS.THEME.typography.fontFamily.Regular,
            backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
            borderBottomWidth: -5,
            ...customContainerStyle,
            padding: 0,
            height: '100%',
            fontSize: CONSTANTS.THEME.size.s24,
          }}
          autoCapitalize={autoCapitalize ? autoCapitalize : 'sentences'}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={placeholderTextColor}
          onKeyPress={event => onKeyPress && onKeyPress(event)}
          editable={editable}
          maxLength={maxLength}
          onChangeText={t => {
            onChangeText && onChangeText(t);
          }}
          value={value}
        />
      </View>
      {value ? (
        <GTButtonContainer
          customStyle={styles.crossButton}
          onHandlePress={crossButtonPress}>
          <Close_Icon />
        </GTButtonContainer>
      ) : (
        <View style={styles.crossButton} />
      )}
    </View>
  );
};

export default GTPhoneNumberInput;
