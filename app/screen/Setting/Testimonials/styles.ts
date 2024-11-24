import {StyleSheet} from 'react-native';
import CONSTANTS from '../../../utils/constants';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    height: CONSTANTS.THEME.size.HEIGHT,
  },
  lineContainer: {
    flexDirection: 'row',
    marginVertical: CONSTANTS.THEME.size.WIDTH * 0.05,
  },
  emptyContainer: {
    width: '100%',
    height: CONSTANTS.THEME.size.HEIGHT * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: CONSTANTS.THEME.size.WIDTH,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.05,
    paddingTop: CONSTANTS.THEME.size.WIDTH * 0.05,
    height: CONSTANTS.THEME.size.HEIGHT * 0.85,
  },
});

export default styles;
