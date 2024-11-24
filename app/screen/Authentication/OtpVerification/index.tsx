import {View, Text, Alert, StatusBar, BackHandler} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import GTSafeAreaView from '../../../components/GTSafeAreaView';
import GTLoginBack from '../../../components/GTLoginBack';
import {useNavigation, useRoute} from '@react-navigation/native';
import GTLabel from '../../../components/GTLabel';
import CONSTANTS from '../../../utils/constants';
import styles from './styles';
import GTOtpView from '../../../components/GTOtpView';
import GTButton from '../../../components/GTButton';
import Route from '../../../routes';
import {RouteNames} from '../../../utils/routesName';
import Toast from 'react-native-toast-message';
import {
  useResendOtpApiMutation,
  useVerifyOtpApiMutation,
} from '../../../redux/auth-api-slice';
import {setPrefsValue} from '../../../utils/storage';
import GTIndicator from '../../../components/GTIndicator';
import {
  setIsLive,
  setIsLogin,
  setToken,
  setUserInfo,
} from '../../../redux/app-api-slice';
import {useDispatch} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GTModal from '../../../components/GTModal';
import GTOnline from '../../../components/GTOnline';

const OtpVerification = () => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const dispatch = useDispatch();
  const [inputOtp, setInputOtp] = useState(['', '', '', '']);
  const [verifyApi, {isLoading: isVerifyLoading}] = useVerifyOtpApiMutation();
  const [resendApi, {isLoading: isResendLoading}] = useResendOtpApiMutation();
  const [isError, setError] = useState(false);
  const [isAccountVerifed, setIsAccountVerifed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    CONSTANTS.TEXT.VALID_VERIFICATION_CODE || '',
  );
  const [isResend, setResend] = useState(false);
  const [timeValue, setTimeValue] = useState(59);
  const insets = useSafeAreaInsets();
  const onRef: any = useRef(null);
  const timerRef: any = useRef(null);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
      if (onRef.current) {
        clearTimeout(onRef.current);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const onHandleRest = () => {
    setResend(true);
    setTimeValue(59);
    onResend();
  };

  useEffect(() => {
    if (isResend) {
      const interval = setInterval(() => {
        setTimeValue(preview => {
          if (preview <= 1) {
            clearInterval(interval);
            setResend(false);
            return preview;
          } else {
            return preview - 1;
          }
        });
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isResend]);

  const onHandlePress = () => {
    if (inputOtp[0] && inputOtp[1] && inputOtp[2] && inputOtp[3]) {
      onVerify(`${inputOtp[0]}${inputOtp[1]}${inputOtp[2]}${inputOtp[3]}`);
    } else {
      setError(true);
    }
  };

  const onVerify = (otp: any) => {
    const param = {
      countryCode: route?.params?.countryCode,
      mobileNumber: `${route?.params?.countryCode}${route?.params?.phone_number}`,
      otp: otp,
    };
    verifyApi(param)
      .unwrap()
      .then(async result => {
        if (result?.responseCode === 200) {
          if (result?.data.isLogIn) {
            if (result?.data?.isVerified) {
              setPrefsValue(
                CONSTANTS.STORAGE.PROFILE_UPDATE,
                result?.data?.isProfileUpdate,
              );
              setPrefsValue(
                CONSTANTS.STORAGE.USER_DATA,
                JSON.stringify(result?.data),
              );
              dispatch(setUserInfo(result.data));
              dispatch(setToken(result?.data?.accessToken));
              setPrefsValue(
                CONSTANTS.STORAGE.TOKEN,
                result?.data?.accessToken || '',
              );
              setPrefsValue(CONSTANTS.STORAGE.ISLOGGED, 'true');
              dispatch(setIsLogin(true));
              onRef.current = setTimeout(() => {
                dispatch(setIsLive(true));
              }, 1500);
            } else {
              setIsAccountVerifed(true);
            }
          } else {
            setPrefsValue(
              CONSTANTS.STORAGE.USER_DATA,
              JSON.stringify(result?.data),
            );
            dispatch(setUserInfo(result.data));
            dispatch(setToken(result?.data?.accessToken));
            setPrefsValue(
              CONSTANTS.STORAGE.TOKEN,
              result?.data?.accessToken || '',
            );
            //@ts-ignore
            navigation.navigate(RouteNames.PERSONAL_INFORMATION, {
              phone_number: `${route?.params?.phone_number}`,
              countryCode: `${route?.params?.countryCode}`,
            });
          }
        }
      })
      .catch(error => {
        console.log(error);
        // if we have the status error
        if (error?.responseCode === 400) {
          Toast.show({
            type: 'error',
            text1: CONSTANTS.TEXT.ERROR,
            text2: error?.data?.responseMessage || error?.responseMessage,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: CONSTANTS.TEXT.ERROR,
            text2:
              error?.data?.responseMessage ||
              error?.responseMessage ||
              error?.data?.error ||
              '',
          });
        }
      });
  };

  const onResend = () => {
    const param = {
      countryCode: route?.params?.countryCode,
      mobileNumber: `${route?.params?.countryCode}${route?.params?.phone_number}`,
    };
    console.log('param', param);
    resendApi(param)
      .unwrap()
      .then(async result => {
        console.log('result', result);
        if (result.responseCode === 200) {
          // setPrefsValue(CONSTANTS.STORAGE.TOKEN, result.token);
          Alert.alert(result?.responseMessage);
        } else {
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
      <GTLoginBack onHandlePress={() => navigation.goBack()} />
      <GTLabel
        text={CONSTANTS.TEXT.VERIFICATION_CODE}
        textAlign="center"
        fontSize={CONSTANTS.THEME.size.s28}
        color={CONSTANTS.THEME.colors.Dark_Gunmetal}
        fontWeight="700"
        customStyle={{marginTop: '8%'}}
      />
      <GTLabel
        text={`${CONSTANTS.TEXT.PLEASE_ENTER_CODE} ${
          `+${route?.params?.countryCode}${route?.params?.phone_number}` ||
          '+91 785464854'
        }`}
        color={CONSTANTS.THEME.colors.Light_Gunmetal}
        fontSize={CONSTANTS.THEME.size.s14}
        textAlign="center"
        fontWeight="400"
        customStyle={styles.enterCodeText}
      />
      <GTLabel
        text={CONSTANTS.TEXT.EDIT_NUMBER}
        color={CONSTANTS.THEME.colors.PRIMARY_COLOR}
        fontSize={CONSTANTS.THEME.size.s16}
        fontWeight="600"
        textAlign="center"
        onPress={() => navigation.goBack()}
        customStyle={{marginBottom: '15%'}}
      />

      <GTOtpView
        isError={isError}
        errorMessage={errorMessage}
        inputCount={4}
        onCodeFilled={(otp: any) => {
          setInputOtp(otp);
          setError(false);
        }}
        setError={(value: any) => {
          setError(value);
        }}
      />
      <View style={styles.buttonStyle}>
        {isResend ? (
          <GTLabel
            text={`${CONSTANTS.TEXT.RESEND_CODE} in 0:${timeValue}`}
            color={CONSTANTS.THEME.colors.Light_Gunmetal}
            fontSize={CONSTANTS.THEME.size.s12}
            fontWeight="400"
            textAlign="center"
            onPress={() => {}}
            customStyle={{marginBottom: '2%'}}
          />
        ) : (
          <GTLabel
            text={CONSTANTS.TEXT.RESEND_CODE}
            color={CONSTANTS.THEME.colors.PRIMARY_COLOR}
            fontSize={CONSTANTS.THEME.size.s12}
            fontWeight="600"
            textAlign="center"
            onPress={() => {
              onHandleRest();
            }}
            customStyle={{marginBottom: '3%'}}
          />
        )}

        <GTButton
          text={CONSTANTS.TEXT.CONTINUE}
          color={
            // !isResend &&
            inputOtp[0] && inputOtp[1] && inputOtp[2] && inputOtp[3]
              ? CONSTANTS.THEME.colors.WHITE_COLOR
              : CONSTANTS.THEME.colors.Light_Gunmetal
          }
          backgroundColor={
            // !isResend &&
            inputOtp[0] && inputOtp[1] && inputOtp[2] && inputOtp[3]
              ? CONSTANTS.THEME.colors.PRIMARY_COLOR
              : CONSTANTS.THEME.colors.LIGHT_WHITE
          }
          customStyle={styles.continueButton}
          disabled={
            // isResend ||
            inputOtp[0] == '' &&
            inputOtp[1] == '' &&
            inputOtp[2] == '' &&
            inputOtp[3] == ''
          }
          onHandlePress={() => {
            onHandlePress();
          }}
        />
      </View>
      <GTModal visible={isAccountVerifed}>
        <GTOnline
          isLogin={false}
          onClosePress={() => {
            setIsAccountVerifed(false);
            timerRef.current = setTimeout(() => {
              navigation.reset({
                index: 0,
                //@ts-ignore
                routes: [{name: RouteNames.WELCOME}],
              });
            });
          }}
        />
      </GTModal>
      {(isResendLoading || isVerifyLoading) && <GTIndicator />}
    </View>
  );
};

export default OtpVerification;
