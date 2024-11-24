import {Dimensions, PixelRatio, Platform} from 'react-native';

export const fontResize = (fontSize: number): number => {
  const DEFAULT_RESIZE_SCREEN = Dimensions.get('window').width,
    scale = Dimensions.get('window').width / DEFAULT_RESIZE_SCREEN,
    newSize = fontSize * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
};
