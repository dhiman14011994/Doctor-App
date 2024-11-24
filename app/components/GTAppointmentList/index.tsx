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
import GTLinearGradientView from '../GTLinearGradientView';

interface GTAppointmentListProps {
  message?: string;
  isMessage?: boolean;
  name?: string;
  container?: ViewStyle;
  onHandlePress?: () => void;
  onPressComment?: () => void;
  isWait?: boolean;
  onPressConfirm?: () => void;
  onPressReject?: () => void;
  waitData?: any;
}

const GTAppointmentList: FC<GTAppointmentListProps> = ({
  name,
  container,
  message,
  isMessage,
  onHandlePress,
  onPressComment,
  isWait,
  onPressConfirm,
  onPressReject,
  waitData,
}) => {
  return (
    <View>
      <GTButtonContainer
        customStyle={{...styles.mainContainer, ...container}}
        disabled={isWait}
        onHandlePress={onHandlePress}>
        <View style={styles.subContainer}>
          {isMessage ? (
            <MESSAGE_GREEN_ICON
              width={CONSTANTS.THEME.size.s32}
              height={CONSTANTS.THEME.size.s32}
            />
          ) : (
            <Play_Blue_icon
              width={CONSTANTS.THEME.size.s32}
              height={CONSTANTS.THEME.size.s32}
            />
          )}

          <View style={styles.nameContainer}>
            <GTLabel
              text={name || 'Abc kumar'}
              fontSize={CONSTANTS.THEME.size.s16}
              fontWeight="700"
              color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            />
            <View style={styles.subDateContainer}>
              <GTLabel
                text={'Chat'}
                fontSize={CONSTANTS.THEME.size.s10}
                fontWeight="400"
                color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
                customStyle={{
                  ...styles.messageTextStyle,
                }}
              />
              <View style={styles.lineStyles} />
              <GTLabel
                text={`Date & Time: ${message}`}
                fontSize={CONSTANTS.THEME.size.s10}
                fontWeight="400"
                color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
                customStyle={{
                  ...styles.messageTextStyle,
                }}
              />
              {/* )} */}
            </View>
          </View>
        </View>
        {isWait ? (
          waitData ? (
            <View style={styles.timeView}>
              <GTLabel
                text={'Please wait'}
                color={CONSTANTS.THEME.colors.ORANGE}
                fontSize={CONSTANTS.THEME.size.s10}
                fontWeight="600"
              />
            </View>
          ) : (
            <View style={styles.timeView}>
              <GTButton
                onHandlePress={onPressConfirm}
                customStyle={{
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
                  height: CONSTANTS.THEME.size.s32,
                  marginBottom: CONSTANTS.THEME.size.s6,
                }}
                backgroundColor={CONSTANTS.THEME.colors.PRIMARY_COLOR}
                fontSize={CONSTANTS.THEME.size.s10}
                color={CONSTANTS.THEME.colors.WHITE_COLOR}
                text={'Confirm a slot'}
              />
              <GTButton
                onHandlePress={onPressReject}
                customStyle={{
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor: CONSTANTS.THEME.colors.ORANGE,
                  height: CONSTANTS.THEME.size.s32,
                }}
                backgroundColor={CONSTANTS.THEME.colors.WHITE_COLOR}
                fontSize={CONSTANTS.THEME.size.s10}
                color={CONSTANTS.THEME.colors.ORANGE}
                text={'Reject'}
              />
            </View>
          )
        ) : (
          <View style={styles.timeView}>
            <GTButton
              onHandlePress={onPressComment}
              customStyle={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: CONSTANTS.THEME.colors.ORANGE,
                height: CONSTANTS.THEME.size.s32,
              }}
              backgroundColor={CONSTANTS.THEME.colors.WHITE_COLOR}
              fontSize={CONSTANTS.THEME.size.s12}
              color={CONSTANTS.THEME.colors.ORANGE}
              text={'Comment'}
            />
          </View>
        )}
      </GTButtonContainer>
      <View style={styles.lineContainer}>
        <GTLinearGradientView
          color2={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100]}
          color1={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[0]}
          container={{
            width: '50%',
            height: 1,
          }}
        />
        <GTLinearGradientView
          color1={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100]}
          color2={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[0]}
          container={{
            width: '50%',
            height: 1,
          }}
        />
      </View>
    </View>
  );
};

export default GTAppointmentList;
