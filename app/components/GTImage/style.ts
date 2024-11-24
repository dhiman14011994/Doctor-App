import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const style = StyleSheet.create({
  container: {
    height: CONSTANTS.THEME.size.WIDTH * 0.1,
    width: CONSTANTS.THEME.size.WIDTH * 0.1,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
});

export default style;
