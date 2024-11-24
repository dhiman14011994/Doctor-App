import {Platform, StyleSheet} from 'react-native';
import CONSTANTS from '../../../utils/constants';
CONSTANTS;

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
    marginBottom: CONSTANTS.THEME.size.WIDTH * 0.07,
  },
  buttonStyle: {
    marginTop: '20%',
  },
  nameInputView: {
    width: CONSTANTS.THEME.size.WIDTH * 0.5,
    borderRadius: CONSTANTS.THEME.size.s26,
  },
  inputContainer: {
    borderRadius: CONSTANTS.THEME.size.s26,
  },
  inputStyle: {
    fontSize: CONSTANTS.THEME.size.s14,
    color: CONSTANTS.THEME.colors.Dark_Gunmetal,
    fontWeight: '400',
  },
});

export default styles;
