import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.001,
  },
  dividerStyle: {
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.01,
    width: CONSTANTS.THEME.size.WIDTH * 0.33,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    height: CONSTANTS.THEME.size.s60,
  },

  inputStyle: {
    fontFamily: CONSTANTS.THEME.typography.fontFamily.Regular,
    width: CONSTANTS.THEME.size.WIDTH * 0.13,
    height: CONSTANTS.THEME.size.s60,
    fontSize: CONSTANTS.THEME.size.s24,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: CONSTANTS.THEME.size.s20,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    marginHorizontal: CONSTANTS.THEME.size.s8,
    paddingVertical: 0,
    color: CONSTANTS.THEME.colors.Dark_Gunmetal,
  },
  errorView: {
    flexDirection: 'row',
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    alignItems: 'center',
    marginTop: '2%',
  },
});
export default styles;
