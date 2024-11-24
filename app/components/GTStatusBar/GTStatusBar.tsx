import {View, Text, Platform, StatusBar} from 'react-native';
import React from 'react';
import GTLinearGradientView from '../GTLinearGradientView';
import CONSTANTS from '../../utils/constants';

const GTStatusBar = ({insets}: any) => {
  return (
    <View>
      {Platform.OS == 'android' ? (
        <GTLinearGradientView container={{flex: 1}}>
          <StatusBar
            translucent={true}
            backgroundColor={CONSTANTS.THEME.colors.TRANSPARENT}
          />
        </GTLinearGradientView>
      ) : (
        <GTLinearGradientView
          container={{
            height: insets.top,
            backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
          }}
        />
      )}
      <GTLinearGradientView
        container={{
          height:
            insets.top < 35
              ? insets.top
              : Platform.OS == 'android'
              ? insets.top
              : 35,
          backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
        }}
      />
    </View>
  );
};

export default GTStatusBar;
