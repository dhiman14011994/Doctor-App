import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

export const styles = StyleSheet.create({
  checkContainer: {
    width: CONSTANTS.THEME.size.s30,
    height: CONSTANTS.THEME.size.s30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: CONSTANTS.THEME.size.WIDTH * 0.008,
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
    marginVertical: CONSTANTS.THEME.size.WIDTH * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
