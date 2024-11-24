import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import GTLabel from '../GTLabel';
import CONSTANTS from '../../utils/constants';

interface ListEmptyComponentProps {
  text?: string;
  customViewStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ListEmptyComponent: FC<ListEmptyComponentProps> = ({
  text,
  customViewStyle,
  textStyle,
}) => {
  return (
    <View style={{...styles.emptyContainer, ...customViewStyle}}>
      <GTLabel
        text={`No Data Found`}
        color={CONSTANTS.THEME.colors.Dark_Gunmetal}
        customStyle={textStyle}
      />
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  emptyContainer: {
    width: '100%',
    height: CONSTANTS.THEME.size.HEIGHT * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
