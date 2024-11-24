import {View, Text, TextInput} from 'react-native';
import React, {FC} from 'react';
import GTButtonContainer from '../GTButtonContainer';
import CONSTANTS from '../../utils/constants';
import {
  ACTIVE_EMOJI_ICON,
  CAMERA_ICON,
  EMOJI_icon,
  MIC_ICON,
  PAPER_CLIP_ICON,
  SEND_ICON,
} from '../../assets';

interface GTRenderInputToolbarProps {
  onEmojiPress?: () => void;
  mediaPress?: () => void;
  onChangeText?: any;
  value?: any;
  onSendMessage?: () => void;
  isSelectedEmoji?: boolean;
  onFocus?: () => void;
  ref?: any;
}

const GTRenderInputToolbar: FC<GTRenderInputToolbarProps> = React.forwardRef(
  (
    {
      onEmojiPress,
      mediaPress,
      onChangeText,
      value,
      onSendMessage,
      isSelectedEmoji,
      onFocus,
    },
    ref?: any,
  ) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: CONSTANTS.THEME.size.WIDTH,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: '2%',
          paddingVertical: 5,
          backgroundColor: CONSTANTS.THEME.colors.BackgroundColor,
        }}>
        <GTButtonContainer
          onHandlePress={onEmojiPress}
          customStyle={{
            width: '10%',
            height: CONSTANTS.THEME.size.s40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isSelectedEmoji ? (
            <ACTIVE_EMOJI_ICON
              width={CONSTANTS.THEME.size.s28}
              height={CONSTANTS.THEME.size.s28}
            />
          ) : (
            <EMOJI_icon
              width={CONSTANTS.THEME.size.s28}
              height={CONSTANTS.THEME.size.s28}
            />
          )}
        </GTButtonContainer>
        <View
          style={{
            backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
            padding: CONSTANTS.THEME.size.s8,
            width: '72%',
            borderRadius: CONSTANTS.THEME.size.BUTTON_HEIGHT,
            minHeight: CONSTANTS.THEME.size.s40,
            justifyContent: 'center',
          }}>
          <TextInput
            ref={ref}
            style={{
              width: '100%',
              paddingHorizontal: '5%',
              color: CONSTANTS.THEME.colors.BLACK,
            }}
            placeholder={CONSTANTS.TEXT.TYPE_YOUR_MESSAGE}
            onChangeText={onChangeText}
            value={value}
            onFocus={onFocus}
            multiline
          />
        </View>
        {value != '' ? (
          <GTButtonContainer onHandlePress={onSendMessage}>
            <SEND_ICON
              width={CONSTANTS.THEME.size.s36}
              height={CONSTANTS.THEME.size.s36}
            />
          </GTButtonContainer>
        ) : (
          <GTButtonContainer
            onHandlePress={mediaPress}
            customStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: CONSTANTS.THEME.size.s4,
            }}>
            <PAPER_CLIP_ICON
              width={CONSTANTS.THEME.size.s28}
              height={CONSTANTS.THEME.size.s28}
            />
          </GTButtonContainer>
        )}
      </View>
    );
  },
);

export default GTRenderInputToolbar;
