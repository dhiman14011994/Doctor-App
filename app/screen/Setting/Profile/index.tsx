import {View, Platform, StatusBar, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import GTHeader from '../../../components/GTHeader';
import CONSTANTS from '../../../utils/constants';
import {White_Left_Icon} from '../../../assets';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GTLabel from '../../../components/GTLabel';
import GTLinearGradientView from '../../../components/GTLinearGradientView';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import GTScrollView from '../../../components/GTScrollView';
import GTImage from '../../../components/GTImage';
import {useLazyGetPartnerDetailsApiQuery} from '../../../redux/auth-api-slice';
import GTIndicator from '../../../components/GTIndicator';

const Profile = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector((state: any) => state.appState.userInfo);
  const [getPartnerDetailsApi, {data: userData, isLoading: userLoading}] =
    useLazyGetPartnerDetailsApiQuery();

  useEffect(() => {
    getUserInfo();
  }, []);

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

  const getUserInfo = () => {
    getPartnerDetailsApi(userInfo?._id || userInfo?.id || '')
      .unwrap()
      .then(res => {
        console.log('res', res);
      })
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
          text={'Profile'}
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

  const renderUserInfo = ({label, value}: any) => {
    return (
      <View style={styles.subViewStyle}>
        <View style={styles.titleViewStyle}>
          <GTLabel
            text={label}
            color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
            customStyle={{
              textTransform: 'uppercase',
              lineHeight: CONSTANTS.THEME.size.s22,
            }}
            fontSize={CONSTANTS.THEME.size.s12}
            fontWeight="600"
          />
        </View>
        <View style={styles.detialView}>
          {label == 'Language:' ? (
            <View style={styles.nameContainer}>
              {userData?.data?.language?.map((it: any, index: number) => (
                <View
                  style={{
                    ...styles.languageContainer,
                    marginHorizontal: index == 1 ? CONSTANTS.THEME.size.s8 : 0,
                  }}>
                  <GTLabel
                    text={it?.name || ''}
                    fontWeight="600"
                    fontSize={CONSTANTS.THEME.size.s14}
                    color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
                    customStyle={{lineHeight: CONSTANTS.THEME.size.s18}}
                  />
                </View>
              ))}
            </View>
          ) : Array.isArray(value) ? (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {value.map((item: any, index: any) => (
                <GTLabel
                  text={`${item?.cat || item}${
                    index == value.length - 1 ? '' : ', '
                  }`}
                  key={(index + 1).toString()}
                  color={CONSTANTS.THEME.colors.Dark_Gunmetal}
                  fontSize={CONSTANTS.THEME.size.s14}
                  fontWeight="400"
                  customStyle={{lineHeight: CONSTANTS.THEME.size.s22}}
                />
              ))}
            </View>
          ) : (
            <GTLabel
              text={value}
              fontSize={CONSTANTS.THEME.size.s14}
              fontWeight="400"
              color={CONSTANTS.THEME.colors.Dark_Gunmetal}
              customStyle={{lineHeight: CONSTANTS.THEME.size.s22}}
            />
          )}
        </View>
      </View>
    );
  };

  const renderLineView = () => {
    return (
      <View style={styles.lineContainer}>
        <GTLinearGradientView
          color2={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100]}
          color1={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[0]}
          container={{
            width: '50%',
            height: 1,
          }}
        />
        <GTLinearGradientView
          color1={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100]}
          color2={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[0]}
          container={{
            width: '50%',
            height: 1,
          }}
        />
      </View>
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
  return (
    <View style={styles.container}>
      {hearderContainerView()}
      <GTScrollView>
        <View style={styles.subContainer}>
          <GTImage
            imageStyle={styles.userImageStyle}
            uri={userData?.data?.profilePicture}
            resizeMode={'contain'}
          />
          {renderUserInfo({
            label: 'Name:',
            value: `${userData?.data?.firstName} ${
              userData?.data?.lastName || ''
            }`,
          })}
          {renderLineView()}
          {renderUserInfo({
            label: 'Email:',
            value: userData?.data?.email || '',
          })}
          {renderLineView()}
          {renderUserInfo({
            label: 'mobile no:',
            value: userData?.data?.mobileNumber || '',
          })}
          {renderLineView()}
          {renderUserInfo({
            label: 'Specialty:',
            value: userData?.data?.speciality || [],
          })}
          {renderLineView()}
          {renderUserInfo({label: 'Language:', value: 'anoop dhiman'})}
          {renderLineView()}
          <View style={{width: '100%'}}>
            <GTLabel
              text={CONSTANTS.TEXT.DESCRIPTION}
              color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
              customStyle={{
                textTransform: 'uppercase',
                lineHeight: CONSTANTS.THEME.size.s22,
              }}
              fontSize={CONSTANTS.THEME.size.s12}
              fontWeight="600"
            />
            <GTLabel
              color={CONSTANTS.THEME.colors.SECONDARY_COLOR[80]}
              fontSize={CONSTANTS.THEME.size.s14}
              fontWeight="400"
              customStyle={{lineHeight: CONSTANTS.THEME.size.s22}}
              text={userData?.data?.bio || ''}
            />
          </View>

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
      </GTScrollView>
      {userLoading && <GTIndicator />}
    </View>
  );
};

export default Profile;
