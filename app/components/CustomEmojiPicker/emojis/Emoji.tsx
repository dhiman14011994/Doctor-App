import React, {memo} from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

import shortnameToUnicode from '../helpers/shortnameToUnicode';
import {fontResize} from '../../../utils/fontResize';
import CONSTANTS from '../../../utils/constants';

const Emoji = ({item, onPress}: any) => {
  return (
    <TouchableOpacity style={styles.emojiContainer} onPress={onPress}>
      <Text style={styles.emoji}>{shortnameToUnicode[`:${item}:`]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emojiContainer: {
    // marginHorizontal: Dimensions.get('screen').width * 0.011,
    width: CONSTANTS.THEME.size.WIDTH * 0.11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: fontResize(22),
  },
});

export default memo(Emoji);
