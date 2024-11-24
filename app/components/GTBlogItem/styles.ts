import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  imageContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.8,
    height: CONSTANTS.THEME.size.WIDTH * 0.4,
  },
  iconConstainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  container: {
    width: CONSTANTS.THEME.size.WIDTH * 0.8,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.NEUTRAL[300],
    // marginLeft: CONSTANTS.THEME.size.WIDTH * 0.05,
    overflow: 'hidden',
  },
  mainContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.8,
    padding: CONSTANTS.THEME.size.WIDTH * 0.05,
  },
  desContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: CONSTANTS.THEME.size.s6,
  },
});
export default styles;
