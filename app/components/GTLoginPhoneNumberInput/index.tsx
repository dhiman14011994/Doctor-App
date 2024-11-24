import {View, Text, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import styles from './styles';
import GTCountryPicker from '../GTCountryPicker';
import GTPhoneNumberInput from '../GTPhoneNumberInput';

// props of buttons define here
interface GTLoginPhoneNumberInputProps {
  visible?: boolean;
  countryContainer?: ViewStyle;
  onSelectCode?: any;
  countryCode?: string;
  disabled?: boolean;
  onChangeText?: any;
  value?: string;
  placeholder?: string;
  keyboardType?: string;
  countryName?: string;
  container?: ViewStyle;
  crossButtonPress?: () => void;
  customContainerStyle?: any;
  maxLength?: number;
}

const GTLoginPhoneNumberInput: FC<GTLoginPhoneNumberInputProps> = ({
  onSelectCode,
  countryContainer,
  countryCode,
  onChangeText,
  value,
  placeholder,
  keyboardType,
  countryName,
  container,
  crossButtonPress,
  customContainerStyle,
  maxLength,
}) => {
  return (
    <View style={{...styles.container, ...container}}>
      <GTCountryPicker
        container={{...styles.countryContainer, ...countryContainer}}
        onSelectCode={onSelectCode}
        countryName={countryName}
      />
      <GTPhoneNumberInput
        onChangeText={onChangeText}
        value={value}
        countryCode={countryCode}
        placeholder={placeholder}
        keyboardType={keyboardType}
        crossButtonPress={crossButtonPress}
        customContainerStyle={customContainerStyle}
        maxLength={maxLength}
      />
    </View>
  );
};

export default GTLoginPhoneNumberInput;
