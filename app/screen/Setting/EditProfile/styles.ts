import {StyleSheet} from 'react-native';
import CONSTANTS from '../../../utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
  imageContainer: {
    width: CONSTANTS.THEME.size.WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: CONSTANTS.THEME.size.HEIGHT * 0.05,
  },
  imageStyle: {
    width: CONSTANTS.THEME.size.WIDTH * 0.2,
    height: CONSTANTS.THEME.size.WIDTH * 0.2,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 5,
  },
  headerContainer: {
    backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
  },
  subContainer: {
    width: CONSTANTS.THEME.size.WIDTH,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    alignItems: 'center',
    flex: 1,
  },
  userImageStyle: {
    width: CONSTANTS.THEME.size.WIDTH * 0.15,
    height: CONSTANTS.THEME.size.WIDTH * 0.15,
    borderRadius: CONSTANTS.THEME.size.WIDTH * 0.15,
    marginVertical: CONSTANTS.THEME.size.WIDTH * 0.05,
  },
  nameInputView: {
    width: CONSTANTS.THEME.size.WIDTH * 0.5,
    borderRadius: CONSTANTS.THEME.size.s26,
  },
  inputContainer: {
    borderRadius: CONSTANTS.THEME.size.s26,
  },
  emptyView: {
    height: CONSTANTS.THEME.size.WIDTH * 0.4,
  },
});

export default styles;
