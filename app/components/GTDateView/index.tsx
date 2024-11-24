import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import GTButtonContainer from '../GTButtonContainer';
import GTLabel from '../GTLabel';
import CONSTANTS from '../../utils/constants';

interface GTDateViewProps {
  date?: string;
  onDatePress?: () => void;
  dateName?: string;
  buttonStyle?: ViewStyle;
  dateStyle?: TextStyle;
  dateNameStyle?: TextStyle;
  disabled?: boolean;
}

const GTDateView: FC<GTDateViewProps> = ({
  date,
  onDatePress,
  dateName,
  buttonStyle,
  dateNameStyle,
  dateStyle,
  disabled,
}) => {
  return (
    <GTButtonContainer
      disabled={disabled}
      onHandlePress={onDatePress}
      customStyle={{...styles.container, ...buttonStyle}}>
      <GTLabel
        fontSize={CONSTANTS.THEME.size.s16}
        fontWeight="700"
        text={date}
        customStyle={dateStyle}
      />
      <GTLabel
        fontWeight="400"
        fontSize={CONSTANTS.THEME.size.s12}
        text={dateName}
        customStyle={dateNameStyle}
      />
    </GTButtonContainer>
  );
};

export default GTDateView;

const styles = StyleSheet.create({
  container: {
    paddingVertical: CONSTANTS.THEME.size.s10,
    borderRadius: CONSTANTS.THEME.size.s10,
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.NEUTRAL[300],
    height: CONSTANTS.THEME.size.s60,
  },
});
