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
    width: '70%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subDateContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  mediaContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameContainer: {
    marginLeft: CONSTANTS.THEME.size.s8,
    justifyContent: 'space-between',
    width: CONSTANTS.THEME.size.WIDTH * 0.55,
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
    width: CONSTANTS.THEME.size.WIDTH * 0.25,
  },
  lineStyles: {
    width: 1,
    height: '100%',
    backgroundColor: CONSTANTS.THEME.colors.NEUTRAL[300],
    marginHorizontal: 2,
  },
  lineContainer: {
    flexDirection: 'row',
    marginVertical: CONSTANTS.THEME.size.s10,
  },
});
export default styles;
