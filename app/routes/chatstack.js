import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteNames} from '../utils/routesName';
import {Chat, UserCall, UserChat} from '../screen';
import SettingsStack from './settingstack';

const ChatingStack = createNativeStackNavigator();
const ChatStack = () => {
  return (
    <ChatingStack.Navigator
      initialRouteName={RouteNames.CHAT || ''}
      screenOptions={{
        headerShown: false,
      }}>
      <ChatingStack.Screen name={RouteNames.CHAT} component={Chat} />

      <ChatingStack.Screen
        name={RouteNames.SETTING_STACK}
        component={SettingsStack}
      />
      <ChatingStack.Screen name={RouteNames.USER_CHAT} component={UserChat} />
      <ChatingStack.Screen name={RouteNames.USER_CALL} component={UserCall} />
    </ChatingStack.Navigator>
  );
};
export default ChatStack;
