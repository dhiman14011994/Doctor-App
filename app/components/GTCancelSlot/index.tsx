import {ActivityIndicator, TextInput, View} from 'react-native';
import React, {FC, useState} from 'react';
import styles from './styles';
import GTLabel from '../GTLabel';
import CONSTANTS from '../../utils/constants';
import GTButtonContainer from '../GTButtonContainer';
import {Error_Icon, SELECTED_CHECKBOX, X_CLOSE_ICON} from '../../assets';
import GTButton from '../GTButton';
import GTWelcomeHeader from '../GTWelcomeHeader';
import moment from 'moment';
import GTIndicator from '../GTIndicator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GTScrollView from '../GTScrollView';

interface GTCancelSlotProps {
  onClosePress?: () => void;
  comment?: any;
  noButtonPress?: any;
  yesButtonPress?: any;
  isKeyboard?: boolean;
  setReason?: any;
}

const GTCancelSlot: FC<GTCancelSlotProps> = ({
  onClosePress,
  comment,
  noButtonPress,
  yesButtonPress,
  isKeyboard,
  setReason,
}) => {
  return (
    <View style={{...styles.container}}>
      <GTScrollView>
        <View style={{...styles.mainContainer}}>
          <GTScrollView>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.subContainer}>
                <GTWelcomeHeader
                  container={{
                    width: CONSTANTS.THEME.size.WIDTH * 0.9,
                  }}
                />
                <GTLabel
                  text={CONSTANTS.TEXT.ARE_YOU_SURE_CANCEL}
                  fontSize={CONSTANTS.THEME.size.s22}
                  color={CONSTANTS.THEME.colors.Dark_Gunmetal}
                  fontWeight={'700'}
                  customStyle={{
                    lineHeight: CONSTANTS.THEME.size.s32,
                  }}
                />

                <View style={{flexDirection: 'row', width: '94%'}}>
                  <GTLabel
                    text={CONSTANTS.TEXT.REASON_FOR_CANCEL}
                    fontSize={CONSTANTS.THEME.size.s14}
                    color={CONSTANTS.THEME.colors.Dark_Gunmetal}
                    fontWeight={'600'}
                    customStyle={{
                      lineHeight: CONSTANTS.THEME.size.s22,
                    }}
                  />
                  <GTLabel
                    text={'*'}
                    fontSize={CONSTANTS.THEME.size.s12}
                    color={CONSTANTS.THEME.colors.RED}
                    fontWeight={'500'}
                    customStyle={{
                      lineHeight: CONSTANTS.THEME.size.s18,
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={comment}
                    style={styles.inputViewStyle}
                    onChangeText={text => {
                      setReason(text);
                    }}
                    multiline
                    placeholder={CONSTANTS.TEXT.ENTER_REASON_FOR_CANCEL}
                    maxLength={250}
                  />
                </View>

                <View style={styles.buttonViewStyle}>
                  <GTButton
                    text={CONSTANTS.TEXT.NO}
                    backgroundColor={CONSTANTS.THEME.colors.WHITE_COLOR}
                    color={CONSTANTS.THEME.colors.PRIMARY_COLOR}
                    fontSize={CONSTANTS.THEME.size.s16}
                    fontWeight={'600'}
                    customStyle={{...styles.buttonContainer}}
                    onHandlePress={noButtonPress}
                  />
                  <GTButton
                    text={CONSTANTS.TEXT.YES}
                    backgroundColor={CONSTANTS.THEME.colors.PRIMARY_COLOR}
                    color={CONSTANTS.THEME.colors.WHITE_COLOR}
                    fontSize={CONSTANTS.THEME.size.s16}
                    fontWeight={'600'}
                    customStyle={{...styles.buttonContainer}}
                    onHandlePress={yesButtonPress}
                  />
                </View>
                {/* {isKeyboard && (
                  <View style={{height: CONSTANTS.THEME.size.WIDTH}} />
                )} */}
              </View>
            </KeyboardAwareScrollView>
          </GTScrollView>
        </View>
        {isKeyboard && (
          <View
            style={{
              height:
                CONSTANTS.THEME.size.WIDTH > 400
                  ? CONSTANTS.THEME.size.WIDTH * 0.2
                  : CONSTANTS.THEME.size.WIDTH,
            }}
          />
        )}

        <GTButtonContainer
          customStyle={styles.closeContainer}
          onHandlePress={onClosePress}>
          <X_CLOSE_ICON
            width={CONSTANTS.THEME.size.s18}
            height={CONSTANTS.THEME.size.s18}
          />
        </GTButtonContainer>
      </GTScrollView>
    </View>
  );
};

export default GTCancelSlot;
