import {Platform, StyleSheet} from 'react-native';
import CONSTANTS from '../../../utils/constants';
import {fontResize} from '../../../utils/fontResize';
CONSTANTS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: CONSTANTS.THEME.size.HEIGHT,
  },
  headerContainer: {
    backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
    justifyContent: 'space-between',
  },
  enterCodeText: {
    marginVertical: '2%',
    paddingHorizontal: '5%',
  },
  continueButton: {
    borderRadius: CONSTANTS.THEME.size.s14,
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    width: CONSTANTS.THEME.size.WIDTH * 0.94,
  },
  buttonStyle: {
    width: fontResize(75),
    borderRadius: CONSTANTS.THEME.size.s12,
    height: CONSTANTS.THEME.size.s34,
  },
  emptyContainer: {
    width: '100%',
    height: CONSTANTS.THEME.size.HEIGHT * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContainer: {
    paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.01,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starIconContainer: {
    height: CONSTANTS.THEME.size.WIDTH * 0.1,
    width: CONSTANTS.THEME.size.WIDTH * 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.01,
    // paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.01,
    backgroundColor: CONSTANTS.THEME.colors.MIC_BG_COLOR,
    borderRadius: CONSTANTS.THEME.size.s14,
  },
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
  textStyle: {
    paddingTop: CONSTANTS.THEME.size.WIDTH * 0.01,
    lineHeight: CONSTANTS.THEME.size.s20,
    marginBottom: CONSTANTS.THEME.size.WIDTH * 0.01,
  },
  ratingStyle: {
    paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.01,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.01,
  },
  ratingTextStyle: {
    width: CONSTANTS.THEME.size.WIDTH * 0.7,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
  },
  requestContainerStyle: {
    flexDirection: 'column',
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.02,
    marginVertical: CONSTANTS.THEME.size.WIDTH * 0.01,
  },
  trandingContainer: {
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.05,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    marginTop: CONSTANTS.THEME.size.s20,
  },
  itemContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.28,

    paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: CONSTANTS.THEME.size.HEIGHT * 0.03,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    // borderColor: CONSTANTS.THEME.colors.NEUTRAL[300],
  },
  bannerView: {
    width: CONSTANTS.THEME.size.WIDTH,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    // borderRadius: CONSTANTS.THEME.size.WIDTH * 0.08,
  },
  viewAllStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: CONSTANTS.THEME.size.WIDTH * 0.2,
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.37,
    marginBottom: CONSTANTS.THEME.size.WIDTH * 0.03,
    justifyContent: 'center',
  },
  emptyStyle: {
    height: 150,
  },
  lineContainer: {
    flexDirection: 'row',
    marginVertical: CONSTANTS.THEME.size.WIDTH * 0.05,
  },
  blogContainer: {
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    paddingVertical: CONSTANTS.THEME.size.s20,
  },
  bannerMainContainer: {
    width: CONSTANTS.THEME.size.WIDTH,
    height: CONSTANTS.THEME.size.HEIGHT * 0.3,
  },
  buyNowButton: {
    position: 'absolute',
    bottom: CONSTANTS.THEME.size.s20,
    left: CONSTANTS.THEME.size.s20,
    paddingHorizontal: CONSTANTS.THEME.size.s10,
    paddingVertical: CONSTANTS.THEME.size.s6,
    borderRadius: CONSTANTS.THEME.size.s6,
    backgroundColor: CONSTANTS.THEME.colors.ORANGE,
  },
  pageContainer: {
    bottom: '8%',
    position: 'absolute',
    width: '100%',
  },
  mic_Container: {
    width: CONSTANTS.THEME.size.WIDTH * 0.3,
    backgroundColor: CONSTANTS.THEME.colors.MIC_BG_COLOR,
    borderColor: CONSTANTS.THEME.colors.MIC_BORDER_COLOR,
    borderWidth: 1,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.02,
    paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.02,
    borderRadius: CONSTANTS.THEME.size.s8,
  },
  chat_container: {
    width: CONSTANTS.THEME.size.WIDTH * 0.3,
    backgroundColor: CONSTANTS.THEME.colors.CHAT_BG_COLOR,
    borderColor: CONSTANTS.THEME.colors.CHAT_BORDER_COLOR,
    borderWidth: 1,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.02,
    paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.02,
    borderRadius: CONSTANTS.THEME.size.s8,
  },
  earning_container: {
    width: CONSTANTS.THEME.size.WIDTH * 0.3,
    backgroundColor: CONSTANTS.THEME.colors.EARNING_BG_COLOR,
    borderColor: CONSTANTS.THEME.colors.EARNING_BORDER_COLOR,
    borderWidth: 1,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.02,
    paddingVertical: CONSTANTS.THEME.size.WIDTH * 0.02,
    borderRadius: CONSTANTS.THEME.size.s8,
  },
  renderContainer: {
    marginBottom: CONSTANTS.THEME.size.WIDTH * 0.03,
  },
});

export default styles;
