import { StyleSheet } from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: CONSTANTS.THEME.size.BUTTON_HEIGHT,
    flexDirection: 'row',
  },
  textStyle: {
    paddingHorizontal: CONSTANTS.THEME.size.s2,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: CONSTANTS.THEME.size.s16,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CONSTANTS.THEME.size.s16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
