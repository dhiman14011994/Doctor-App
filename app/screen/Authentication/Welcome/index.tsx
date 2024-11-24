import {
  View,
  Platform,
  StatusBar,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import GTSafeAreaView from '../../../components/GTSafeAreaView';
import GTWelcomeHeader from '../../../components/GTWelcomeHeader';
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  MobileIcon,
  Welcome_Icon,
} from '../../../assets';
import CONSTANTS from '../../../utils/constants';
import GTLabel from '../../../components/GTLabel';
import styles from './styles';
import GTButton from '../../../components/GTButton';
import GTButtonContainer from '../../../components/GTButtonContainer';
import GTScrollView from '../../../components/GTScrollView';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../../utils/routesName';
import GTORView from '../../../components/GTORView';
import {setPrefsValue} from '../../../utils/storage';
import {useSocialLoginMutation} from '../../../redux/auth-api-slice';
import Toast from 'react-native-toast-message';
import {appleLogin, googleLogin} from '../../../utils/socialLogin';
import GTIndicator from '../../../components/GTIndicator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Welcome = () => {
  const navigation = useNavigation();
  const [socialLogin, {isLoading: socialLoginLoading}] =
    useSocialLoginMutation();
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit app!', 'Are you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const logWithSocial = (params: any) => {
    console.log('params', params);
    socialLogin(params)
      .unwrap()
      .then(async result => {
        if (result.responseCode === 200) {
          // setPrefsValue(CONSTANTS.STORAGE.TOKEN, result.token);
          // setPrefsValue(
          //   CONSTANTS.STORAGE.USER_DATA,
          //   JSON.stringify(result.data),
          // );
          setPrefsValue(CONSTANTS.STORAGE.ISLOGGED, 'true');
          // dispatch(setIsLogin(true));
          //  Condition is commented as not required to setup the profile.
          // if (result?.data?.is_profile_setup) {
          // setPrefsValue(CONSTANTS.STORAGE.IS_GUEST_USER, 'false');
          //@ts-ignore
          navigation.navigate(RouteNames.PERSONAL_INFORMATION);

          // } else {
          //   navigation.navigate(RouteNames.PROFILE_SETUP);
          // }
        } else {
          // save the user data
          // setPrefsValue(CONSTANTS.STORAGE.ISLOGGED, 'true');
          // setPrefsValue(CONSTANTS.STORAGE.TOKEN, result.data.accessToken);
          // setPrefsValue(STRINGS.STORAGE.USER_DATA, JSON.stringify(result.data));
          // reset stack to home
        }
      })
      .catch(error => {
        // if we have the status error
        console.log('error', error);
        if (error?.responseCode === 404) {
          Toast.show({
            type: 'error',
            text1: CONSTANTS.TEXT.ERROR,
            text2: error.data.error,
          });
        }
      });
  };

  return (
    <View
      style={{
        backgroundColor: CONSTANTS.THEME.colors.BackgroundColor,
        flex: 1,
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
      <GTScrollView>
        <StatusBar backgroundColor={CONSTANTS.THEME.colors.BackgroundColor} />
        <GTWelcomeHeader />
        <Image
          source={Welcome_Icon}
          resizeMode="cover"
          style={styles.imageStyle}
        />

        <View style={styles.constainer}>
          <View style={styles.welcomeContainer}>
            <GTLabel
              text={`${CONSTANTS.TEXT.WELCOME_WORLD} `}
              color={CONSTANTS.THEME.colors.Light_Gunmetal}
              fontSize={CONSTANTS.THEME.size.s12}
              fontWeight="400"
            />
            <GTLabel
              text={CONSTANTS.TEXT.PSYCHOLOGY}
              color={CONSTANTS.THEME.colors.PRIMARY_COLOR}
              fontSize={CONSTANTS.THEME.size.s12}
              fontWeight="700"
            />
          </View>
          <GTLabel
            text={`${CONSTANTS.TEXT.MINDFULL},`}
            color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            fontSize={CONSTANTS.THEME.size.s28}
            fontWeight="700"
            customStyle={{marginTop: '1%'}}
          />
          <GTLabel
            text={CONSTANTS.TEXT.PERSONAL_GROWTH}
            color={CONSTANTS.THEME.colors.PRIMARY_COLOR}
            fontSize={CONSTANTS.THEME.size.s28}
            fontWeight="800"
          />
          <GTLabel
            text={CONSTANTS.TEXT.LOREM_TEXT}
            color={CONSTANTS.THEME.colors.Light_Primary_Gunmetal}
            fontFamily={CONSTANTS.THEME.typography.fontFamily.Black}
            fontWeight="400"
            fontSize={CONSTANTS.THEME.size.s14}
            customStyle={{lineHeight: CONSTANTS.THEME.size.s22}}
          />

          <GTButton
            //@ts-ignore
            onHandlePress={() => navigation.navigate(RouteNames.LOGIN)}
            leftIcon={<MobileIcon width={'100%'} height={'100%'} />}
            text={CONSTANTS.TEXT.SIGN_IN_VIA}
            color={CONSTANTS.THEME.colors.WHITE_COLOR}
            customStyle={styles.buttonStyle}
            leftStyle={{marginRight: CONSTANTS.THEME.size.s4}}
          />
          <GTORView />

          <GTButton
            //@ts-ignore
            onHandlePress={() => navigation.navigate(RouteNames.LOGIN)}
            text={CONSTANTS.TEXT.REGISTER}
            color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            customStyle={styles.registerButtonStyle}
            backgroundColor={CONSTANTS.THEME.colors.WHITE_COLOR}
          />
          <View style={styles.socialContainer}>
            {/* <GTButtonContainer
              onHandlePress={() => {
                googleLogin((token: any, email: string) => {
                  const params = {
                    social_type: 'google',
                    firebase_token: token,
                    email: email,
                  };
                  logWithSocial(params);
                });
              }}>
              <GoogleIcon
                height={CONSTANTS.THEME.size.s24}
                width={CONSTANTS.THEME.size.s24}
              />
            </GTButtonContainer> */}
            {/* <GTButtonContainer>
            <FacebookIcon
              height={CONSTANTS.THEME.size.s24}
              width={CONSTANTS.THEME.size.s24}
            />
          </GTButtonContainer> */}
            {/* {Platform.OS == 'ios' && (
              <GTButtonContainer
                onHandlePress={() => {
                  appleLogin((token: any) => {
                    const params = {
                      social_type: 'apple',
                      firebase_token: token,
                      email: '-',
                    };
                    logWithSocial(params);
                  });
                }}>
                <AppleIcon
                  height={CONSTANTS.THEME.size.s24}
                  width={CONSTANTS.THEME.size.s24}
                />
              </GTButtonContainer>
            )} */}
          </View>
        </View>
      </GTScrollView>
      {socialLoginLoading && <GTIndicator />}
    </View>
  );
};

export default Welcome;
