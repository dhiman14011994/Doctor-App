import {View, Image, TouchableOpacity, ViewStyle} from 'react-native';
import React, {FC, useState} from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import CONSTANTS from '../../utils/constants';
import {Right_Back_Icon} from '../../assets';

// props of buttons define here
interface GTCountryPickerProps {
  visible?: boolean;
  container?: ViewStyle;
  onSelectCode?: any;
  countryName?: string;
  disabled?: boolean;
}
const GTCountryPicker: FC<GTCountryPickerProps> = ({
  visible,
  container,
  onSelectCode,
  countryName = 'IN',
  disabled = false,
}) => {
  const [isVisable, setIsVisable] = useState(false);
  const [countryCode, setCountryCode] = useState('IN');
  const [country, setCountry] = useState(null);

  const [withFlag, setWithFlag] = useState(true);

  const [withFilter, setWithFilter] = useState(true);

  const onSelect = (country: any) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setIsVisable(false);
    onSelectCode(country);
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      style={container}
      onPress={() => {
        setIsVisable(true);
      }}>
      <CountryPicker
        withAlphaFilter={true}
        withCallingCode={true}
        //@ts-ignore
        countryCode={countryName || countryCode}
        withFilter={true}
        withFlag={true}
        withCountryNameButton={true}
        onSelect={onSelect}
        visible={disabled ? false : isVisable}
        onClose={() => {
          setIsVisable(false);
        }}
      />
      <Right_Back_Icon
        width={CONSTANTS.THEME.size.s14}
        height={CONSTANTS.THEME.size.s14}
      />
    </TouchableOpacity>
  );
};

export default GTCountryPicker;
