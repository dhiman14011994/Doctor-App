import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    paddingTop: '2%',
  },
  textStyle: {
    marginLeft: CONSTANTS.THEME.size.s4,
  },
});
export default styles;
