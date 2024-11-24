import React, {useEffect, useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteNames} from '../utils/routesName';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  Blog,
  EditProfile,
  MyAppointment,
  Profile,
  Setting,
  UserChat,
  Wallet,
} from '../screen';
import Testimonials from '../screen/Setting/Testimonials';

const SettingStack = createNativeStackNavigator();
const SettingsStack = () => {
  const navigation = useNavigation();
  const isFocus = useIsFocused();

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none', height: 0},
      tabBarVisible: false,
    });

    return () =>
      navigation
        .getParent()
        ?.setOptions({tabBarStyle: undefined, tabBarVisible: undefined});
  }, [isFocus]);

  return (
    <SettingStack.Navigator
      initialRouteName={RouteNames.SETTING}
      screenOptions={{
        headerShown: false,
      }}>
      <SettingStack.Screen name={RouteNames.SETTING} component={Setting} />
      <SettingStack.Screen
        name={RouteNames.MY_APPOINTMENT}
        component={MyAppointment}
      />
      <SettingStack.Screen name={RouteNames.PROFILE} component={Profile} />
      <SettingStack.Screen
        name={RouteNames.EDIT_PROFILE}
        component={EditProfile}
      />
      <SettingStack.Screen
        name={RouteNames.TESTIMONIALS}
        component={Testimonials}
      />
      <SettingStack.Screen name={RouteNames.BLOG} component={Blog} />
      <SettingStack.Screen name={RouteNames.WALLET} component={Wallet} />
      <SettingStack.Screen name={RouteNames.USER_CHAT} component={UserChat} />
      <SettingStack.Screen name={RouteNames.USER_CALL} component={UserChat} />
    </SettingStack.Navigator>
  );
};
export default SettingsStack;
