import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    width: CONSTANTS.THEME.size.WIDTH,
    height: CONSTANTS.THEME.size.HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CONSTANTS.THEME.colors.MODAL_COLOR,
  },
});

export default styles;
