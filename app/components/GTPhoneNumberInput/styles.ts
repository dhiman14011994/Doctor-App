import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: CONSTANTS.THEME.size.WIDTH,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    borderTopWidth: 0.5,
  },
  countryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    alignItems: 'center',
  },
  inputViewContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.7,
    height: CONSTANTS.THEME.size.HEIGHT * 0.08,
  },
  codeView: {
    width: CONSTANTS.THEME.size.WIDTH * 0.15,
    height: CONSTANTS.THEME.size.HEIGHT * 0.05,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossButton: {
    width: CONSTANTS.THEME.size.s20,
    height: CONSTANTS.THEME.size.s20,
  },
  codeText: {
    fontSize: CONSTANTS.THEME.size.s24,
    fontWeight: '400',
    fontFamily: CONSTANTS.THEME.typography.fontFamily.Regular,
    color: CONSTANTS.THEME.colors.Dark_Gunmetal,
  },
});

export default styles;
