import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: CONSTANTS.THEME.size.WIDTH * 0.9,
  },
  animatedView: {
    borderRadius: 10,
  },
});

export default style;
