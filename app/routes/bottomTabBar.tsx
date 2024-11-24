import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import {
  APPOINTMENT_ACTIVE_ICON,
  APPOINTMENT_UNACTIVE_ICON,
  Call_Active,
  Call_InActive, //2F6FED
  Chat_Active,
  Chat_Inactive,
  Home_Active,
  Home_Inactive,
} from '../assets';
import {Call, Chat, MyAppointment, Search} from '../screen';
import {FC, useEffect, useRef} from 'react';
import CONSTANTS from '../utils/constants';
import {RouteNames} from '../utils/routesName';
import DashboardStack from './homestack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ChatStack from './chatstack';
import AppointmentTree from './appointmentTree';

const Tab = createBottomTabNavigator();

const BottomTabBar: FC = () => {
  const insets = useSafeAreaInsets();

  const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) || '';

    const hideOnScreens = [
      RouteNames.PSYCHOLOGIST,
      RouteNames.SETTING_STACK,
      RouteNames.MY_APPOINTMENT,
      RouteNames.SETTING,
      RouteNames.EDIT_PROFILE,
    ]; // put here name of screen where you want to hide tabBar
    const isIncludes = hideOnScreens.indexOf(routeName) <= -1;
    if (!isIncludes) {
      return {...tabBarStyle, display: 'none', height: 0};
    } else {
      return tabBarStyle;
    }
  };

  const tabBarStyle = {
    height: CONSTANTS.THEME.size.s60 + insets.bottom,
    borderTopWidth: 1,
    justifyContent: 'center',
  };
  return (
    <Tab.Navigator
      initialRouteName={RouteNames.HOME_STACK}
      screenOptions={{
        tabBarActiveTintColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
        headerShown: false,
      }}>
      <Tab.Screen
        name={RouteNames.HOME_STACK}
        component={DashboardStack}
        //@ts-ignore
        options={(route: any) => ({
          tabBarLabel: 'Home',
          tabBarStyle: getTabBarVisibility(route),
          // tabBarLabelStyle: {marginBottom: 5},
          tabBarIcon: ({focused}) => (
            <View style={{overflow: 'hidden', width: 25, height: 25}}>
              {focused ? (
                <Home_Active width={'100%'} height={'100%'} />
              ) : (
                <Home_Inactive width={'100%'} height={'100%'} />
              )}
            </View>
          ),
        })}
      />
      <Tab.Screen
        name={RouteNames.APPOINTMENT_STACK}
        component={AppointmentTree}
        //@ts-ignore
        options={(route: any) => ({
          // tabBarLabelStyle: {marginBottom: 5},
          tabBarLabel: 'Appointment',
          tabBarStyle: getTabBarVisibility(route),
          tabBarIcon: ({focused}) => (
            <View style={{overflow: 'hidden', width: 25, height: 25}}>
              {focused ? (
                <APPOINTMENT_ACTIVE_ICON width={'100%'} height={'100%'} />
              ) : (
                <APPOINTMENT_UNACTIVE_ICON width={'100%'} height={'100%'} />
              )}
            </View>
          ),
        })}
      />
      <Tab.Screen
        name={RouteNames.CHAT_STACK}
        component={ChatStack}
        //@ts-ignore
        options={(route: any) => ({
          // tabBarLabelStyle: {marginBottom: 5},
          tabBarLabel: 'Chat',
          tabBarStyle: getTabBarVisibility(route),
          tabBarIcon: ({focused}) => (
            <View style={{overflow: 'hidden', width: 25, height: 25}}>
              {focused ? (
                <Chat_Active width={'100%'} height={'100%'} />
              ) : (
                <Chat_Inactive width={'100%'} height={'100%'} />
              )}
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Call"
        component={Call}
        //@ts-ignore
        options={(route: any) => ({
          tabBarLabel: 'Call',
          // tabBarLabelStyle: {marginBottom: 5},
          tabBarStyle: getTabBarVisibility(route),
          tabBarIcon: ({focused}) => (
            <View style={{overflow: 'hidden', width: 25, height: 25}}>
              {focused ? (
                <Call_Active width={'100%'} height={'100%'} />
              ) : (
                <Call_InActive width={'100%'} height={'100%'} />
              )}
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  iconStyle: {
    height: 22,
    width: 22,
  },
});
