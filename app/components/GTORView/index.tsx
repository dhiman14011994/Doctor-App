import {View, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import GTLabel from '../GTLabel';
import CONSTANTS from '../../utils/constants';

const GTORView = () => {
  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={[
          CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[0],
          CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100],
        ]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.lineContainer}
      />
      <GTLabel
        text={CONSTANTS.TEXT.OR}
        fontSize={CONSTANTS.THEME.size.s12}
        fontWeight="600"
        color={CONSTANTS.THEME.colors.Light_Primary_Gunmetal}
      />

      <LinearGradient
        colors={[
          CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100],
          CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[0],
        ]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.lineContainer}
      />
    </View>
  );
};

export default GTORView;
