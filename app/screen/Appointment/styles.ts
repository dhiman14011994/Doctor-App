import {Platform, StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
  headerContainer: {
    backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
  },
  trandingContainer: {
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.05,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    paddingTop: CONSTANTS.THEME.size.s20,
  },
  moveButton: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.NEUTRAL[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthView: {
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.05,
    width: CONSTANTS.THEME.size.WIDTH * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateView: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: CONSTANTS.THEME.size.WIDTH * 0.02,
    width: CONSTANTS.THEME.size.WIDTH * 0.11,
    borderRadius: CONSTANTS.THEME.size.WIDTH * 0.04,
  },
  monthContainer: {
    flexDirection: 'row',
    width: CONSTANTS.THEME.size.WIDTH,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.05,
    justifyContent: 'space-between',
    marginTop: CONSTANTS.THEME.size.WIDTH * 0.05,
  },
  subContainer: {
    width: CONSTANTS.THEME.size.WIDTH,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    height: CONSTANTS.THEME.size.HEIGHT * 0.6,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
  emptyContainer: {
    width: '100%',
    height: CONSTANTS.THEME.size.HEIGHT * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
