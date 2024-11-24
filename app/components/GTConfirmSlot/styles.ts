import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';
import {fontResize} from '../../utils/fontResize';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: CONSTANTS.THEME.size.WIDTH,
  },
  subContainer: {
    alignItems: 'center',
  },
  mainContainer: {
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    width: CONSTANTS.THEME.size.WIDTH * 0.94,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    padding: CONSTANTS.THEME.size.WIDTH * 0.02,
    borderRadius: CONSTANTS.THEME.size.WIDTH * 0.06,
    alignItems: 'center',
  },
  buttonViewStyle: {
    width: CONSTANTS.THEME.size.WIDTH * 0.9,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: CONSTANTS.THEME.size.s24,
    marginBottom: CONSTANTS.THEME.size.WIDTH * 0.05,
  },
  buttonContainer: {
    height: CONSTANTS.THEME.size.s44,
    borderRadius: CONSTANTS.THEME.size.s14,
    padding: CONSTANTS.THEME.size.s12,
    width: CONSTANTS.THEME.size.WIDTH * 0.375,
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
  },
  closeContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.12,
    height: CONSTANTS.THEME.size.WIDTH * 0.12,
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.44,
    borderRadius: CONSTANTS.THEME.size.s50,
    backgroundColor: CONSTANTS.THEME.colors.Dark_Gunmetal,
    marginVertical: CONSTANTS.THEME.size.s10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.84,
    height: fontResize(60),
    borderWidth: 1,
    borderRadius: CONSTANTS.THEME.size.s20,
    borderColor: CONSTANTS.THEME.colors.LIGHT_WHITE,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    shadowColor: CONSTANTS.THEME.colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
    marginTop: CONSTANTS.THEME.size.s6,
  },
  inputViewStyle: {
    width: '100%',
    height: CONSTANTS.THEME.size.s60,
    fontSize: CONSTANTS.THEME.size.s14,
    color: CONSTANTS.THEME.colors.SECONDARY_COLOR[80],
    paddingHorizontal: '3%',
  },
});

export default styles;
