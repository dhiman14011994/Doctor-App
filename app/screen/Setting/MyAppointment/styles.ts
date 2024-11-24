import {StyleSheet} from 'react-native';
import CONSTANTS from '../../../utils/constants';
import {Commands} from 'react-native-pager-view/lib/typescript/specs/PagerViewNativeComponent';

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    height: CONSTANTS.THEME.size.HEIGHT,
    flex: 1,
  },
  headerContainer: {
    backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
  },
  bottonContainer: {
    height: CONSTANTS.THEME.size.WIDTH * 0.3,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
  renderContainer: {
    marginBottom: CONSTANTS.THEME.size.WIDTH * 0.03,
  },
  tabContainer: {
    width: CONSTANTS.THEME.size.WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: CONSTANTS.THEME.size.s60,
    padding: 5,
  },
  tabSubContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.48,
    // borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.PRIMARY_ONE_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  subContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineContainer: {
    flexDirection: 'row',
    marginVertical: CONSTANTS.THEME.size.s10,
  },
});

export default styles;
