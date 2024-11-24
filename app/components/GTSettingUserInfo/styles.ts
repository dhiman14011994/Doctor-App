import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  mainContainer: {
    width: CONSTANTS.THEME.size.WIDTH,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    padding: CONSTANTS.THEME.size.WIDTH * 0.03,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  mediaContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameContainer: {
    marginLeft: CONSTANTS.THEME.size.s10,
    justifyContent: 'space-between',
  },
  textStyle: {
    paddingHorizontal: CONSTANTS.THEME.size.s2,
  },
  timeView: {
    flexDirection: 'row',
  },
});
export default styles;
