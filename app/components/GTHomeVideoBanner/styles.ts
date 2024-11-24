import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';
import {fontResize} from '../../utils/fontResize';

const styles = StyleSheet.create({
  container: {
    height: CONSTANTS.THEME.size.HEIGHT * 0.3,
    width: CONSTANTS.THEME.size.WIDTH * 0.9,
    marginRight: CONSTANTS.THEME.size.WIDTH * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: CONSTANTS.THEME.size.s10,
    overflow: 'hidden',
  },
  subContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.5,
    justifyContent: 'space-around',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  buttonStyle: {
    width: fontResize(84),
    height: CONSTANTS.THEME.size.s26,
    backgroundColor: CONSTANTS.THEME.colors.ORANGE,
    borderRadius: CONSTANTS.THEME.size.s10,
    marginVertical: CONSTANTS.THEME.size.s6,
  },
});

export default styles;
