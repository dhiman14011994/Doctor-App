import { StyleSheet } from 'react-native';
import CONSTANTS from '../../utils/constants';

const style = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CONSTANTS.THEME.colors.BLACK_OPACITY_COLOR,
  },
});

export default style;
