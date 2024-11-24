import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';
CONSTANTS;

const styles = StyleSheet.create({
  dot: {
    height: CONSTANTS.THEME.size.s6,
    margin: CONSTANTS.THEME.size.s4,
    borderRadius: CONSTANTS.THEME.size.s6 / 2,
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default styles;
