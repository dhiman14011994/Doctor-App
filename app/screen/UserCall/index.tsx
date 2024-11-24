import {
  View,
  Platform,
  StatusBar,
  ImageBackground,
  BackHandler,
  AppState,
  Alert,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import CONSTANTS from '../../utils/constants';
import {
  CALL_BACKGROUND,
  CROSS_WHITE_ICON,
  MIC_WHITE_ICON,
  VOLUME_ICON,
  White_Left_Icon,
} from '../../assets';
import GTLinearGradientView from '../../components/GTLinearGradientView';
import GTHeader from '../../components/GTHeader';
import styles from './styles';
import GTImage from '../../components/GTImage';
import GTLabel from '../../components/GTLabel';
import socketServices from '../../utils/socketService';
import {useDispatch, useSelector} from 'react-redux';

import {
  formatTime,
  requestMicrophone,
  requestRecordingPermission,
} from '../../utils/customFunction';
import {
  useLazyGetUserDataApiQuery,
  useUploadFileApiMutation,
} from '../../redux/auth-api-slice';

import GTButtonContainer from '../../components/GTButtonContainer';

import {
  useAppointmentCallRecordingApiMutation,
  useBusyUserStatusApiMutation,
} from '../../redux/chat-api-slice';
import {setPrefsValue} from '../../utils/storage';
import {
  setAudioRecording,
  setCurrentappointmentData,
  setSessionRunning,
  setSessionTimer,
} from '../../redux/app-api-slice';
import MicOff from '../../assets/MicOff';
import InCallManager from 'react-native-incall-manager';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
} from 'react-native-webrtc';

import IdleTimerManager from 'react-native-idle-timer';

const audioRecorderPlayer = new AudioRecorderPlayer();

