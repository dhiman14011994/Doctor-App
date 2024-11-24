import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';
import {fontResize} from '../../utils/fontResize';

const styles = StyleSheet.create({
  detailContainer: {
    paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.01,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    paddingTop: CONSTANTS.THEME.size.WIDTH * 0.01,
    lineHeight: CONSTANTS.THEME.size.s20,
    marginBottom: CONSTANTS.THEME.size.WIDTH * 0.01,
    width: '100%',
  },
  buttonStyle: {
    width: CONSTANTS.THEME.size.WIDTH * 0.18,
    borderRadius: CONSTANTS.THEME.size.s12,
    height: CONSTANTS.THEME.size.s34,
  },
  rejectButtonStyle: {
    width: CONSTANTS.THEME.size.WIDTH * 0.18,
    borderRadius: CONSTANTS.THEME.size.s12,
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.ORANGE,
    height: CONSTANTS.THEME.size.s34,
  },
  buttonContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.5,
  },
});

export default styles;
