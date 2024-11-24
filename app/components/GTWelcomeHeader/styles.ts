import {StyleSheet} from 'react-native';
import CONSTANTS from '../../utils/constants';

const styles = StyleSheet.create({
  constainer: {
    width: CONSTANTS.THEME.size.WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: '1%',
  },
});

export default styles;
