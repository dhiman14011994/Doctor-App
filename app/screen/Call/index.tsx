import {
  View,
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
import {useLazyGetAllTypeAppointmentsApiQuery} from '../../redux/home-api-slice';
import moment from 'moment';
import GTModal from '../../components/GTModal';
import GTCommentView from '../../components/GTCommentView';
import {useDispatch, useSelector} from 'react-redux';
import {
  useAppointmentGetCallRecordingApiMutation,
  useCreateCommentApiMutation,
} from '../../redux/chat-api-slice';
import {setScreenName} from '../../redux/app-api-slice';
import {setPrefsValue} from '../../utils/storage';
import ListEmptyComponent from '../../components/ListEmptyComponent/ListEmptyComponent';
import Toast from 'react-native-toast-message';
import GTIndicator from '../../components/GTIndicator';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import GTAudioPlayer from '../../components/GTAudioPlayer/GTAudioPlayer';

const audioRecorderPlayer = new AudioRecorderPlayer();

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
  const [appointmentGetCallRecordingApi, {isLoading: callRecordingLoading}] =
    useAppointmentGetCallRecordingApiMutation();
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [audioData, setAudioData] = useState('');
  const [isPlaying, setPlaying] = useState(true);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [duration, setDuration] = useState(100);
  const [count, setCount] = useState(0);
  const [appointmentUser, setAppointmentUser] = useState<any>({});
  const dispatch = useDispatch();
  const onRef: any = useRef(null);
  const timerRef: any = useRef(null);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
      if (onRef.current) {
        clearTimeout(onRef.current);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    getAllTypeAppointments();
  }, [isFocus]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        nextAppState === 'unknown' ||
        nextAppState === 'background' ||
        nextAppState === 'inactive'
      ) {
        closeAudioPlayer();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const closeAudioPlayer = () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setIsAudio(false);
    setCurrentDuration(0);
    setAudioData('');
    setPlaying(true);
    setAppointmentUser({});
  };

  const getAllTypeAppointments = () => {
    getAllTypeAppointmentsApi('allTypes')
      .unwrap()
      .then((res: any) => {})
      .catch(e => {
        console.log('appointment all Type', e);
      });
  };

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
    };
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
    setPrefsValue(CONSTANTS.STORAGE.SCREEN_NAME, 'Call');
    dispatch(setScreenName(''));
  }, [isFocus]);

  const onPlayPausePress = async () => {
    setPlaying(!isPlaying);
    if (isPlaying) {
      await audioRecorderPlayer.startPlayer(audioData);
      audioRecorderPlayer.addPlayBackListener(e => {
        setCurrentDuration(e.currentPosition);
        setDuration(e.duration);
        return;
      });
    } else {
      await audioRecorderPlayer.pausePlayer();
    }
  };

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
          text={'Call'}
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

  const fetchRecordFile = (id: any) => {
    appointmentGetCallRecordingApi({id})
      .unwrap()
      .then(res => {
        if (res?.data?.callData?.audio) {
          setAudioData(res?.data?.callData?.audio);
          setIsAudio(true);
        } else {
          Toast.show({
            type: 'error',
            text2: 'No recording audio found',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderItem = ({item, index}: any) => {
    var dateTime = item?.scheduledDateTime
      ? moment(item?.scheduledDateTime).format('DD MMM YYYY,  hh:mm A')
      : '';
    if (item?.appointmentType !== 'chat') {
      return (
        <GTAppointmentList
          onHandlePress={() => {
            fetchRecordFile(item?._id);
            setAppointmentUser({
              name: `${item.scheduledBy_firstName || ''}${
                item?.scheduledBy_lasttName
                  ? ' ' + item?.scheduledBy_lasttName
                  : ''
              }`,
              image: item?.scheduledBy_profilePicture || '',
            });
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
          isWait={false}
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
      (it: any) => it?.appointmentType !== 'chat',
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
            SetChatIndex(0);
            setComment('');
          }}
          isLoading={commentLoading}
          isKeyboard={keyboardStatus}
        />
      </GTModal>

      <GTModal
        container={{
          justifyContent: 'flex-end',
        }}
        visible={isAudio}
        onClose={() => {
          closeAudioPlayer();
        }}>
        <GTAudioPlayer
          onPlayPausePress={onPlayPausePress}
          isPlaying={isPlaying}
          duration={duration}
          currentDuration={currentDuration}
          onClosePress={() => {
            closeAudioPlayer();
          }}
          image={appointmentUser?.image || ''}
          name={appointmentUser?.name || ''}
        />
      </GTModal>

      {isLoading && <GTIndicator />}
    </View>
  );
};

export default Chat;
