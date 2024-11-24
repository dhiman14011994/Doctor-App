import {Platform, StyleSheet} from 'react-native';
import CONSTANTS from '../../../utils/constants';
CONSTANTS;

const styles = StyleSheet.create({
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
});

export default styles;
