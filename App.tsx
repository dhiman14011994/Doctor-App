import React, {useEffect, useRef} from 'react';
import {Provider} from 'react-redux';
import {store} from './app/redux/store';
import Route from './app/routes';
import Toast from 'react-native-toast-message';
import {Platform} from 'react-native';
import {enableScreens} from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import {googleConfiguration} from './app/utils/socialLogin';
import socketServices from './app/utils/socketService';
import Blog from './app/screen/Setting/Blog';
import CONSTANTS from './app/utils/constants';
import DeviceInfo from 'react-native-device-info';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
  check,
} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import {
  requestCameraPermission,
  requestExternalWritePermission,
  requestMicrophone,
  requestMultiplePermission,
  requestRecordingPermission,
} from './app/utils/customFunction';

const App = () => {
  const timerRef: any = useRef(null);

  useEffect(() => {
    requestMultiplePermission();
    try {
      socketServices.initializeSocket();
      googleConfiguration();
      // configureFacebook();
      SplashScreen.hide();
      if (Platform.OS === 'ios') {
        enableScreens(false);
      }
    } catch (error) {
      console.log(error);
    }

    if (Platform.OS === 'android') {
      timerRef.current = setTimeout(() => {
        permissionRequest();
      }, 1000);
    } else {
      getFirebaseToken();
    }

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', remoteMessage);
    });
    return () => {
      unsubscribe();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const getFirebaseToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      messaging()
        .hasPermission()
        .then(enabled => {
          if (enabled) {
            getToken();
          } else {
            requestPermissionToken();
          }
        })
        .catch(error => {
          console.log('error checking permisions ' + error);
        });
    } catch (error) {
      console.log('error getting token ' + error);
    }
  };

  const requestPermissionToken = () => {
    messaging()
      .requestPermission()
      .then(() => {
        getToken();
      })
      .catch(error => {
        console.log('permission rejected ' + error);
      });
  };

  const getToken = () => {
    messaging()
      .getToken()
      .then(token => {
        console.log('push token ' + token);
      })
      .catch(error => {
        console.log('error getting push token ' + error);
      });
  };
  const permissionRequest = async () => {
    let systemVersion: any = DeviceInfo.getSystemVersion();
    if (systemVersion > 12) {
      check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              notificationPermission();
              break;
            case RESULTS.DENIED:
              notificationPermission();
              break;
            case RESULTS.LIMITED:
              notificationPermission();
              break;
            case RESULTS.GRANTED:
              getFirebaseToken();
              console.log(CONSTANTS.PERMISSION_MESSGAE.GRANTED_PERMISSION);
              break;
            case RESULTS.BLOCKED:
              notificationPermission();
              break;
          }
        })
        .catch(error => {
          // …
        });
    } else {
      getFirebaseToken();
    }
  };

  const notificationPermission = async () => {
    request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          openSettings().catch(() =>
            console.warn(CONSTANTS.PERMISSION_MESSGAE.CANNOT_OPEN),
          );
          console.log(CONSTANTS.PERMISSION_MESSGAE.UNIAVAILABLE_PERMISSION);
          break;
        case RESULTS.DENIED:
          openSettings().catch(() =>
            console.warn(CONSTANTS.PERMISSION_MESSGAE.CANNOT_OPEN),
          );
          console.log(CONSTANTS.PERMISSION_MESSGAE.DENIED_PERMISSION);
          break;
        case RESULTS.LIMITED:
          openSettings().catch(() =>
            console.warn(CONSTANTS.PERMISSION_MESSGAE.CANNOT_OPEN),
          );
          console.log(CONSTANTS.PERMISSION_MESSGAE.LIMITED_PERMISSION);
          break;
        case RESULTS.GRANTED:
          getFirebaseToken();
          console.log(CONSTANTS.PERMISSION_MESSGAE.GRANTED_PERMISSION);
          break;
        case RESULTS.BLOCKED:
          // Toast.show(CONSTANTS.PERMISSION_MESSGAE.PERMISSION_NOTITIFCATION_MESSAGE);
          openSettings().catch(() =>
            console.warn(CONSTANTS.PERMISSION_MESSGAE.CANNOT_OPEN),
          );
          console.log(CONSTANTS.PERMISSION_MESSGAE.BLOCKED_PERMISSION);
          break;
      }
    });
  };

  return (
    <Provider store={store}>
      <Route />
      {/* <Blog /> */}
      <Toast />
    </Provider>
  );
};

export default App;
