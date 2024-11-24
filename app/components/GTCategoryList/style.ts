import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const style = StyleSheet.create({
  mainContainer: {
    width: CONSTANTS.THEME.size.WIDTH,
    marginTop: CONSTANTS.THEME.size.HEIGHT * 0.02,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    padding: CONSTANTS.THEME.size.WIDTH * 0.05,
  },
  listContainer: {
    // padding: CONSTANTS.THEME.size.WIDTH * 0.05,
    width: CONSTANTS.THEME.size.WIDTH * 0.92,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: CONSTANTS.THEME.size.WIDTH * 0.15,
    height: CONSTANTS.THEME.size.WIDTH * 0.15,
    borderRadius: CONSTANTS.THEME.size.WIDTH * 0.15,
    overflow: 'hidden',
  },
  headerStyle: {
    marginBottom: CONSTANTS.THEME.size.HEIGHT * 0.02,
  },
  itemContainer: {},
});

export default style;
