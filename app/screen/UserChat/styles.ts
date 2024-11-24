import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
  },

  userImageStyle: {
    width: CONSTANTS.THEME.size.HEIGHT * 0.05,
    height: CONSTANTS.THEME.size.HEIGHT * 0.05,
    borderRadius: CONSTANTS.THEME.size.HEIGHT * 0.05,
    overflow: 'hidden',
  },
  headerUserStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameStyle: {
    marginLeft: CONSTANTS.THEME.size.s10,
  },
  sessionDetailsView: {
    width: CONSTANTS.THEME.size.WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CONSTANTS.THEME.colors.RED,
    paddingVertical: CONSTANTS.THEME.size.s10,
  },
});

export default styles;
