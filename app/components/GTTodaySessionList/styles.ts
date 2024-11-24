import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  mainContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.94,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.03,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.38,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subDateContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  mediaContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameContainer: {
    justifyContent: 'space-between',
    width: CONSTANTS.THEME.size.WIDTH * 0.5,
    overflow: 'hidden',
  },
  textStyle: {
    paddingHorizontal: CONSTANTS.THEME.size.s2,
  },
  unreadView: {
    backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
    borderRadius: CONSTANTS.THEME.size.s20,
    alignItems: 'center',
    justifyContent: 'center',
    width: CONSTANTS.THEME.size.s30,
    height: CONSTANTS.THEME.size.s24,
    alignSelf: 'flex-end',
    marginVertical: CONSTANTS.THEME.size.s4,
  },
  messageTextStyle: {
    // width: CONSTANTS.THEME.size.WIDTH * 0.4,
  },
  timeView: {
    width: CONSTANTS.THEME.size.WIDTH * 0.2,
  },
  lineStyles: {
    width: 1,
    height: '100%',
    backgroundColor: CONSTANTS.THEME.colors.NEUTRAL[300],
    marginHorizontal: 2,
  },
});
export default styles;
