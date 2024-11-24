import {View, Text} from 'react-native';
import React from 'react';
import {Header_Icon} from '../../assets';
import CONSTANTS from '../../utils/constants';
import GTLabel from '../GTLabel';
import styles from './styles';

const GTHomeHeaderIcon = () => {
  return (
    <View style={styles.mainContainer}>
      <Header_Icon
        width={CONSTANTS.THEME.size.s42}
        height={CONSTANTS.THEME.size.s42}
      />
      <View style={styles.subContainer}>
        <GTLabel
          text={CONSTANTS.TEXT.MIND_TALKS}
          color={CONSTANTS.THEME.colors.WHITE_COLOR}
          fontSize={CONSTANTS.THEME.size.s20}
          fontWeight="700"
          customStyle={{lineHeight: CONSTANTS.THEME.size.s28}}
        />
        <GTLabel
          text={CONSTANTS.TEXT.YOUR_PATH}
          color={CONSTANTS.THEME.colors.WHITE_COLOR}
          fontSize={CONSTANTS.THEME.size.s8}
          customStyle={{lineHeight: CONSTANTS.THEME.size.s12}}
        />
      </View>
    </View>
  );
};

export default GTHomeHeaderIcon;
