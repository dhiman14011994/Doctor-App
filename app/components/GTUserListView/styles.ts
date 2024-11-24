import { StyleSheet } from 'react-native';
import CONSTANTS from '../../utils/constants';
import { fontResize } from '../../utils/fontResize';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: CONSTANTS.THEME.size.s10,
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.NEUTRAL[300],
    // backgroundColor: 'yellow',
    borderRadius: CONSTANTS.THEME.size.s16,
    marginBottom: CONSTANTS.THEME.size.s16,
  },

  subContainer: {
    height: CONSTANTS.THEME.size.s12,
    width: CONSTANTS.THEME.size.s12,
    borderRadius: CONSTANTS.THEME.size.s12,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
  },
  languageContainer: {
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.NEUTRAL[300],
    borderStyle: 'dotted',
    borderRadius: 10,
    paddingHorizontal: CONSTANTS.THEME.size.s8,
    paddingVertical: CONSTANTS.THEME.size.s4,
  },
  chatButton: {
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
    width: fontResize(80),
    height: fontResize(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: CONSTANTS.THEME.size.s16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  topContainer: {
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: '2%',
  },
  userStyle: {
    marginLeft: '5%',
  },
});
export default styles;
