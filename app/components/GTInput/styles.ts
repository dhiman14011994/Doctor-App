import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textStyle: {
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.01,
  },
  inputContainer: {
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    marginVertical: CONSTANTS.THEME.size.WIDTH * 0.0001,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: CONSTANTS.THEME.size.s8,
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.LIGHT_WHITE,
  },
  inputStyle: {
    borderRadius: CONSTANTS.THEME.size.s8,
    paddingHorizontal: CONSTANTS.THEME.size.s8,
  },
  actionIcon: {
    paddingHorizontal: CONSTANTS.THEME.size.s4,
    alignSelf: 'center',
    height: CONSTANTS.THEME.size.s32,
    width: CONSTANTS.THEME.size.s32,
  },
  errorStyle: {
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.01,
    paddingHorizontal: CONSTANTS.THEME.size.s16,
    color: CONSTANTS.THEME.colors.RED,
    letterSpacing: 1,
    paddingVertical: CONSTANTS.THEME.size.HEIGHT * 0.002,
  },
  countryCodeStyle: {
    height: CONSTANTS.THEME.size.BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
});
export default styles;
