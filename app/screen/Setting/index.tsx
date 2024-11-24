import {
  View,
  Text,
  Platform,
  StatusBar,
  FlatList,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import GTLinearGradientView from '../../components/GTLinearGradientView';
import CONSTANTS from '../../utils/constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GTHeader from '../../components/GTHeader';
import {
  APPOINTMENTS_ICON,
  BLOG_ICON,
  CUSTOMER_SUPPORT_ICON,
  DIGITAL_WALLET_ICON,
  RATE_US_ICON,
  RECHARGE_ICON,
  Schedule_icon,
  SERVICES_ICON,
  SETTINGS_ICON,
  SIGN_UP_ICON,
  Testimonials_Icon,
  WHITE_DELETE_USER_ICON,
  White_Left_Icon,
} from '../../assets';
import styles from './styles';
import GTSettingUserInfo from '../../components/GTSettingUserInfo';
import GTLabel from '../../components/GTLabel';
import GTSettingMenu from '../../components/GTSettingMenu';
import GTButton from '../../components/GTButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIsLogin,
  setScreenName,
  setToken,
  setUserInfo,
} from '../../redux/app-api-slice';
import {setPrefsValue} from '../../utils/storage';
import {RouteNames} from '../../utils/routesName';
import {
  useLazyDeleteUserDataApiQuery,
  useLazyGetPartnerDetailsApiQuery,
  useLogoutAccountApiMutation,
} from '../../redux/auth-api-slice';
import GTIndicator from '../../components/GTIndicator';
import Toast from 'react-native-toast-message';
import ListEmptyComponent from '../../components/ListEmptyComponent/ListEmptyComponent';
import {useOnlineStatusApiMutation} from '../../redux/chat-api-slice';

