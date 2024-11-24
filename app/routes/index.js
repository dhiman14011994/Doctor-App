import {StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticationStack from './authstack';
import CONSTANTS from '../utils/constants';

const Route = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={CONSTANTS.THEME.colors.TRANSPARENT}
      />
      <AuthenticationStack />
    </NavigationContainer>
  );
};

export default Route;
