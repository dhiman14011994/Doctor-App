import React, { useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteNames } from '../utils/routesName';

import { BackHandler, AppState, Alert } from 'react-native';
// import {Psychologist} from '../screen';
import Home from '../screen/DashBoard/Home';
import SettingsStack from './settingstack';
import { UserCall, UserChat } from '../screen';
import { useOnlineStatusApiMutation } from '../redux/chat-api-slice';
const HomeStack = createNativeStackNavigator();

const DashboardStack = () => {
  const appState = useRef(AppState.currentState);
  const [onlineStatusApi] = useOnlineStatusApiMutation();
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

  useEffect(() => {
    return () => {
      console.log('user offline');
    };
  }, []);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'unknown' || nextAppState === 'background') {
        // updateOnlineStatus();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const updateOnlineStatus = value => {
    onlineStatusApi({ status: false })
      .unwrap()
      .then(res => { })
      .catch(err => {
        console.log('online status error', err);
      });
  };

  return (
    <HomeStack.Navigator
      initialRouteName={RouteNames.HOME}
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name={RouteNames.HOME} component={Home} />
      {/* <HomeStack.Screen
        name={RouteNames.PSYCHOLOGIST}
        component={Psychologist}
      /> */}
      <HomeStack.Screen
        name={RouteNames.SETTING_STACK}
        component={SettingsStack}
      />
      <HomeStack.Screen name={RouteNames.USER_CHAT} component={UserChat} />
      <HomeStack.Screen name={RouteNames.USER_CALL} component={UserCall} />
    </HomeStack.Navigator>
  );
};
export default DashboardStack;
