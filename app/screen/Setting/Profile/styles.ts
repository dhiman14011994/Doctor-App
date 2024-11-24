import {Platform, StyleSheet} from 'react-native';
import CONSTANTS from '../../../utils/constants';
import {fontResize} from '../../../utils/fontResize';

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
  headerContainer: {
    backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
  },
  subContainer: {
    width: CONSTANTS.THEME.size.WIDTH,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    alignItems: 'center',
    flex: 1,
  },
  userImageStyle: {
    width: CONSTANTS.THEME.size.WIDTH * 0.18,
    height: CONSTANTS.THEME.size.WIDTH * 0.18,
    borderRadius: CONSTANTS.THEME.size.WIDTH * 0.18,
    marginVertical: CONSTANTS.THEME.size.WIDTH * 0.08,
    overflow: 'hidden',
  },
  subViewStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  titleViewStyle: {
    width: '35%',
    justifyContent: 'center',
  },
  detialView: {
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineContainer: {
    flexDirection: 'row',
    marginVertical: CONSTANTS.THEME.size.s10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageContainer: {
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.NEUTRAL[300],
    borderStyle: 'dotted',
    borderRadius: CONSTANTS.THEME.size.s10,
    paddingHorizontal: CONSTANTS.THEME.size.s12,
    paddingVertical: CONSTANTS.THEME.size.s4,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
  balanceContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.94,
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLORS[100],
    marginTop: CONSTANTS.THEME.size.s20,
    borderRadius: CONSTANTS.THEME.size.s10,
    marginBottom: CONSTANTS.THEME.size.WIDTH * 0.5,
    paddingVertical: CONSTANTS.THEME.size.s10,
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
});

export default styles;
