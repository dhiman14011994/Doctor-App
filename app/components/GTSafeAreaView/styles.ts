import {Platform, StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
    ...Platform.select({
      ios: {
        paddingTop: 0,
      },
      android: {
        // paddingTop: StatusBar.currentHeight,
        paddingTop: 0,
      },
    }),
  },
});
export default styles;
