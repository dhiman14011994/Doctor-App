import {
  View,
  Text,
  Platform,
  StatusBar,
  FlatList,
  Keyboard,
  BackHandler,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import GTLinearGradientView from '../../../components/GTLinearGradientView';
import CONSTANTS from '../../../utils/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GTHeader from '../../../components/GTHeader';
import {White_Left_Icon} from '../../../assets';
import styles from './styles';
import GTAppointmentList from '../../../components/GTAppointmentList';
import {
  useLazyGetAllAppointmentsApiQuery,
  useLazyGetAllTypeAppointmentsApiQuery,
  useUpdateWaitingApponintmentStatusApiMutation,
} from '../../../redux/home-api-slice';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {useCreateCommentApiMutation} from '../../../redux/chat-api-slice';
import GTModal from '../../../components/GTModal';
import GTCommentView from '../../../components/GTCommentView';
import {RouteNames} from '../../../utils/routesName';
import Toast from 'react-native-toast-message';
import ListEmptyComponent from '../../../components/ListEmptyComponent/ListEmptyComponent';
import GTLabel from '../../../components/GTLabel';
import GTButtonContainer from '../../../components/GTButtonContainer';
import style from '../../../components/GTCategoryList/style';
import GTIndicator from '../../../components/GTIndicator';
import GTConfirmSlot from '../../../components/GTConfirmSlot';
import GTCancelSlot from '../../../components/GTCancelSlot';
import socketServices from '../../../utils/socketService';
import {setWaitDataInfo} from '../../../redux/app-api-slice';

const MyAppointment = () => {
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const insets = useSafeAreaInsets();
  const [getAllTypeAppointmentsApi, {data, isLoading}] =
    useLazyGetAllTypeAppointmentsApiQuery();
  const dispatch = useDispatch();
  const [isRequest, SetIsRequest] = useState(false);
  const [chatIndex, SetChatIndex] = useState(0);
  const [comment, setComment] = useState('');
  const [reason, setReason] = useState('');
  const [waitTime, setWaitTime] = useState(0);
  const [isReason, setIsReason] = useState(false);
  const {userInfo, waitData} = useSelector((state: any) => state?.appState);
  const [createCommentApi, {data: commentValue, isLoading: commentLoading}] =
    useCreateCommentApiMutation();
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [isAppointment, setIsAppointment] = useState(true);
  const [waitListData, setWaitList] = useState([]);
  const [appointmentListData, setAppointmentList] = useState([]);
  const [waitingIndex, setWaitingIndex] = useState(1000);
  const [
    updateWaitingApponintmentStatusApi,
    {data: confirmData, isLoading: isConfirmLoading},
  ] = useUpdateWaitingApponintmentStatusApiMutation();

  const moveBackRef: any = useRef(null);
  const moveForwordRef: any = useRef(null);
  const monthRef: any = useRef(null);
  const dateTimeRef: any = useRef(null);

  useEffect(() => {
    getAllTypeAppointments();
    getAllWaitAppointments();
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
      if (monthRef.current) {
        clearTimeout(monthRef.current);
      }
      if (moveBackRef.current) {
        clearTimeout(moveBackRef.current);
      }
      if (moveForwordRef.current) {
        clearTimeout(moveForwordRef.current);
      }
      if (dateTimeRef.current) {
        clearTimeout(dateTimeRef.current);
      }
    };
  }, []);

  useEffect(() => {
    socketServices.on('notification', (data: any) => {
      console.log('data?.body?.notificationType', data?.body?.notificationType);
      if (data?.body?.receiverId === userInfo._id) {
        if (data?.body?.senderId != userInfo._id) {
          if (
            data?.body?.notificationType == 'cancleAppointment' ||
            data?.body?.notificationType == 'pleaseWait' ||
            data?.body?.notificationType == 'appointmentExpire'
          ) {
            getAllTypeAppointments();
            getAllWaitAppointments();
            if (data?.body?.notificationType == 'pleaseWait') {
              dispatch(setWaitDataInfo(data?.body?.appointmentDetail));
            } else if (data?.body?.notificationType == 'appointmentExpire') {
              dispatch(setWaitDataInfo(''));
            }
          }
          if (data?.body?.notificationType == 'Appointment') {
            getAllWaitAppointments();
            // @ts-ignore
            navigation.navigate(RouteNames.USER_CHAT, {
              data: data?.body?.appointmentDetail,
            });
          }
        }
      }
    });
    return () => socketServices.removeListener('notification');
  }, []);

  const getAllWaitAppointments = () => {
    getAllTypeAppointmentsApi('waitList')
      .unwrap()
      .then((res: any) => {
        setWaitList(res?.data?.waitListAppointments || []);
      })
      .catch(e => {
        console.log('appointment all Type', e);
      });
  };

  const getAllTypeAppointments = () => {
    getAllTypeAppointmentsApi('allTypes')
      .unwrap()
      .then((res: any) => {
        setAppointmentList(res?.data?.allAppointments || '');
      })
      .catch(e => {
        console.log('appointment all Type', e);
      });
  };

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
          text={'My Appointment'}
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
        <View style={styles.tabContainer}>
          <GTButtonContainer
            onHandlePress={() => {
              setIsAppointment(true);
            }}
            disabled={isAppointment}
            customStyle={{
              ...styles.tabSubContainer,
              borderColor: !isAppointment
                ? CONSTANTS.THEME.colors.PRIMARY_ONE_COLOR
                : CONSTANTS.THEME.colors.CHAT_BORDER_COLOR,
            }}>
            <GTLinearGradientView
              color1={
                isAppointment
                  ? CONSTANTS.THEME.colors.PRIMARY_ONE_COLOR
                  : CONSTANTS.THEME.colors.CHAT_BORDER_COLOR
              }
              color2={
                isAppointment
                  ? CONSTANTS.THEME.colors.PRIMARY_ONE_COLOR
                  : CONSTANTS.THEME.colors.CHAT_BORDER_COLOR
              }
              container={styles.subContainer}>
              <GTLabel
                color={
                  isAppointment
                    ? CONSTANTS.THEME.colors.WHITE_COLOR
                    : CONSTANTS.THEME.colors.Light_Gunmetal
                }
                text={'Appointment'}
                fontSize={CONSTANTS.THEME.size.s16}
                fontWeight="800"
              />
            </GTLinearGradientView>
          </GTButtonContainer>
          <GTButtonContainer
            onHandlePress={() => {
              setIsAppointment(false);
            }}
            disabled={!isAppointment}
            customStyle={{
              ...styles.tabSubContainer,
              borderColor: !isAppointment
                ? CONSTANTS.THEME.colors.PRIMARY_ONE_COLOR
                : CONSTANTS.THEME.colors.CHAT_BORDER_COLOR,
            }}>
            <GTLinearGradientView
              color2={
                !isAppointment
                  ? CONSTANTS.THEME.colors.PRIMARY_ONE_COLOR
                  : CONSTANTS.THEME.colors.CHAT_BORDER_COLOR
              }
              color1={
                !isAppointment
                  ? CONSTANTS.THEME.colors.PRIMARY_ONE_COLOR
                  : CONSTANTS.THEME.colors.CHAT_BORDER_COLOR
              }
              container={styles.subContainer}>
              <GTLabel
                color={
                  !isAppointment
                    ? CONSTANTS.THEME.colors.WHITE_COLOR
                    : CONSTANTS.THEME.colors.Light_Gunmetal
                }
                text={'Wait List'}
                fontSize={CONSTANTS.THEME.size.s16}
                fontWeight="800"
              />
            </GTLinearGradientView>
          </GTButtonContainer>
        </View>
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
          container={styles.renderContainer}
          message={dateTime}
          name={`${item.scheduledBy_firstName || ''}${
            item?.scheduledBy_lasttName ? ' ' + item?.scheduledBy_lasttName : ''
          }`}
          onHandlePress={() => {
            // @ts-ignore
            navigation.navigate(RouteNames.USER_CHAT, {data: item});
          }}
          isMessage={item?.appointmentType == 'chat'}
          onPressComment={() => {
            SetIsRequest(true);
            SetChatIndex(index);
          }}
          isWait={!isAppointment}
          onPressConfirm={() => {
            SetIsRequest(true);
            setWaitingIndex(index);
          }}
          waitData={waitData?._id == item?._id}
          onPressReject={() => {
            setReason('');
            setIsReason(true);
            SetIsRequest(true);
            setWaitingIndex(index);
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
        monthRef.current = setTimeout(() => {
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
        setComment('');
        moveBackRef.current = setTimeout(() => {
          Toast.show({
            type: 'error',
            text2:
              err?.responseMessage ||
              err?.data?.responseMessage ||
              err?.data ||
              '',
          });
        }, 200);
      });
  };

  const updateWaitListStatus = () => {
    try {
      var params = {
        //@ts-ignore
        id: waitListData[waitingIndex]?._id || '',
        appointmentStatus: !isReason ? 'confirmed' : 'cancelled',
        cancellationReason: reason || '',
        waitingTime: waitTime || 0,
      };

      updateWaitingApponintmentStatusApi(params)
        .unwrap()
        .then(res => {
          setIsReason(false);
          setReason('');
          setWaitTime(0);
          setWaitingIndex(1000);
          getAllTypeAppointments();
          getAllWaitAppointments();
        })
        .catch(e => {
          console.log('update waiting List err>>', e);
          setIsReason(false);
          setReason('');
          setWaitingIndex(1000);
        });
    } catch (e) {
      console.log('update waiting List err', e);
      setIsReason(false);
      setReason('');
    }
  };
  return (
    <View style={styles.container}>
      {hearderContainerView()}
      <FlatList
        data={isAppointment ? appointmentListData : waitListData}
        //@ts-ignore
        renderItem={renderItem}
        keyExtractor={(item, index) => (index + 1).toString()}
        ListEmptyComponent={ListEmptyComponent}
      />
      <GTModal visible={isRequest}>
        {isAppointment ? (
          <GTCommentView
            onHandlePress={() => createComment()}
            comment={comment}
            setComment={setComment}
            onClosePress={() => {
              SetIsRequest(false);
              SetChatIndex(0);
              setComment('');
            }}
            isLoading={commentLoading}
            isKeyboard={keyboardStatus}
          />
        ) : isReason ? (
          <GTCancelSlot
            onClosePress={() => {
              SetIsRequest(false);
              setIsReason(false);
            }}
            comment={reason}
            setReason={setReason}
            yesButtonPress={() => {
              SetIsRequest(false);
              moveForwordRef.current = setTimeout(() => {
                updateWaitListStatus();
              }, 200);
            }}
            noButtonPress={() => {
              SetIsRequest(false);
              setIsReason(false);
            }}
            isKeyboard={keyboardStatus}
          />
        ) : (
          <GTConfirmSlot
            onClosePress={() => {
              SetIsRequest(false);
            }}
            yesButtonPress={() => {
              SetIsRequest(false);
              dateTimeRef.current = setTimeout(() => {
                updateWaitListStatus();
              }, 200);
            }}
            isKeyboard={keyboardStatus}
            waitTime={waitTime}
            setWaitTime={(value: any) =>
              setWaitTime(value.replace(/[^0-9]/g, ''))
            }
            noButtonPress={() => {
              SetIsRequest(false);
            }}
          />
        )}
      </GTModal>
      {(isLoading || isConfirmLoading) && <GTIndicator />}
    </View>
  );
};

export default MyAppointment;
