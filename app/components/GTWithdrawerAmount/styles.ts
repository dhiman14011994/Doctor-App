import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: CONSTANTS.THEME.size.WIDTH,
  },
  mainContainer: {
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    width: CONSTANTS.THEME.size.WIDTH * 0.94,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    padding: CONSTANTS.THEME.size.WIDTH * 0.02,
    borderRadius: CONSTANTS.THEME.size.WIDTH * 0.06,
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
    width: CONSTANTS.THEME.size.WIDTH * 0.86,
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
    marginVertical: CONSTANTS.THEME.size.s18,
  },
  buttonViewStyle: {
    width: CONSTANTS.THEME.size.WIDTH * 0.9,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkBoxStyle: {
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    width: CONSTANTS.THEME.size.s20,
    height: CONSTANTS.THEME.size.s20,
    borderRadius: CONSTANTS.THEME.size.s10,
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.LIGHT_WHITE,
    marginRight: CONSTANTS.THEME.size.s10,
  },
  fixAmmountView: {
    flexDirection: 'row',
  },
  selectedAmountView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: CONSTANTS.THEME.size.WIDTH * 0.88,
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    height: CONSTANTS.THEME.size.BUTTON_HEIGHT,
    borderRadius: CONSTANTS.THEME.size.s16,
    borderWidth: 1,
  },
  inputViewStyle: {
    width: '100%',
    height: '100%',
    fontSize: CONSTANTS.THEME.size.s12,
    color: CONSTANTS.THEME.colors.SECONDARY_COLOR[80],
    paddingHorizontal: CONSTANTS.THEME.size.s6,
  },
  inputContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.35,
    height: CONSTANTS.THEME.size.s38,
    borderWidth: 1,
    borderRadius: CONSTANTS.THEME.size.s8,
    borderColor: CONSTANTS.THEME.colors.LIGHT_WHITE,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
  errorView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    width: '100%',
  },
});

export default styles;
