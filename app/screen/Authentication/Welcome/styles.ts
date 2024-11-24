import {Platform, StyleSheet} from 'react-native';
import CONSTANTS from '../../../utils/constants';
CONSTANTS;

const styles = StyleSheet.create({
  welcomeContainer: {
    flexDirection: 'row',
    marginBottom: '1%',
    marginTop: '4%',
  },
  constainer: {
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.05,
    width: CONSTANTS.THEME.size.WIDTH * 0.9,
  },
  buttonStyle: {
    borderRadius: CONSTANTS.THEME.size.s14,
    marginTop: CONSTANTS.THEME.size.s18,
  },
  registerButtonStyle: {
    borderRadius: CONSTANTS.THEME.size.s14,
    borderColor: CONSTANTS.THEME.colors.NEUTRAL[300],
    borderWidth: 1,
  },
  socialContainer: {
    flexDirection: Platform.OS == 'ios' ? 'row' : 'column',
    justifyContent: Platform.OS == 'ios' ? 'space-between' : 'center',
    alignItems: 'center',
    width: CONSTANTS.THEME.size.WIDTH * 0.4,
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.25,
  },
  imageStyle: {
    width: CONSTANTS.THEME.size.WIDTH,
    height: CONSTANTS.THEME.size.HEIGHT * 0.4,
  },
});

export default styles;
