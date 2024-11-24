import React, {FC, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Slider from '@react-native-community/slider';
import styles from './styles';
import {secondsToHHMMSS} from '../../utils/customFunction';
import GTButtonContainer from '../GTButtonContainer';
import {X_CLOSE_ICON} from '../../assets';
import CONSTANTS from '../../utils/constants';

interface GTAudioPlayerProps {
  uri?: string;
  isPlaying?: boolean;
  currentDuration?: number;
  duration?: number;
  onPlayPausePress?: any;
  onClosePress?: any;
  image?: any;
  name?: string;
}

const GTAudioPlayer: FC<GTAudioPlayerProps> = ({
  uri,
  onPlayPausePress,
  isPlaying,
  currentDuration,
  duration,
  onClosePress,
  image,
  name,
}) => {
  const {
    playerMaxView,
    topSection,
    buttonsSection,
    progrsBarSection,
    buttonsCol,
    playPauseButton,
    playPauseIcon,
    trackArtBox,
    trackArt,
    trackDesc,
    trackTitle,
    trackSubtitle,
    closeContainer,
    container,
  } = styles;

  console.log(currentDuration, duration);

  const artImg = `https://picsum.photos/150/200/?random=12}`;

  return (
    <View style={container}>
      <GTButtonContainer
        customStyle={closeContainer}
        onHandlePress={onClosePress}>
        <X_CLOSE_ICON
          width={CONSTANTS.THEME.size.s18}
          height={CONSTANTS.THEME.size.s18}
        />
      </GTButtonContainer>

      <View style={playerMaxView}>
        <View style={topSection}>
          <View style={trackArtBox}>
            <Image style={trackArt} source={{uri: image || artImg}} />
          </View>
          <View style={trackDesc}>
            <View>
              <Text style={trackTitle}>{name || 'Abc'}</Text>
            </View>
          </View>
        </View>
        <View style={progrsBarSection}>
          <Text>{secondsToHHMMSS(Math.floor(currentDuration || 0))}</Text>
          <Slider
            style={{width: '70%', height: 40}}
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor="#52527a"
            maximumTrackTintColor="#52527a"
            thumbTintColor="#52527a"
            value={currentDuration}
          />
          <Text>{secondsToHHMMSS(duration || 0)}</Text>
        </View>
        <View style={buttonsSection}>
          <View style={buttonsCol}>
            <TouchableOpacity
              onPress={onPlayPausePress}
              style={playPauseButton}>
              <Image
                source={{
                  uri: isPlaying
                    ? 'https://img.icons8.com/ios-filled/50/FFFFFF/pause--v1.png'
                    : 'https://img.icons8.com/ios-glyphs/50/FFFFFF/play--v1.png',
                }}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GTAudioPlayer;
