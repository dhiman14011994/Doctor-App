import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: CONSTANTS.THEME.size.WIDTH,
  },
  mainContainer: {
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    width: CONSTANTS.THEME.size.WIDTH,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    padding: CONSTANTS.THEME.size.s20,
    borderRadius: CONSTANTS.THEME.size.s10,
    alignItems: 'center',
  },
  closeContainer: {
    width: CONSTANTS.THEME.size.s50,
    height: CONSTANTS.THEME.size.s50,
    borderRadius: CONSTANTS.THEME.size.s50,
    backgroundColor: CONSTANTS.THEME.colors.Dark_Gunmetal,
    marginVertical: CONSTANTS.THEME.size.s10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: CONSTANTS.THEME.size.s44,
    borderRadius: CONSTANTS.THEME.size.s14,
    padding: CONSTANTS.THEME.size.s12,
    width: CONSTANTS.THEME.size.WIDTH * 0.375,
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
  },
  buttonRejectContainer: {
    height: CONSTANTS.THEME.size.s44,
    borderRadius: CONSTANTS.THEME.size.s14,
    padding: CONSTANTS.THEME.size.s12,
    width: CONSTANTS.THEME.size.WIDTH * 0.375,
  },
  buttonViewStyle: {
    width: CONSTANTS.THEME.size.WIDTH * 0.9,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
