/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

notifee.setNotificationCategories([
  {
    id: 'life-checker-yes-no',
    actions: [
      {
        id: 'yes',
        title: 'Accept',
      },
      {
        id: 'no',
        title: 'Reject',
      },
    ],
  },
]);

notifee.onForegroundEvent(event => {
  switch (event.type) {
    case EventType.ACTION_PRESS:
      if (event.detail.pressAction) {
        if (event.detail.pressAction.id === 'yes') {
          console.log('pressed yes');
        }
        if (event.detail.pressAction.id === 'no') {
          console.log('pressed no');
        }
      }
      break;
  }
});

notifee.onBackgroundEvent(async event => {
  switch (event.type) {
    case EventType.ACTION_PRESS:
      if (event.type === EventType.ACTION_PRESS) {
        if (event.detail.pressAction) {
          if (event.detail.pressAction.id === 'yes') {
            console.log('pressed yes');
          }
          if (event.detail.pressAction.id === 'no') {
            console.log('need to call 911');
          }
        }
      }
      break;
    default:
  }
});
// Handle background messages using setBackgroundMessageHandler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  notifee.displayNotification({
    title: 'Checking life',
    subtitle: 'Are you feeling alright ?',
    ios: {
      categoryId: 'life-checker-yes-no',
    },
  });
});

AppRegistry.registerHeadlessTask('SomeTaskName', () => {});
// Check if app was launched in the background and conditionally render null if so
function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <App />;
}

AppRegistry.registerComponent(appName, () => App);
