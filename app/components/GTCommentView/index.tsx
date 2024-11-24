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

interface GTCommentViewProps {
  onClosePress?: () => void;
  onHandlePress?: any;
  name?: string;
  comment?: any;
  setComment?: any;
  isLoading?: boolean;
  isKeyboard?: boolean;
}

const GTCommentView: FC<GTCommentViewProps> = ({
  onClosePress,
  name,
  onHandlePress,
  comment,
  setComment,
  isLoading,
  isKeyboard,
}) => {
  const [isError, setIsError] = useState(false);
  const checkBalanceAmount = () => {
    if (comment == '') {
      setIsError(true);
    } else {
      setIsError(false);
      onHandlePress();
    }
  };
  const cureentDate = moment().format('llll');
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
                  text={CONSTANTS.TEXT.COMMENT}
                  fontSize={CONSTANTS.THEME.size.s22}
                  color={CONSTANTS.THEME.colors.Dark_Gunmetal}
                  fontWeight={'700'}
                  customStyle={{
                    lineHeight: CONSTANTS.THEME.size.s32,
                    marginTop: CONSTANTS.THEME.size.s14,
                  }}
                />
                <GTLabel
                  text={name}
                  fontSize={CONSTANTS.THEME.size.s22}
                  color={CONSTANTS.THEME.colors.Dark_Gunmetal}
                  fontWeight={'700'}
                  customStyle={{
                    lineHeight: CONSTANTS.THEME.size.s32,
                  }}
                />
                <GTLabel
                  text={`Time: ${cureentDate}`}
                  fontSize={CONSTANTS.THEME.size.s14}
                  color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
                  fontWeight={'400'}
                  customStyle={{
                    lineHeight: CONSTANTS.THEME.size.s22,
                    marginBottom: CONSTANTS.THEME.size.s30,
                  }}
                  textAlign="center"
                />

                <View style={{flexDirection: 'row', width: '94%'}}>
                  <GTLabel
                    text={CONSTANTS.TEXT.COMMENT}
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
                      setComment(text);
                      if (isError) {
                        setIsError(false);
                      }
                    }}
                    multiline
                    placeholder={CONSTANTS.TEXT.ENTER_COMMENT}
                    maxLength={250}
                  />
                </View>
                {isError && (
                  <View style={styles.errorView}>
                    <Error_Icon
                      width={CONSTANTS.THEME.size.s14}
                      height={CONSTANTS.THEME.size.s14}
                    />
                    <GTLabel
                      text={'Please enter the comment'}
                      color={CONSTANTS.THEME.colors.RED}
                      fontSize={CONSTANTS.THEME.size.s12}
                      fontWeight="400"
                      customStyle={{marginLeft: '2%'}}
                    />
                  </View>
                )}

                <GTButtonContainer
                  onHandlePress={() => {
                    checkBalanceAmount();
                  }}
                  disabled={isLoading || comment.length < 4}
                  customStyle={{
                    ...styles.buttonContainer,
                    backgroundColor:
                      comment.length < 4
                        ? CONSTANTS.THEME.colors.LIGHT_WHITE
                        : CONSTANTS.THEME.colors.PRIMARY_COLOR,
                    borderColor:
                      comment.length < 4
                        ? CONSTANTS.THEME.colors.LIGHT_WHITE
                        : CONSTANTS.THEME.colors.PRIMARY_COLOR,
                  }}>
                  {isLoading ? (
                    <ActivityIndicator
                      size={'large'}
                      color={CONSTANTS.THEME.colors.WHITE_COLOR}
                    />
                  ) : (
                    <GTLabel
                      text={CONSTANTS.TEXT.SUBMIT}
                      color={
                        comment.length < 4
                          ? CONSTANTS.THEME.colors.Light_Gunmetal
                          : CONSTANTS.THEME.colors.WHITE_COLOR
                      }
                      fontSize={CONSTANTS.THEME.size.s16}
                      fontWeight={'600'}
                      fontFamily={CONSTANTS.THEME.typography.fontFamily.Black}
                      customStyle={{paddingHorizontal: CONSTANTS.THEME.size.s2}}
                    />
                  )}
                </GTButtonContainer>
              </View>
            </KeyboardAwareScrollView>
          </GTScrollView>
        </View>

        <GTButtonContainer
          customStyle={styles.closeContainer}
          onHandlePress={onClosePress}>
          <X_CLOSE_ICON
            width={CONSTANTS.THEME.size.s18}
            height={CONSTANTS.THEME.size.s18}
          />
        </GTButtonContainer>
        {isKeyboard && (
          <View
            style={{
              height:
                CONSTANTS.THEME.size.WIDTH > 350
                  ? CONSTANTS.THEME.size.WIDTH * 0.4
                  : CONSTANTS.THEME.size.WIDTH,
            }}
          />
        )}
      </GTScrollView>
    </View>
  );
};

export default GTCommentView;
