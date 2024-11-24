import {View, Text} from 'react-native';
import React, {FC} from 'react';
import GTHeader from '../GTHeader';
import {Menu_Icon} from '../../assets';
import CONSTANTS from '../../utils/constants';
import GTImage from '../GTImage';
import GTHomeHeaderIcon from '../GTHomeHeaderIcon';
import GTLinearGradientView from '../GTLinearGradientView';

interface GTHeaderComponentProps {
  onHandleRightPress?: any;
  userInfo?: any;
  customStyle?: any;
  onHandleLeftPress?: any;
}

const GTHeaderComponent: FC<GTHeaderComponentProps> = ({
  onHandleRightPress,
  userInfo,
  customStyle,
  onHandleLeftPress,
}) => {
  return (
    <View>
      <GTHeader
        leftIcon={
          <Menu_Icon
            width={CONSTANTS.THEME.size.s28}
            height={CONSTANTS.THEME.size.s28}
          />
        }
        rightIcon={
          <GTImage
            imageStyle={{
              width: CONSTANTS.THEME.size.s28,
              height: CONSTANTS.THEME.size.s28,
            }}
            uri={
              !userInfo?.isOnline
                ? 'https://img.icons8.com/wired/64/FFFFFF/offline.png'
                : 'https://img.icons8.com/wired/64/FFFFFF/online.png'
            }
          />
        }
        customStyle={customStyle}
        onHandleRightPress={() => {
          onHandleRightPress();
        }}
        onHandleLeftPress={() => {
          onHandleLeftPress();
          //@ts-ignore
          //   navigation.navigate(RouteNames.SETTING_STACK);
        }}
        appIcon={<GTHomeHeaderIcon />}
      />
      <GTLinearGradientView
        container={{
          backgroundColor: CONSTANTS.THEME.colors.PRIMARY_COLOR,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <GTLinearGradientView
            color2={CONSTANTS.THEME.colors.WHITE[50]}
            color1={CONSTANTS.THEME.colors.WHITE[0]}
            container={{
              width: '50%',
              height: 1,
            }}
          />
          <GTLinearGradientView
            color1={CONSTANTS.THEME.colors.WHITE[50]}
            color2={CONSTANTS.THEME.colors.WHITE[0]}
            container={{
              width: '50%',
              height: 1,
            }}
          />
        </View>
      </GTLinearGradientView>
    </View>
  );
};

export default GTHeaderComponent;
