import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';
import {fontResize} from '../../utils/fontResize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
  },

  userImageStyle: {
    width: CONSTANTS.THEME.size.HEIGHT * 0.05,
    height: CONSTANTS.THEME.size.HEIGHT * 0.05,
    borderRadius: CONSTANTS.THEME.size.HEIGHT * 0.05,
    overflow: 'hidden',
  },
  userImagesStyle: {
    width: CONSTANTS.THEME.size.HEIGHT * 0.08,
    height: CONSTANTS.THEME.size.HEIGHT * 0.08,
    borderRadius: CONSTANTS.THEME.size.HEIGHT * 0.04,
    overflow: 'hidden',
    marginBottom: CONSTANTS.THEME.size.HEIGHT * 0.02,
  },
  headerUserStyle: {
    flexDirection: 'row',
  },
  nameStyle: {
    marginLeft: CONSTANTS.THEME.size.s10,
  },
  subContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: CONSTANTS.THEME.size.HEIGHT * 0.82,
  },
  menuContainter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: CONSTANTS.THEME.size.HEIGHT * 0.05,
    backgroundColor: 'rgba(29, 36, 51, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    height: fontResize(76),
    borderRadius: fontResize(38),
    width: fontResize(200),
    paddingHorizontal: CONSTANTS.THEME.size.s10,
    alignSelf: 'center',
  },
  volumeButton: {
    width: CONSTANTS.THEME.size.BUTTON_HEIGHT,
    height: CONSTANTS.THEME.size.BUTTON_HEIGHT,
    borderRadius: fontResize(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
