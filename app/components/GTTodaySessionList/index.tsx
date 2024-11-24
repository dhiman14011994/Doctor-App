import {View, Text, ImageStyle, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import GTImage from '../GTImage';
import GTLabel from '../GTLabel';
// import {IMAGE_ICON, TICK_READ_ICON, VIDEO_ICON} from '../../assets';
import CONSTANTS from '../../utils/constants';
import styles from './styles';
import {MESSAGE_GREEN_ICON, Play_Blue_icon} from '../../assets';
import GTButton from '../GTButton';
import GTButtonContainer from '../GTButtonContainer';

interface GTTodaySessionListProps {
  message?: string;
  isMessage?: boolean;
  name?: string;
  container?: ViewStyle;
  isChat?: boolean;
  duration?: string;
  commentPress?: any;
  onChatCallPress?: any;
}

const GTTodaySessionList: FC<GTTodaySessionListProps> = ({
  name,
  container,
  message,
  isMessage,
  isChat,
  duration,
  commentPress,
  onChatCallPress,
}) => {
  return (
    <View style={{...styles.mainContainer, ...container}}>
      <View style={styles.nameContainer}>
        <GTLabel
          text={name || 'Abc kumar'}
          fontSize={CONSTANTS.THEME.size.s16}
          fontWeight="700"
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
        />
        <View style={styles.subDateContainer}>
          <GTLabel
            text={isChat ? 'Chat' : 'Audio'}
            fontSize={CONSTANTS.THEME.size.s12}
            fontWeight="400"
            color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
          />
          <View style={styles.lineStyles} />
          <GTLabel
            text={`${message}`}
            fontSize={CONSTANTS.THEME.size.s12}
            fontWeight="400"
            color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
            customStyle={{
              ...styles.messageTextStyle,
            }}
          />
          {!isChat && <View style={styles.lineStyles} />}
          {!isChat && (
            <GTLabel
              text={`Duration: ${duration}`}
              fontSize={CONSTANTS.THEME.size.s12}
              fontWeight="400"
              color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
            />
          )}

          {/* )} */}
        </View>
      </View>
      <View style={styles.subContainer}>
        <GTButton
          customStyle={{
            borderWidth: 1,
            borderRadius: CONSTANTS.THEME.size.s14,
            borderColor: CONSTANTS.THEME.colors.ORANGE,
            height: CONSTANTS.THEME.size.WIDTH * 0.1,
            width: CONSTANTS.THEME.size.WIDTH * 0.25,
          }}
          backgroundColor={CONSTANTS.THEME.colors.WHITE_COLOR}
          fontSize={CONSTANTS.THEME.size.s12}
          color={CONSTANTS.THEME.colors.ORANGE}
          text={'Comment'}
          onHandlePress={commentPress}
        />
        <GTButtonContainer onHandlePress={onChatCallPress}>
          {isChat ? (
            <MESSAGE_GREEN_ICON
              width={CONSTANTS.THEME.size.WIDTH * 0.1}
              height={CONSTANTS.THEME.size.WIDTH * 0.1}
            />
          ) : (
            <Play_Blue_icon
              width={CONSTANTS.THEME.size.WIDTH * 0.1}
              height={CONSTANTS.THEME.size.WIDTH * 0.1}
            />
          )}
        </GTButtonContainer>
      </View>
    </View>
  );
};

export default GTTodaySessionList;
