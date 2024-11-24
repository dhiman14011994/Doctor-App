import {Platform, StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

export const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textStyle: {
    paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.01,
    width: '70%',
  },
  selectItemStyle: {},
  expandStyle: {
    width: '100%',
    height: CONSTANTS.THEME.size.BUTTON_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.01,
    borderRadius: CONSTANTS.THEME.size.s8,
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.LIGHT_WHITE,
    backgroundColor: CONSTANTS.THEME.colors.LIGHT_WHITE,
  },
  actionNavView: {
    // backgroundColor: 'red',
  },
  cardView: {
    width: CONSTANTS.THEME.size.WIDTH * 0.94,
    alignItems: 'flex-start',
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    marginVertical: CONSTANTS.THEME.size.WIDTH * 0.02,
  },
  expandContainer: {
    width: '100%',
    marginVertical: CONSTANTS.THEME.size.WIDTH * 0.02,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.02,
    paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.01,
    height: CONSTANTS.THEME.size.HEIGHT * 0.3,
    flexDirection: 'row',
    borderRadius: CONSTANTS.THEME.size.s8,
    shadowColor: CONSTANTS.THEME.colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    // position: 'absolute',
    // top: CONSTANTS.THEME.size.HEIGHT * 0.06,
    // zIndex: 1,
  },
  checkContainer: {
    width: CONSTANTS.THEME.size.s30,
    height: CONSTANTS.THEME.size.s30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.01,
    borderRadius: CONSTANTS.THEME.size.s8,
    shadowColor: CONSTANTS.THEME.colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
