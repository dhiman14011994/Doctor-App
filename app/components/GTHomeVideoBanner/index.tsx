import {ImageBackground} from 'react-native';
import React, {FC} from 'react';
import {Play_Icon, Thumbnails_image} from '../../assets';
import styles from './styles';
import GTButtonContainer from '../GTButtonContainer';
import CONSTANTS from '../../utils/constants';

interface GTHomeBannerProps {
  uri?: string;
  container?: any;
  onPlayPress?: () => void;
  index?: number;
}
const GTHomeVideoBanner: FC<GTHomeBannerProps> = ({
  uri,
  container,
  onPlayPress,
  index,
}) => {
  return (
    <ImageBackground
      style={{
        ...styles.container,
        ...container,
        marginLeft: index == 0 ? CONSTANTS.THEME.size.WIDTH * 0.05 : 0,
      }}
      source={uri ? {uri: uri} : Thumbnails_image}>
      <GTButtonContainer onHandlePress={onPlayPress}>
        <Play_Icon
          width={CONSTANTS.THEME.size.s32}
          height={CONSTANTS.THEME.size.s32}
        />
      </GTButtonContainer>
    </ImageBackground>
  );
};

export default GTHomeVideoBanner;
