import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: CONSTANTS.THEME.size.s60,
    flexDirection: 'row',
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
  textStyle: {
    paddingVertical: 0,
    width: CONSTANTS.THEME.size.WIDTH * 0.74,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  appIconStyle: {
    width: CONSTANTS.THEME.size.WIDTH * 0.74,
    justifyContent: 'center',
  },
  iconStyle: {
    height: CONSTANTS.THEME.size.s28,
    width: CONSTANTS.THEME.size.s28,
    justifyContent: 'center',
  },
  iconViewStyle: {
    width: CONSTANTS.THEME.size.WIDTH * 0.1,
    justifyContent: 'center',
  },
  rightIconStyle: {
    alignSelf: 'flex-end',
  },
});
export default styles;
