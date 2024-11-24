import {TextInput, View} from 'react-native';
import React, {FC, useState} from 'react';
import styles from './styles';
import GTLabel from '../GTLabel';
import CONSTANTS from '../../utils/constants';
import GTButtonContainer from '../GTButtonContainer';
import {Error_Icon, SELECTED_CHECKBOX, X_CLOSE_ICON} from '../../assets';
import GTButton from '../GTButton';
import GTWelcomeHeader from '../GTWelcomeHeader';

interface GTWithdrawerAmountProps {
  onClosePress?: () => void;
  onHandlePress?: any;
  name?: string;
  type?: any;
  amount?: any;
  availableAmount?: any;
  setAmount?: any;
  withDrewalType?: any;
  setWithDrewalType?: any;
}

const GTWithdrawerAmount: FC<GTWithdrawerAmountProps> = ({
  onClosePress,
  name,
  type,
  onHandlePress,
  amount,
  availableAmount,
  setAmount,
  withDrewalType,
  setWithDrewalType,
}) => {
  const [isError, setIsError] = useState(false);
  const checkBalanceAmount = () => {
    if (withDrewalType == 'custom_amount') {
      if (amount == '') {
        setIsError(true);
      } else if (amount > availableAmount) {
        setIsError(true);
      } else {
        setIsError(false);
        onHandlePress();
      }
    } else {
      onHandlePress();
    }
  };
  return (
    <View style={{...styles.container}}>
      <View style={{...styles.mainContainer}}>
        <GTWelcomeHeader
          container={{
            width: CONSTANTS.THEME.size.WIDTH * 0.9,
          }}
        />
        <GTLabel
          text={CONSTANTS.TEXT.WITHDEAWAL_REQUEST}
          fontSize={CONSTANTS.THEME.size.s22}
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
          fontWeight={'700'}
          customStyle={{
            lineHeight: CONSTANTS.THEME.size.s32,
            marginTop: CONSTANTS.THEME.size.s14,
          }}
        />
        <GTLabel
          text={'do you wish to go inline?'}
          fontSize={CONSTANTS.THEME.size.s14}
          color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
          fontWeight={'400'}
          customStyle={{
            lineHeight: CONSTANTS.THEME.size.s22,
            marginBottom: CONSTANTS.THEME.size.s30,
          }}
          textAlign="center"
        />
        <View
          style={{
            ...styles.selectedAmountView,
            borderColor: CONSTANTS.THEME.colors.NEUTRAL[300],
            backgroundColor:
              withDrewalType == 'total_amount'
                ? CONSTANTS.THEME.colors.PRIMARY_COLORS[100]
                : CONSTANTS.THEME.colors.WHITE_COLOR,
          }}>
          <View style={styles.fixAmmountView}>
            <GTButtonContainer
              onHandlePress={() => setWithDrewalType('total_amount')}
              customStyle={{
                ...styles.checkBoxStyle,
                borderColor:
                  withDrewalType == 'total_amount'
                    ? CONSTANTS.THEME.colors.PRIMARY_COLOR
                    : CONSTANTS.THEME.colors.LIGHT_WHITE,
              }}>
              {withDrewalType == 'total_amount' && (
                <SELECTED_CHECKBOX
                  width={CONSTANTS.THEME.size.s20}
                  height={CONSTANTS.THEME.size.s20}
                />
              )}
            </GTButtonContainer>
            <GTLabel
              fontSize={CONSTANTS.THEME.size.s14}
              fontWeight="600"
              customStyle={{lineHeight: CONSTANTS.THEME.size.s22}}
              color={CONSTANTS.THEME.colors.Dark_Gunmetal}
              text={'Full Amount'}
            />
          </View>
          <GTLabel
            fontSize={CONSTANTS.THEME.size.s18}
            fontWeight="700"
            customStyle={{lineHeight: CONSTANTS.THEME.size.s24}}
            color={CONSTANTS.THEME.colors.PRIMARY_COLOR}
            text={'₹8000'}
          />
        </View>

        <View
          style={{
            ...styles.selectedAmountView,
            marginTop: 10,
            borderColor: isError
              ? CONSTANTS.THEME.colors.RED
              : CONSTANTS.THEME.colors.NEUTRAL[300],
            backgroundColor: isError
              ? '#FEF1F2'
              : CONSTANTS.THEME.colors.WHITE_COLOR,
          }}>
          <View style={styles.fixAmmountView}>
            <GTButtonContainer
              onHandlePress={() => setWithDrewalType('custom_amount')}
              customStyle={{
                ...styles.checkBoxStyle,
                borderColor:
                  withDrewalType == 'custom_amount'
                    ? CONSTANTS.THEME.colors.PRIMARY_COLOR
                    : CONSTANTS.THEME.colors.LIGHT_WHITE,
              }}>
              {withDrewalType == 'custom_amount' && (
                <SELECTED_CHECKBOX
                  width={CONSTANTS.THEME.size.s20}
                  height={CONSTANTS.THEME.size.s20}
                />
              )}
            </GTButtonContainer>
            <GTLabel
              fontSize={CONSTANTS.THEME.size.s14}
              fontWeight="600"
              customStyle={{lineHeight: CONSTANTS.THEME.size.s22}}
              color={CONSTANTS.THEME.colors.Dark_Gunmetal}
              text={'Custom Amount'}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              keyboardType="numeric"
              value={amount}
              style={styles.inputViewStyle}
              onChangeText={text => {
                setAmount(text);
                if (isError) {
                  setIsError(false);
                }
              }}
              placeholder={'e.g ₹1,000'}
              editable={withDrewalType == 'custom_amount'}
            />
          </View>
        </View>
        {isError && (
          <View style={styles.errorView}>
            <Error_Icon
              width={CONSTANTS.THEME.size.s14}
              height={CONSTANTS.THEME.size.s14}
            />
            <GTLabel
              text={
                amount == ''
                  ? 'Please enter the amount'
                  : 'Entered amount is grated than current amount'
              }
              color={CONSTANTS.THEME.colors.RED}
              fontSize={CONSTANTS.THEME.size.s12}
              fontWeight="400"
              customStyle={{marginLeft: '2%'}}
            />
          </View>
        )}

        <GTButton
          onHandlePress={() => {
            checkBalanceAmount();
          }}
          text={CONSTANTS.TEXT.SUBMIT}
          backgroundColor={CONSTANTS.THEME.colors.PRIMARY_COLOR}
          color={CONSTANTS.THEME.colors.WHITE_COLOR}
          fontSize={CONSTANTS.THEME.size.s16}
          fontWeight={'600'}
          customStyle={{...styles.buttonContainer}}
        />
      </View>
      <GTButtonContainer
        customStyle={styles.closeContainer}
        onHandlePress={onClosePress}>
        <X_CLOSE_ICON
          width={CONSTANTS.THEME.size.s18}
          height={CONSTANTS.THEME.size.s18}
        />
      </GTButtonContainer>
    </View>
  );
};

export default GTWithdrawerAmount;
