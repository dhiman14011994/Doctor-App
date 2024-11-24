import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteNames} from '../utils/routesName';
import {
  Login,
  OtpVerification,
  PersonalInformation,
  Welcome,
  Home,
  Profile,
} from '../screen';
import {useDispatch, useSelector} from 'react-redux';
import {getPrefsValue} from '../utils/storage';
import {setIsLogin, setToken, setUserInfo} from '../redux/app-api-slice';
import CONSTANTS from '../utils/constants';
import BottomTabBar from './bottomTabBar';

import NetInfo from '@react-native-community/netinfo';
import GTNoInternetScreen from '../components/GTNoInternetScreen';
import socketServices from '../utils/socketService';

const AuthStack = createNativeStackNavigator();

const AuthenticationStack = () => {
  const isLogin = useSelector(state => state.appState.isLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    getLocalInfo();
  }, []);

  const [isConnected, setConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('state.isConnected', state.isConnected);
      setConnected(state.isConnected);
      if (state.isConnected) {
        socketServices.initializeSocket();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getLocalInfo = () => {
    const isLoginValue = getPrefsValue(CONSTANTS.STORAGE.ISLOGGED);
    const token = getPrefsValue(CONSTANTS.STORAGE.TOKEN);
    const userInfo = getPrefsValue(CONSTANTS.STORAGE.USER_DATA);

    dispatch(setIsLogin(isLoginValue === 'true'));
    dispatch(setToken(token == null || token == undefined ? '' : token));
    dispatch(
      setUserInfo(
        userInfo == null
          ? {}
          : userInfo == undefined
          ? {}
          : userInfo == ''
          ? {}
          : JSON.parse(userInfo),
      ),
    );
  };

  if (!isConnected) {
    return (
      <View>
        <GTNoInternetScreen />
      </View>
    );
  }

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isLogin ? (
        <>
          <AuthStack.Screen name={RouteNames.WELCOME} component={Welcome} />
          <AuthStack.Screen name={RouteNames.LOGIN} component={Login} />
          <AuthStack.Screen
            name={RouteNames.OTP_VERIFICATION}
            component={OtpVerification}
          />
          <AuthStack.Screen
            name={RouteNames.PERSONAL_INFORMATION}
            component={PersonalInformation}
          />
        </>
      ) : (
        <>
          <AuthStack.Screen
            name={RouteNames.BOTTOM_TAB}
            component={BottomTabBar}
          />
          {/* <AuthStack.Screen name={RouteNames.HOME} component={Home} />
          <AuthStack.Screen name={RouteNames.PROFILE} component={Profile} /> */}
        </>
      )}
    </AuthStack.Navigator>
  );
};

export default AuthenticationStack;
