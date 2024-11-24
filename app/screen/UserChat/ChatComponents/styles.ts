import {StyleSheet} from 'react-native';
import CONSTANTS from '../../../utils/constants';

const styles = StyleSheet.create({
  avterLeft: {
    borderWidth: 0,
  },
  avatarImageLeft: {
    borderWidth: 0,
  },
  customTextStyle: {
    fontSize: CONSTANTS.THEME.size.s14,
    fontFamily: CONSTANTS.THEME.typography.fontFamily.Regular,
    lineHeight: 24,
    color: CONSTANTS.THEME.colors.Dark_Gunmetal,

    paddingVertical: CONSTANTS.THEME.size.s8,
    paddingBottom: CONSTANTS.THEME.size.s30,
    minWidth: CONSTANTS.THEME.size.WIDTH * 0.2,
  },
});

export default styles;
