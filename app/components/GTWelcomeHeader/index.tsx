import {View, Text, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import GTLabel from '../GTLabel';
import CONSTANTS from '../../utils/constants';
import {HeaderIcon} from '../../assets';
import styles from './styles';

interface GTWelcomeHeaderProps {
  container?: ViewStyle;
}

const GTWelcomeHeader: FC<GTWelcomeHeaderProps> = ({container}) => {
  return (
    <View style={{...styles.constainer, ...container}}>
      <HeaderIcon
        width={CONSTANTS.THEME.size.s50}
        height={CONSTANTS.THEME.size.s50}
      />
      <View>
        <GTLabel
          text={CONSTANTS.TEXT.MIND_TALKS}
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
          fontSize={CONSTANTS.THEME.size.s22}
          customStyle={{lineHeight: CONSTANTS.THEME.size.s34}}
          fontFamily={CONSTANTS.THEME.typography.fontFamily.Black}
        />
        <GTLabel
          text={CONSTANTS.TEXT.YOUR_PATH}
          color={CONSTANTS.THEME.colors.Light_Gray}
          fontSize={CONSTANTS.THEME.size.s10}
          // customStyle={{lineHeight: CONSTANTS.THEME.size.s34}}
        />
      </View>
    </View>
  );
};

export default GTWelcomeHeader;
