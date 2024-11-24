import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: CONSTANTS.THEME.size.WIDTH,
  },
  constainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: '1%',
  },
  mainContainer: {
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    width: CONSTANTS.THEME.size.WIDTH * 0.9,
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.05,
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
    marginTop: CONSTANTS.THEME.size.s10,
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
  buttonViewStyle: {
    width: CONSTANTS.THEME.size.WIDTH * 0.9,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  thankuImage: {
    width: CONSTANTS.THEME.size.WIDTH * 0.4,
    height: CONSTANTS.THEME.size.WIDTH * 0.2,
    marginTop: CONSTANTS.THEME.size.s16,
  },
});

export default styles;