const UserCall = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const route: any = useRoute();
  const {userInfo, isSessionRuning, sessionTimer, isRecording} = useSelector(
    (state: any) => state?.appState,
  );

  const dispatch = useDispatch();
  const [getUserDataApi, {data: customerData, isLoading: getUserLoading}] =
    useLazyGetUserDataApiQuery();
  const connectionRef: any = useRef();
  const [busyUserStatusApi] = useBusyUserStatusApiMutation();
  const state = useSelector((state: any) => state.appState);
  const [isSpeaker, setIsSpeaker] = useState<boolean>(false);
  const [isRecord, setIsRecord] = useState<boolean>(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState<any>(0);
  const [leaveCount, setLeaveCount] = useState(0);
  const isRemotePeerCalled = useRef(false);
  const callHangUp: any = useRef(false);
  const [mute, setMute] = useState(false);
  const [isStart, setStart] = useState(false);
  const myAudio: any = useRef(null);
  const [uploadFileApi, {data: uploadImageData, isLoading: imageLoading}] =
    useUploadFileApiMutation();
  const [appointmentCallRecordingApi, {isLoading: callRecordingLoading}] =
    useAppointmentCallRecordingApiMutation();

  const partnerName = customerData?.data?.firstName
    ? `${customerData?.data?.firstName}${
        customerData?.data?.lastName ? ' ' + customerData?.data?.lastName : ''
      }`
    : '';
  let interval: any;
  const [sessionTime, setSessionTime] = useState<number>(0);
  const [count, setCount] = useState(0);
  const [chatTime, setChatTime] = useState<number>(0);
  var internalData: any;

  useEffect(() => {
    IdleTimerManager.setIdleTimerDisabled(true);

    return () => IdleTimerManager.setIdleTimerDisabled(false);
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
    setLeaveCount(0);
    updateScreenStatus();
    // let sentObj: any = {
    //   partnerId: userInfo?._id,
    //   body: {
    //     partnerBusyStatus: true,
    //     notificationType: 'partnerBusyStatus',
    //   },
    // };

    // socketServices.emit('partnerBusyStatus', sentObj);
  }, [isFocus]);

  useEffect(() => {
    setStart(false);
    dispatch(setSessionTimer(0));

    dispatch(setAudioRecording(false));
    updateUserStatus(true);
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'unknown' || nextAppState === 'background') {
        connectionRef?.current?.close();
        dispatch(setCurrentappointmentData(''));
        setPrefsValue('cureentValue', '');
        setMute(false);
        if (sessionTimer > 2) {
          navigation.goBack();
        }
        socketServices.emit('callHangUp', {
          status: true,
          room: route?.params?.data?._id,
        });
        dispatch(setSessionRunning(false));
        dispatch(setSessionTimer(0));
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    requestMicrophone();
    getUserDetails();
    hanldleControl('unmute');
  }, []);

  const getUserDetails = () => {
    getUserDataApi(
      route?.params?.data?.scheduledWith == userInfo?._id
        ? route?.params?.data?.scheduledBy
        : route?.params?.data?.scheduledWith,
    )
      .unwrap()
      .then(res => {})
      .catch(err => {
        console.log('error partnerDetails', err);
      });
  };

  useEffect(() => {
    socketServices.emit('callReceived', {
      isReceived: true,
    });

    socketServices.on('call_session_timing', async (data: any) => {
      if (
        data?.body?.appointmentId == route?.params?.data?._id &&
        data?.startCallBy ==
          (route?.params?.data?.scheduledWith == userInfo?._id
            ? route?.params?.data?.scheduledBy
            : route?.params?.data?.scheduledWith) &&
        isFocus
      ) {
        dispatch(setSessionRunning(true));
        dispatch(setSessionTimer(Number(data?.body?.sessionTiming) + 1));

        if (!isRecording) {
          dispatch(setAudioRecording(true));
          recodAudioStart();
        }
      }
    });

    socketServices.on('callHangUp', async (data: any) => {
      callHangUp.current = data;
      setLeaveCount(pre => pre + 1);
      updateUserStatus(false);
      dispatch(setSessionTimer(0));
      leaveCall();
    });

    return () => {
      socketServices.removeListener('callHangUp');
    };
  }, []);

  const updateScreenStatus = async () => {
    setPrefsValue(CONSTANTS.STORAGE.SCREEN_NAME, 'call');
  };

  useEffect(() => {
    const backAction = () => {
      quitCallPopup();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    callUser();
  }, []);

  const callUser = async () => {
    try {
      const mediaStream = await mediaDevices.getUserMedia({
        // audio: true,
        audio: {
          // echoCancellation: true,
          // noiseSuppression: true,
          // autoGainControl: true,
          // googEchoCancellation: true,
          // googAutoGainControl: true,
          // googNoiseSuppression: true,
          // googHighpassFilter: true,
          // googTypingNoiseDetection: true,
          // googNoiseReduction: true,
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          volume: 1.0,
        },
        video: false,
      });
      if (mediaStream) {
        const configuration = {
          iceServers: [
            {
              urls: 'stun:stun.relay.metered.ca:80',
            },
            {
              urls: 'turn:global.relay.metered.ca:80',
              username: '641159709bb3b08b0affecb7',
              credential: 'zaXbhon7U69Aj0fv',
            },
            {
              urls: 'turn:global.relay.metered.ca:80?transport=tcp',
              username: '641159709bb3b08b0affecb7',
              credential: 'zaXbhon7U69Aj0fv',
            },
            {
              urls: 'turn:global.relay.metered.ca:443',
              username: '641159709bb3b08b0affecb7',
              credential: 'zaXbhon7U69Aj0fv',
            },
            {
              urls: 'turns:global.relay.metered.ca:443?transport=tcp',
              username: '641159709bb3b08b0affecb7',
              credential: 'zaXbhon7U69Aj0fv',
            },
          ],
        };
        var peerConnection: any = new RTCPeerConnection(configuration);
        if (mediaStream) {
          myAudio.current = mediaStream;
          mediaStream
            .getTracks()
            .forEach((track: any) =>
              peerConnection?.addTrack(track, mediaStream),
            );
          hanldleControl('unmute');
        }
        peerConnection.ontrack = (event: any) => {
          if (!isRemotePeerCalled.current) {
            isRemotePeerCalled.current = true;
            dispatch(setSessionRunning(true));
          }
        };
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(state.clientCallingDetails.signal),
        );

        var candidatesData = Array.isArray(state.candidates.candidates)
          ? state.candidates.candidates
          : state.candidates || [];
        if (candidatesData.length != 0) {
          for (let i = 0; i < candidatesData?.length; i++) {
            await peerConnection.addIceCandidate(
              new RTCIceCandidate(candidatesData[i]),
            );
          }
        }

        peerConnection.createAnswer().then((answer: any) => {
          peerConnection.setLocalDescription(answer).then(() => {
            socketServices.emit('answerCall', {
              signal: answer,
              to: state.clientCallingDetails.from,
              room: state.appointmentId,
            });
            dispatch(setSessionRunning(true));
            dispatch(setSessionTimer(1));
            setChatTime(1);
          });
        });
        peerConnection.onicecandidate = function (event: any) {
          socketServices.emit('setRemoteCandidates', {
            candidates: event.candidate,
          });
        };

        connectionRef.current = peerConnection;
      }
    } catch (error) {}
  };

  const updateUserStatus = (params: any) => {
    busyUserStatusApi({status: params})
      .unwrap()
      .then(res => {
        console.log('userCall>>res');
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    if (chatTime != 0) {
      internalData = setInterval(() => {
        setChatTime(pre => pre + 1);
      }, 1000);
    }
    return () => {
      clearInterval(internalData);
      setChatTime(0);
    };
  }, [chatTime]);

  const hearderContainerView = () => {
    return (
      <>
        {Platform.OS == 'android' ? (
          <GTLinearGradientView container={{height: insets.top}}>
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
        <GTHeader
          appIcon={
            <View style={styles.headerUserStyle}>
              <GTImage
                imageStyle={styles.userImageStyle}
                uri={
                  route?.params?.data?.scheduledBy_profilePicture ||
                  customerData?.data?.profilePicture ||
                  ''
                }
              />
              <View style={styles.nameStyle}>
                <GTLabel
                  fontSize={CONSTANTS.THEME.size.s14}
                  text={
                    route?.params?.data?.firstName
                      ? `${route?.params?.data?.firstName} ${route?.params?.data?.lastName}`
                      : route?.params?.data?.scheduledBy_firstName
                      ? `${route?.params?.data?.scheduledBy_firstName}${
                          route?.params?.data?.scheduledBy_lasttName
                            ? ' ' + route?.params?.data?.scheduledBy_lasttName
                            : ''
                        }`
                      : customerData?.data?.firstName || ''
                  }
                  color={CONSTANTS.THEME.colors.NEUTRAL[100]}
                  customStyle={{
                    lineHeight: CONSTANTS.THEME.size.s20,
                    width: CONSTANTS.THEME.size.WIDTH * 0.5,
                  }}
                  fontWeight="700"
                />
                <GTLabel
                  fontSize={CONSTANTS.THEME.size.s12}
                  text={''}
                  customStyle={{lineHeight: CONSTANTS.THEME.size.s18}}
                  fontWeight="400"
                  color="rgba(255, 255, 255, 0.65)"
                />
              </View>
            </View>
          }
          leftIcon={
            <White_Left_Icon
              width={CONSTANTS.THEME.size.s20}
              height={CONSTANTS.THEME.size.s20}
            />
          }
          customStyle={styles.headerContainer}
          textStyle={{textAlign: 'left'}}
          onHandleLeftPress={() => {
            updateUserStatus(false);
            socketServices.emit('callHangUp', {
              status: true,
              room: route?.params?.data?._id,
            });
            leaveCall();
          }}
        />
      </>
    );
  };

  const quitCallPopup = () => {
    Alert.alert('Quit Call', 'Are your sure you want to leave call?.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          updateUserStatus(false);
          socketServices.emit('callHangUp', {
            status: true,
            room: route?.params?.data?._id,
          });
          leaveCall();
        },
      },
    ]);
  };

  const leaveCall = () => {
    if (leaveCount < 2 && isFocus) {
      recodAudioStop();
      connectionRef?.current?.close();
      dispatch(setSessionTimer(0));
      dispatch(setCurrentappointmentData(''));
      setPrefsValue('cureentValue', '');
      setMute(false);
      setLeaveCount(10);
      navigation.goBack();
      dispatch(setSessionRunning(false));
    }
  };

  const uploadAudioFile = (record: any) => {
    var formData = new FormData();
    formData.append('profile_picture', {
      uri: Platform.OS === 'android' ? record : record.replace('file://', ''),
      name: 'test.mp4',
      type: 'audio/mp4',
    });
    uploadFileApi(formData)
      .unwrap()
      .then((res: any) => {
        appointmentCallRecordingApi({
          id: route?.params?.data?._id,
          data: {audio: res?.data[0]?.url || ''},
        })
          .unwrap()
          .then(res => {
            console.log(res);
          })
          .catch(e => {
            console.log('Call recording error', e);
          });
      })
      .catch(e => {
        console.log('upload err', JSON.stringify(e));
      });
  };

  const hanldleControl = async (type: string) => {
    try {
      if (myAudio?.current) {
        const audioTrack = myAudio.current
          .getTracks()
          .find((track: any) => track.kind === 'audio');
        console.log('type', type);
        if (type === 'mute') {
          audioTrack.enabled = false;
          setMute(false);
        } else {
          audioTrack.enabled = true;
          setMute(true);
        }
      }
    } catch (err) {
      console.log('err>>', err);
      // Handle Error
    }
  };

  const hanldleSpeaker = () => {
    try {
      InCallManager?.setSpeakerphoneOn(!isSpeaker);
      setIsSpeaker(!isSpeaker);
    } catch (err) {
      console.log('err>>', err);
    }
  };

  const recodAudioStart = useCallback(async () => {
    try {
      var isRecodPermission = await requestRecordingPermission();
      if (isRecodPermission && audioRecorderPlayer) {
        // setIsRecord(true);
        const result = await audioRecorderPlayer?.startRecorder();
        audioRecorderPlayer.addRecordBackListener(e => {
          setRecordSecs(pre => e.currentPosition);
          setRecordTime(
            audioRecorderPlayer?.mmssss(Math.floor(e?.currentPosition)) || 0,
          );
          return;
        });
      }
    } catch (e) {
      console.log('start recording error', e);
    }
  }, []);
  const recodAudioStop = React.useCallback(async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordSecs(0);
      setIsRecord(false);

      if (result != 'Already stopped') {
        console.log('Stop record>>', result);
        uploadAudioFile(result);
      }
      console.log('Stop record', result);
    } catch (e) {
      console.log('err', e);
    }
  }, []);

  return (
    <ImageBackground source={CALL_BACKGROUND} style={styles.container}>
      {hearderContainerView()}
      <View style={styles.subContainer}>
        <GTImage
          uri={customerData?.data?.profilePicture}
          imageStyle={styles.userImagesStyle}
        />
        <GTLabel
          text={partnerName}
          fontWeight="600"
          customStyle={{lineHeight: CONSTANTS.THEME.size.s28}}
          fontSize={CONSTANTS.THEME.size.s18}
        />
        <GTLabel
          text={sessionTimer > 0 ? `${formatTime(sessionTimer)}` : 'Connecting'}
          fontWeight="200"
          fontSize={CONSTANTS.THEME.size.s14}
          customStyle={{lineHeight: CONSTANTS.THEME.size.s26}}
        />
      </View>
      <View style={styles.menuContainter}>
        <GTButtonContainer
          customStyle={{
            ...styles.volumeButton,
            backgroundColor: isSpeaker
              ? CONSTANTS.THEME.colors.PRIMARY_COLOR
              : 'rgb(46,46,46)',
          }}
          onHandlePress={() => {
            hanldleSpeaker();
          }}>
          <VOLUME_ICON
            height={CONSTANTS.THEME.size.s24}
            width={CONSTANTS.THEME.size.s24}
          />
        </GTButtonContainer>

        <GTButtonContainer
          onHandlePress={() => {
            hanldleControl(!mute ? 'unmute' : 'mute');
          }}
          customStyle={{
            ...styles.volumeButton,
            backgroundColor: 'rgb(46,46,46)',
          }}>
          {!mute ? (
            <MicOff
              height={CONSTANTS.THEME.size.s24}
              width={CONSTANTS.THEME.size.s24}
              fill={'#FFF'}
            />
          ) : (
            <MIC_WHITE_ICON
              height={CONSTANTS.THEME.size.s24}
              width={CONSTANTS.THEME.size.s24}
            />
          )}
        </GTButtonContainer>
        <GTButtonContainer
          onHandlePress={() => {
            quitCallPopup();
          }}
          customStyle={{
            ...styles.volumeButton,
            backgroundColor: CONSTANTS.THEME.colors.RED,
          }}>
          <CROSS_WHITE_ICON
            height={CONSTANTS.THEME.size.s24}
            width={CONSTANTS.THEME.size.s24}
          />
        </GTButtonContainer>
      </View>
    </ImageBackground>
  );
};

export default UserCall;
