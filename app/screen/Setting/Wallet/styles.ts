import {Platform, StyleSheet} from 'react-native';
import CONSTANTS from '../../../utils/constants';

const styles = StyleSheet.create({
  container: {
    height: CONSTANTS.THEME.size.HEIGHT,
    flex: 1,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
  headerContainer: {
    backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
  },
  continueButton: {
    borderRadius: CONSTANTS.THEME.size.s14,
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    width: CONSTANTS.THEME.size.WIDTH * 0.94,
  },
  bottomContainer: {
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: CONSTANTS.THEME.colors.NEUTRAL[300],
    height: CONSTANTS.THEME.size.HEIGHT * 0.1,
    position: 'absolute',
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
});

export default styles;
