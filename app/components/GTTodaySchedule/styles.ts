import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';
import {fontResize} from '../../utils/fontResize';

const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    width: CONSTANTS.THEME.size.WIDTH * 0.94,
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.PLATINUM_COLOR,
    padding: CONSTANTS.THEME.size.WIDTH * 0.05,
    borderRadius: CONSTANTS.THEME.size.WIDTH * 0.05,
    marginBottom: CONSTANTS.THEME.size.WIDTH * 0.05,
  },
  timeContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userImageStyle: {
    width: CONSTANTS.THEME.size.s24,
    height: CONSTANTS.THEME.size.s24,
    borderRadius: CONSTANTS.THEME.size.s24,
  },
  joinButton: {
    alignSelf: 'flex-end',
    width: fontResize(110),
    backgroundColor: CONSTANTS.THEME.colors.GREEN,
    height: CONSTANTS.THEME.size.s32,
    padding: CONSTANTS.THEME.size.s8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: CONSTANTS.THEME.size.s32,
    marginTop: CONSTANTS.THEME.size.WIDTH * 0.03,
  },
});
export default styles;
