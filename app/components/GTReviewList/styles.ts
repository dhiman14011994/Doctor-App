import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';
import {fontResize} from '../../utils/fontResize';

const styles = StyleSheet.create({
  recentContainer: {
    paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.03,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.02,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.LIGHT_WHITE,
    borderRadius: CONSTANTS.THEME.size.s14,
    marginVertical: CONSTANTS.THEME.size.WIDTH * 0.01,
  },
  starIconContainer: {
    height: fontResize(26),
    width: fontResize(56),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CONSTANTS.THEME.colors.MIC_BG_COLOR,
    borderRadius: CONSTANTS.THEME.size.s14,
    marginRight: CONSTANTS.THEME.size.s6,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingStyle: {
    // paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.01,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.01,
  },
  ratingTextStyle: {
    width: CONSTANTS.THEME.size.WIDTH * 0.7,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
  },
  desContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: CONSTANTS.THEME.size.s6,
  },
});

export default styles;
