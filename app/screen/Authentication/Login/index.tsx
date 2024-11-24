import {View, Text, StatusBar, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import GTSafeAreaView from '../../../components/GTSafeAreaView';
import GTButtonContainer from '../../../components/GTButtonContainer';
import {Error_Icon, Left_Back_icon} from '../../../assets';
import CONSTANTS from '../../../utils/constants';
import GTLabel from '../../../components/GTLabel';
import GTLoginBack from '../../../components/GTLoginBack';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import GTButton from '../../../components/GTButton';
import GTLoginPhoneNumberInput from '../../../components/GTLoginPhoneNumberInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GTScrollView from '../../../components/GTScrollView';
import {RouteNames} from '../../../utils/routesName';
import Toast from 'react-native-toast-message';
import {setPrefsValue} from '../../../utils/storage';
import {useLoginApiMutation} from '../../../redux/auth-api-slice';
import GTIndicator from '../../../components/GTIndicator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';

const Login = () => {
  const navigation = useNavigation();
  const [countryCode, setCountryCode] = useState('91');
  const [countryName, setCountryName] = useState('IN');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberErr, setPhoneNumberErr] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const [loginApi, {isLoading}] = useLoginApiMutation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getToken();
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const getToken = () => {
    messaging()
      .getToken()
      .then(token => {
        setFcmToken(token);
      })
      .catch(error => {
        console.log('error getting push token ' + error);
      });
  };

  const onSubmitLogin = () => {
    if (phoneNumber.length < 9) {
      setPhoneNumberErr(CONSTANTS.TEXT.INVALID_PHONE_NUMBER);
      return;
    }
    console.log('fcmToken', fcmToken);
    const param = fcmToken
      ? {
          countryCode: countryCode,
          mobileNumber: countryCode + phoneNumber,
          fcmToken: fcmToken || '',
        }
      : {
          countryCode: countryCode,
          mobileNumber: countryCode + phoneNumber,
        };
    loginApi(param)
      .unwrap()
      .then(async result => {
        if (result.responseCode === 200) {
          Toast.show({
            type: 'success',
            text2: 'Otp send successfully',
          });
          //@ts-ignore
          navigation.navigate(RouteNames.OTP_VERIFICATION, {
            phone_number: `${phoneNumber}`,
            countryCode: `${countryCode}`,
          });
        }
      })
      .catch(error => {
        console.log(error);
        // if we have the status error
        if (error?.responseCode === 400) {
          Toast.show({
            type: 'error',
            text1: CONSTANTS.TEXT.ERROR,
            text2: error.data.responseMessage,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: CONSTANTS.TEXT.ERROR,
            text2: error?.data?.error || '',
          });
        }
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: CONSTANTS.THEME.colors.BackgroundColor,
      }}>
      <View
        style={{
          height: insets.top,
          backgroundColor: CONSTANTS.THEME.colors.TRANSPARENT,
        }}>
        <StatusBar
          translucent={true}
          backgroundColor={CONSTANTS.THEME.colors.TRANSPARENT}
        />
      </View>
      <StatusBar backgroundColor={CONSTANTS.THEME.colors.BackgroundColor} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <GTLoginBack onHandlePress={() => navigation.goBack()} />
        <GTLabel
          text={CONSTANTS.TEXT.YOUR_NUMBER}
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
          fontSize={CONSTANTS.THEME.size.s28}
          textAlign="center"
          fontWeight="700"
          customStyle={styles.yourText}
        />
        <GTLabel
          text={CONSTANTS.TEXT.ENTER_PHONE_NUMBER}
          color={CONSTANTS.THEME.colors.Light_Gunmetal}
          fontSize={CONSTANTS.THEME.size.s14}
          textAlign="center"
          fontWeight="400"
        />

        <GTLoginPhoneNumberInput
          container={styles.inputContainer}
          onChangeText={(text: string) => {
            setPhoneNumber(text);
            if (phoneNumberErr) {
              setPhoneNumberErr('');
            }
          }}
          value={phoneNumber}
          onSelectCode={(code: any) => {
            setCountryCode(`${code.callingCode[0]}`);
            setCountryName(code?.cca2);
          }}
          keyboardType={CONSTANTS.KEYBOARD_TYPE.NUMBER_PAD}
          placeholder={CONSTANTS.TEXT.PHONE_NUMBER}
          countryCode={countryCode}
          countryName={countryName}
          customContainerStyle={{
            color: phoneNumberErr
              ? CONSTANTS.THEME.colors.RED
              : CONSTANTS.THEME.colors.Dark_Gunmetal,
          }}
          crossButtonPress={() => {
            setPhoneNumber('');
            setPhoneNumberErr('');
          }}
          maxLength={10}
        />
        {phoneNumberErr && (
          <View style={styles.errorView}>
            <Error_Icon
              width={CONSTANTS.THEME.size.s14}
              height={CONSTANTS.THEME.size.s14}
            />
            <GTLabel
              text={phoneNumberErr}
              color={CONSTANTS.THEME.colors.RED}
              fontSize={CONSTANTS.THEME.size.s12}
              fontWeight="400"
              customStyle={{marginLeft: '2%'}}
            />
          </View>
        )}

        <GTLabel
          text={CONSTANTS.TEXT.MAKE_SURE}
          color={CONSTANTS.THEME.colors.Light_Gunmetal}
          fontSize={CONSTANTS.THEME.size.s12}
          textAlign="center"
          fontWeight="400"
          customStyle={styles.makeSureText}
        />
        <GTButton
          text={CONSTANTS.TEXT.CONTINUE}
          color={
            phoneNumber.length > 6
              ? CONSTANTS.THEME.colors.WHITE_COLOR
              : CONSTANTS.THEME.colors.Light_Gunmetal
          }
          backgroundColor={
            phoneNumber.length > 6
              ? CONSTANTS.THEME.colors.PRIMARY_COLOR
              : CONSTANTS.THEME.colors.LIGHT_WHITE
          }
          customStyle={styles.continueButton}
          disabled={phoneNumber.length < 6}
          onHandlePress={() => {
            onSubmitLogin();
          }}
        />
      </KeyboardAwareScrollView>
      {isLoading && <GTIndicator />}
    </View>
  );
};

export default Login;
