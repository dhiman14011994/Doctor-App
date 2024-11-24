import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    paddingBottom: CONSTANTS.THEME.size.WIDTH * 0.05,
    marginTop: CONSTANTS.THEME.size.s20,
  },
  headerContainer: {
    backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
  },
  bottonContainer: {
    height: CONSTANTS.THEME.size.WIDTH * 0.3,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
  renderContainer: {
    marginBottom: CONSTANTS.THEME.size.WIDTH * 0.03,
  },
  balanceContainer: {
    width: CONSTANTS.THEME.size.WIDTH,
    flexDirection: 'row',
    padding: CONSTANTS.THEME.size.WIDTH * 0.03,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    marginTop: CONSTANTS.THEME.size.s10,
  },
  valueItem: {
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    width: CONSTANTS.THEME.size.WIDTH * 0.31,
    alignItems: 'center',
    borderColor: CONSTANTS.THEME.colors.LIGHT_WHITE,
  },
  footerContainer: {
    marginTop: CONSTANTS.THEME.size.s10,
    width: CONSTANTS.THEME.size.WIDTH,
    padding: CONSTANTS.THEME.size.WIDTH * 0.03,
    paddingBottom: CONSTANTS.THEME.size.WIDTH * 0.1,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
  emptyView: {
    height: CONSTANTS.THEME.size.WIDTH * 0.15,
  },
  continueButton: {
    borderRadius: CONSTANTS.THEME.size.s20,
    width: CONSTANTS.THEME.size.WIDTH * 0.4,
  },
  continueViewButton: {
    borderRadius: CONSTANTS.THEME.size.s20,
    width: CONSTANTS.THEME.size.WIDTH * 0.4,
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.25,
  },
  deleteView: {
    width: CONSTANTS.THEME.size.s32,
    height: CONSTANTS.THEME.size.s32,
    borderRadius: CONSTANTS.THEME.size.s10,
    backgroundColor: CONSTANTS.THEME.colors.RED,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
