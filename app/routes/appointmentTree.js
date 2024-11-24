import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteNames} from '../utils/routesName';
import SettingsStack from './settingstack';
import {Appointment, UserCall, UserChat} from '../screen';

const AppointmentStack = createNativeStackNavigator();
const AppointmentTree = () => {
  return (
    <AppointmentStack.Navigator
      initialRouteName={RouteNames.APPOINTMENT}
      screenOptions={{
        headerShown: false,
      }}>
      <AppointmentStack.Screen
        name={RouteNames.APPOINTMENT}
        component={Appointment}
      />
      <AppointmentStack.Screen
        name={RouteNames.SETTING_STACK}
        component={SettingsStack}
      />
      <AppointmentStack.Screen
        name={RouteNames.USER_CHAT}
        component={UserChat}
      />
      <AppointmentStack.Screen
        name={RouteNames.USER_CALL}
        component={UserCall}
      />
    </AppointmentStack.Navigator>
  );
};
export default AppointmentTree;
