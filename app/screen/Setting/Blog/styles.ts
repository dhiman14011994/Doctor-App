import {Platform, StyleSheet} from 'react-native';
import CONSTANTS from '../../../utils/constants';
import {fontResize} from '../../../utils/fontResize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
  },
  headerContainer: {
    backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
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
    marginTop: '20%',
  },
  inputStyle: {
    height: CONSTANTS.THEME.size.s50,
  },
  inputFormContainer: {
    // height: CONSTANTS.THEME.size.HEIGHT * 0.78,
    marginTop: CONSTANTS.THEME.size.HEIGHT * 0.02,
  },
  bottomContainer: {
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: CONSTANTS.THEME.colors.NEUTRAL[300],
    marginTop: CONSTANTS.THEME.size.HEIGHT * 0.05,
    paddingVertical: CONSTANTS.THEME.size.HEIGHT * 0.05,
  },
  confirmContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    width: CONSTANTS.THEME.size.WIDTH * 0.3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calenderContainer: {
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    width: CONSTANTS.THEME.size.WIDTH * 0.94,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    padding: CONSTANTS.THEME.size.s20,
    borderRadius: CONSTANTS.THEME.size.s10,
  },
  selectedImageContaine: {
    width: CONSTANTS.THEME.size.WIDTH,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
  },
  selectImageView: {
    height: CONSTANTS.THEME.size.WIDTH * 0.8,
    width: '100%',
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
    borderStyle: 'dashed',
    borderRadius: CONSTANTS.THEME.size.WIDTH * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: CONSTANTS.THEME.size.s8,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: CONSTANTS.THEME.size.s14,
    width: '80%',
  },
  browserButton: {
    paddingHorizontal: CONSTANTS.THEME.size.s18,
    paddingVertical: CONSTANTS.THEME.size.s8,
    borderWidth: 1,
    borderColor: CONSTANTS.THEME.colors.LIGHT_WHITE,
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: CONSTANTS.THEME.size.s18,
  },
  imageView: {
    width: CONSTANTS.THEME.size.WIDTH,
    paddingHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    marginTop: CONSTANTS.THEME.size.WIDTH * 0.08,
  },
  closeContainer: {
    width: CONSTANTS.THEME.size.s30,
    height: CONSTANTS.THEME.size.s30,
    borderRadius: CONSTANTS.THEME.size.s30,
    backgroundColor: CONSTANTS.THEME.colors.Dark_Gunmetal,
    marginVertical: CONSTANTS.THEME.size.s10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageViewContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    padding: CONSTANTS.THEME.size.s20,
    borderColor: CONSTANTS.THEME.colors.LIGHT_WHITE,
    borderRadius: CONSTANTS.THEME.size.s10,
  },
  inputViewStyle: {
    width: '100%',
    // minHeight: fontResize(44),
    fontSize: CONSTANTS.THEME.size.s14,
    color: CONSTANTS.THEME.colors.SECONDARY_COLOR[80],
    padding: '3%',
  },
  inputContainer: {
    width: CONSTANTS.THEME.size.WIDTH * 0.94,
    maxHeight: fontResize(120),
    minHeight: fontResize(44),
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: CONSTANTS.THEME.size.s10,
    borderColor: CONSTANTS.THEME.colors.LIGHT_WHITE,
    backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    shadowColor: CONSTANTS.THEME.colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
    marginTop: CONSTANTS.THEME.size.s4,
    marginHorizontal: CONSTANTS.THEME.size.WIDTH * 0.03,
    marginBottom: CONSTANTS.THEME.size.s12,
    paddingVertical: 5,
  },
});

export default styles;
