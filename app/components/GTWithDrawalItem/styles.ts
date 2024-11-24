import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    width: CONSTANTS.THEME.size.WIDTH,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '2%',
  },
  subContainer: {
    flexDirection: 'row',
  },
  detailsStyle: {
    marginLeft: CONSTANTS.THEME.size.s12,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: CONSTANTS.THEME.size.s14,
    width: '100%',
  },
});

export default styles;
