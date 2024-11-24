import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    width: CONSTANTS.THEME.size.WIDTH,
  },
  countryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    alignItems: 'center',
    height: CONSTANTS.THEME.size.HEIGHT * 0.08,
  },
});

export default styles;
