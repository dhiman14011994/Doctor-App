import {
  View,
  Text,
  Platform,
  StatusBar,
  FlatList,
  Keyboard,
  BackHandler,
  AppState,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import GTLinearGradientView from '../../components/GTLinearGradientView';
import CONSTANTS from '../../utils/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GTHeader from '../../components/GTHeader';
import {White_Left_Icon} from '../../assets';
import styles from './styles';
import GTAppointmentList from '../../components/GTAppointmentList';
import {
  useLazyGetAllAppointmentsApiQuery,
  useLazyGetAllTypeAppointmentsApiQuery,
} from '../../redux/home-api-slice';
import moment from 'moment';
import {RouteNames} from '../../utils/routesName';
import GTModal from '../../components/GTModal';
import GTCommentView from '../../components/GTCommentView';
import {useDispatch, useSelector} from 'react-redux';
import {AppointmentProps} from '../../models/HomeMode';
import {useCreateCommentApiMutation} from '../../redux/chat-api-slice';
import {setScreenName} from '../../redux/app-api-slice';
import {setPrefsValue} from '../../utils/storage';
import ListEmptyComponent from '../../components/ListEmptyComponent/ListEmptyComponent';
import Toast from 'react-native-toast-message';
import GTIndicator from '../../components/GTIndicator';

const Chat = () => {
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const insets = useSafeAreaInsets();
  const [getAllTypeAppointmentsApi, {data, isLoading}] =
    useLazyGetAllTypeAppointmentsApiQuery();
  const [isRequest, SetIsRequest] = useState(false);
  const [chatIndex, SetChatIndex] = useState(0);
  const [comment, setComment] = useState('');
  const userInfo = useSelector((state: any) => state?.appState.userInfo);
  const [createCommentApi, {data: commentValue, isLoading: commentLoading}] =
    useCreateCommentApiMutation();
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const dispatch = useDispatch();
  const onRef: any = useRef(null);
  const timerRef: any = useRef(null);

  useEffect(() => {
    getAllTypeAppointments();
  }, [isFocus]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
      if (onRef.current) {
        clearTimeout(onRef.current);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const getAllTypeAppointments = () => {
    getAllTypeAppointmentsApi('allTypes')
      .unwrap()
      .then((res: any) => {})
      .catch(e => {
        console.log('appointment all Type', e);
      });
  };

  // useLayoutEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: {display: 'none', height: 0},
  //     tabBarVisible: false,
  //   });

  //   return () =>
  //     navigation
  //       .getParent()
  //       ?.setOptions({tabBarStyle: undefined, tabBarVisible: undefined});
  // }, [isFocus]);

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

  useEffect(() => {
    setPrefsValue(CONSTANTS.STORAGE.SCREEN_NAME, 'Chat');

    dispatch(setScreenName('Chat'));
  }, [isFocus]);

  const hearderContainerView = () => {
    return (
      <>
        {Platform.OS == 'android' ? (
          <GTLinearGradientView>
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
          text={'Chat'}
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

  const renderItem = ({item, index}: any) => {
    var dateTime = item?.scheduledDateTime
      ? moment(item?.scheduledDateTime).format('DD MMM YYYY,  hh:mm A')
      : '';
    if (item?.appointmentType == 'chat') {
      return (
        <GTAppointmentList
          isWait={false}
          onHandlePress={() => {
            // @ts-ignore
            navigation.navigate(RouteNames.USER_CHAT, {data: item});
          }}
          container={styles.renderContainer}
          message={dateTime}
          name={`${item.scheduledBy_firstName || ''}${
            item?.scheduledBy_lasttName ? ' ' + item?.scheduledBy_lasttName : ''
          }`}
          isMessage={item?.appointmentType == 'chat'}
          onPressComment={() => {
            SetIsRequest(true);
            SetChatIndex(index);
          }}
        />
      );
    }
  };

  const createComment = () => {
    var appointmentData: any = data?.data?.allAppointments;
    var params = {
      appointmentId: appointmentData[chatIndex]._id,
      comment: comment,
      commentFor: userInfo?._id || userInfo?.id,
    };
    createCommentApi(params)
      .unwrap()
      .then((res: any) => {
        SetIsRequest(false);
        SetChatIndex(2000);
        setComment('');
        onRef.current = setTimeout(() => {
          Toast.show({
            type: 'success',
            text2: 'comment send successfully',
          });
        }, 200);
      })
      .catch((err: any) => {
        console.log('error create comment', err);
        SetIsRequest(false);
        SetChatIndex(2000);
        timerRef.current = setTimeout(() => {
          Toast.show({
            type: 'error',
            text2: err?.responseMessage || '',
          });
        }, 200);
      });
  };

  const getCallData = () => {
    var appointmentData: any = data?.data?.allAppointments?.filter(
      (it: any) => it?.appointmentType == 'chat',
    );

    return appointmentData || [];
  };

  return (
    <View style={styles.container}>
      {hearderContainerView()}
      <FlatList
        data={getCallData()}
        //@ts-ignore
        renderItem={renderItem}
        keyExtractor={(item, index) => (index + 1).toString()}
        ListEmptyComponent={ListEmptyComponent}
      />
      <GTModal visible={isRequest}>
        <GTCommentView
          onHandlePress={() => createComment()}
          comment={comment}
          setComment={setComment}
          onClosePress={() => {
            SetIsRequest(false);
            setComment('');
            SetChatIndex(0);
          }}
          isLoading={commentLoading}
          isKeyboard={keyboardStatus}
        />
      </GTModal>
      {isLoading && <GTIndicator />}
    </View>
  );
};

export default Chat;