const Setting = () => {
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state?.appState.userInfo);
  const [getPartnerDetailsApi, {data: userData, isLoading: userLoading}] =
    useLazyGetPartnerDetailsApiQuery();
  const [onlineStatusApi] = useOnlineStatusApiMutation();
  const [deleteUserDataApi] = useLazyDeleteUserDataApiQuery();
  const [logoutAccountApi] = useLogoutAccountApiMutation();
  const settingArray = [
    {
      id: '1',
      image: (
        <APPOINTMENTS_ICON
          width={CONSTANTS.THEME.size.s32}
          height={CONSTANTS.THEME.size.s32}
        />
      ),
      name: CONSTANTS.TEXT.MY_APPOINTMENTS,
    },
    // {
    //   id: '2',
    //   image: (
    //     <Testimonials_Icon
    //       width={CONSTANTS.THEME.size.s32}
    //       height={CONSTANTS.THEME.size.s32}
    //     />
    //   ),
    //   name: CONSTANTS.TEXT.TESTIMONIALS,
    // },
    {
      id: '3',
      image: (
        <Schedule_icon
          width={CONSTANTS.THEME.size.s32}
          height={CONSTANTS.THEME.size.s32}
        />
      ),
      name: CONSTANTS.TEXT.SCHEDULE,
    },
    {
      id: '4',
      image: (
        <BLOG_ICON
          width={CONSTANTS.THEME.size.s32}
          height={CONSTANTS.THEME.size.s32}
        />
      ),
      name: CONSTANTS.TEXT.BLOG,
    },
    {
      id: '5',
      image: (
        <DIGITAL_WALLET_ICON
          width={CONSTANTS.THEME.size.s32}
          height={CONSTANTS.THEME.size.s32}
        />
      ),
      name: CONSTANTS.TEXT.DIGITAL_WALLET,
    },
    {
      id: '6',
      image: (
        <SERVICES_ICON
          width={CONSTANTS.THEME.size.s32}
          height={CONSTANTS.THEME.size.s32}
        />
      ),
      name: CONSTANTS.TEXT.ABOUT_US,
    },
    {
      id: '7',
      image: (
        <RATE_US_ICON
          width={CONSTANTS.THEME.size.s32}
          height={CONSTANTS.THEME.size.s32}
        />
      ),
      name: CONSTANTS.TEXT.RATE_US,
    },
    {
      id: '8',
      image: (
        <CUSTOMER_SUPPORT_ICON
          width={CONSTANTS.THEME.size.s32}
          height={CONSTANTS.THEME.size.s32}
        />
      ),
      name: CONSTANTS.TEXT.CUSTOMER_SUPPORT,
    },
    {
      id: '9',
      image: (
        <View style={styles.deleteView}>
          <WHITE_DELETE_USER_ICON
            width={CONSTANTS.THEME.size.s16}
            height={CONSTANTS.THEME.size.s16}
          />
        </View>
      ),
      name: CONSTANTS.TEXT.DELETE_ACCOUNT,
    },
    {
      id: '10',
      image: (
        <SIGN_UP_ICON
          width={CONSTANTS.THEME.size.s32}
          height={CONSTANTS.THEME.size.s32}
        />
      ),
      name: CONSTANTS.TEXT.SIGN_OUT,
    },
  ];

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
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

  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {
    setPrefsValue(CONSTANTS.STORAGE.SCREEN_NAME, 'Call');
    dispatch(setScreenName(''));
  }, [isFocus]);

  const getUserInfo = () => {
    getPartnerDetailsApi(userInfo?._id || userInfo?.id || '')
      .unwrap()
      .then(res => {})
      .catch(err => {
        console.log('err', err);
      });
  };

  const hearderContainerView = () => {
    return (
      <>
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
        <GTHeader
          text={'Setting'}
          leftIcon={
            <White_Left_Icon
              width={CONSTANTS.THEME.size.s20}
              height={CONSTANTS.THEME.size.s20}
            />
          }
          customStyle={styles.headerContainer}
          textStyle={{textAlign: 'left'}}
          onHandleLeftPress={() => {
            navigation.goBack();
          }}
        />
      </>
    );
  };

  const renderLinearLine = () => {
    return (
      <View>
        <GTLinearGradientView
          color1={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100]}
          color2={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[0]}
          container={{
            width: 2,
            height: CONSTANTS.THEME.size.s30,
          }}
        />
        <GTLinearGradientView
          color2={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100]}
          color1={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[0]}
          container={{
            width: 2,
            height: CONSTANTS.THEME.size.s30,
          }}
        />
      </View>
    );
  };

  const renderValueItem = ({name, value, index}: any) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {index == 1 && renderLinearLine()}

        <View
          style={{
            ...styles.valueItem,
          }}>
          <GTLabel
            text={value}
            color={CONSTANTS.THEME.colors.GREEN}
            fontSize={CONSTANTS.THEME.size.s22}
            fontWeight="700"
            customStyle={{lineHeight: CONSTANTS.THEME.size.s32}}
          />
          <GTLabel
            text={name}
            color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
            fontSize={CONSTANTS.THEME.size.s12}
            fontWeight="400"
            customStyle={{lineHeight: CONSTANTS.THEME.size.s20}}
          />
        </View>
        {index == 1 && renderLinearLine()}
      </View>
    );
  };

  const onPress = (data: any) => {
    switch (data) {
      case 0:
        //@ts-ignore
        navigation.navigate(RouteNames.MY_APPOINTMENT);
        break;
      // case 1:
      //   //@ts-ignore
      //   navigation.navigate(RouteNames.TESTIMONIALS);
      //   break;
      case 1:
        Toast.show({
          type: 'success',
          text2: 'Coming soon',
        });
        break;
      case 2:
        //@ts-ignore
        navigation.navigate(RouteNames.BLOG);
        break;
      case 3:
        //@ts-ignore
        navigation.navigate(RouteNames.WALLET);
        break;
      case 4:
        Toast.show({
          type: 'success',
          text2: 'Coming soon',
        });
        break;
      case 5:
        Toast.show({
          type: 'success',
          text2: 'Coming soon',
        });
        break;
      case 6:
        Toast.show({
          type: 'success',
          text2: 'Coming soon',
        });
        break;
      case 7:
        deleteAccountPopup();
        break;
      case 8:
        logoutPopup();
        break;
    }
  };

  const deleteAccountPopup = () => {
    Alert.alert(
      'Confirm Delete Account',
      'Are your sure you want to delete account?. if you delete account then you will lost your data',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteAccountInfo()},
      ],
    );
  };

  const deleteAccountInfo = () => {
    deleteUserDataApi('')
      .unwrap()
      .then(response => {
        Toast.show({
          type: 'success',
          text2: response?.responseMessage || 'Account deleted successfully',
        });
        logout();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderItem = ({item, index}: any) => {
    const isIndex = index == 0 || index == 5 || index == 7;

    return (
      <GTSettingMenu
        onPress={() => onPress(index)}
        leftImage={item.image}
        name={item.name}
        container={{
          marginTop: isIndex ? CONSTANTS.THEME.size.s10 : 0,
          borderTopWidth: isIndex ? 0 : 1,
          borderColor: CONSTANTS.THEME.colors.NEUTRAL[300],
        }}
      />
    );
  };

  const updateOnlineStatus = (value: boolean) => {
    try {
      onlineStatusApi({status: value})
        .unwrap()
        .then(res => {
          logOutAccountInfo();
        })
        .catch(err => {
          logOutAccountInfo();
          console.log('online status error', err);
          if (err.originalStatus == 503) {
            Toast.show({
              type: 'error',
              text2: err?.responseMessage || err?.data || '',
            });
          }
        });
    } catch (err) {
      logOutAccountInfo();
      console.log('online status error', err);
    }
  };

  const logOutAccountInfo = () => {
    try {
      logoutAccountApi('')
        .unwrap()
        .then(response => {
          logout();
        })
        .catch(error => {
          console.log(error);
          logout();
        });
    } catch (error) {
      console.log(error);
      logout();
    }
  };
  const ListHeaderComponent = () => {
    return (
      <View>
        <GTSettingUserInfo
          userImage={userData?.data?.profilePicture || ''}
          name={`${userData?.data?.firstName || ''} ${
            userData?.data?.lastName || ''
          }`}
          mobile_no={
            userData?.data?.mobileNumber
              ? `+${userData?.data?.mobileNumber}`
              : ''
          }
          // onEditPress={() => {
          //   //@ts-ignore
          //   navigation.navigate(RouteNames.EDIT_PROFILE);
          // }}
          imageStyle={{
            borderRadius: CONSTANTS.THEME.size.WIDTH * 0.5,
            overflow: 'hidden',
          }}
          onHandlePress={() => {
            //@ts-ignore
            navigation.navigate(RouteNames.PROFILE);
          }}
        />
        <View style={styles.balanceContainer}>
          {renderValueItem({
            name: CONSTANTS.TEXT.TOTAL_CHAT,
            value: userData?.data?.totalChatCount || '0',
            index: 0,
          })}
          {renderValueItem({
            name: CONSTANTS.TEXT.TOTAL_AUDIO,
            value: userData?.data?.totalCallCount || '0',
            index: 1,
          })}
          {renderValueItem({
            name: CONSTANTS.TEXT.TOTAL_EARNING,
            value: `₹${userData?.data?.totalEarn || 0}`,
            index: 2,
          })}
        </View>
      </View>
    );
  };

  const ListFooterComponent = () => {
    return (
      <View
        style={{
          ...styles.footerContainer,
          marginBottom: insets.bottom == 0 ? CONSTANTS.THEME.size.s12 : 0,
        }}>
        <GTLinearGradientView container={styles.continueViewButton}>
          <GTButton
            onHandlePress={() => {
              logoutPopup();
            }}
            text="Logout"
            customStyle={styles.continueButton}
            backgroundColor={CONSTANTS.THEME.colors.TRANSPARENT}
            color={CONSTANTS.THEME.colors.WHITE_COLOR}
          />
        </GTLinearGradientView>

        <View style={styles.emptyView} />
      </View>
    );
  };

  const logoutPopup = () => {
    Alert.alert('Confirm Logout', 'Are your sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => updateOnlineStatus(false)},
    ]);
  };

  const logout = () => {
    dispatch(setIsLogin(false));
    dispatch(setUserInfo({}));
    dispatch(setToken(''));
    setPrefsValue(CONSTANTS.STORAGE.ISLOGGED, 'false');
    setPrefsValue(CONSTANTS.STORAGE.USER_DATA, '');
    setPrefsValue(CONSTANTS.STORAGE.TOKEN, '');
  };

  return (
    <View>
      {hearderContainerView()}

      <FlatList
        bounces={false}
        ListHeaderComponent={ListHeaderComponent}
        data={settingArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => (index + 1).toString()}
        // ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
      {userLoading && <GTIndicator />}
    </View>
  );
};

export default Setting;
