import {
  View,
  Platform,
  StatusBar,
  ImageBackground,
  Keyboard,
  EmitterSubscription,
  BackHandler,
  AppState,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import CONSTANTS from '../../utils/constants';
import {
  CHAT_BACKGROUND_IMAGE,
  WHITE_DOT_ICON,
  White_Left_Icon,
} from '../../assets';
import GTLinearGradientView from '../../components/GTLinearGradientView';
import GTHeader from '../../components/GTHeader';
import styles from './styles';
import GTImage from '../../components/GTImage';
import GTLabel from '../../components/GTLabel';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {renderComposer} from './ChatComponents/InputToolBar';
import {
  renderAvatar,
  renderDay,
  renderMessageImage,
  renderMessageText,
} from './ChatComponents/MessageContainer';
import GTRenderInputToolbar from '../../components/GTRenderInputToolbar';
import socketServices from '../../utils/socketService';
import {useDispatch, useSelector} from 'react-redux';
import {
  useBusyUserStatusApiMutation,
  useLazyGetChatListApiQuery,
  useReadMessageApiMutation,
} from '../../redux/chat-api-slice';
import moment from 'moment';
import EmojiPicker from '../../components/CustomEmojiPicker/emojis/EmojiPicker';
import GTIndicator from '../../components/GTIndicator';
import {
  formatTime,
  requestCameraPermission,
  requestExternalWritePermission,
} from '../../utils/customFunction';
import {
  useLazyGetUserDataApiQuery,
  useUploadFileApiMutation,
} from '../../redux/auth-api-slice';

import DocumentPicker, {types} from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import {getPrefsValue, setPrefsValue} from '../../utils/storage';
import {renderBubble} from './ChatComponents/MessageContainer';
import {setSessionRunning, setSessionTimer} from '../../redux/app-api-slice';

const APPROXIMATE_HEIGHT = CONSTANTS.THEME.size.HEIGHT * 0.4;

const UserChat = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const route: any = useRoute();
  const gitfChatRef = useRef<any>();
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>('');
  const {userInfo, sessionTimer} = useSelector((state: any) => state?.appState);
  const [getChatListApi, {isLoading: isChatLoading}] =
    useLazyGetChatListApiQuery();
  const [isSelectedEmoji, setIsSelectedEmoji] = useState<boolean>(false);
  const [uploadFileApi, {data: uploadImageData, isLoading: imageLoading}] =
    useUploadFileApiMutation();
  let inputRef: any = useRef(null);
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState(APPROXIMATE_HEIGHT);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [readMessageApi] = useReadMessageApiMutation();
  const [sessionDetails, setSessionDetails] = useState<any>({});
  const [busyUserStatusApi] = useBusyUserStatusApiMutation();
  const [getUserDataApi, {data: customerData, isLoading: getUserLoading}] =
    useLazyGetUserDataApiQuery();

  const [chatTime, setChatTime] = useState<number>(0);
  const timerRef: any = useRef(null);
  var internalData: any;

  const dispatch = useDispatch();

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
    getUserDetails();
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
        dispatch(setSessionTimer(data?.body?.sessionTiming));
        if (data?.body?.sessionTiming == 1) {
          setChatTime(1);
        }
      }
    });

    return () => {
      dispatch(setSessionRunning(false));
      dispatch(setSessionTimer(0));
    };
  }, []);

  useEffect(() => {
    if (isFocus) {
      updateScreenStatus('Chat');
    }
  }, [isFocus]);

  const updateScreenStatus = async (screenName: any) => {
    setPrefsValue(CONSTANTS.STORAGE.SCREEN_NAME, screenName);
  };

  useEffect(() => {
    getAllChatData();
    let roomObj = {
      room: route?.params?.data?._id,
    };
    socketServices.emit(CONSTANTS.SOCKET_EVENTS.JOIN_ROOM, roomObj);
    getMessageList();
  }, [isFocus]);

  useEffect(() => {
    updateUserStatus(true);
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        // updateUserStatus(false);
      }
    });

    return () => {
      subscription.remove();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const updateUserStatus = (params: any) => {
    busyUserStatusApi({status: params})
      .unwrap()
      .then(res => {
        console.log('res chat', res?.data?.isBusy);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    let keyboardDidShowListener: EmitterSubscription;

    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setVisible(false);
      setKeyboardStatus(false);
    });
    return () => {
      if (keyboardDidShowListener) {
        keyboardDidShowListener.remove();
      }
      hideSubscription.remove();
    };
  });

  useEffect(() => {
    socketServices.on('notification', (data: any) => {
      if (
        data.body?.notificationType == 'sessionExpire' ||
        data.body?.notificationType == 'sessionClose'
      ) {
        var otherUserId =
          route?.params?.data?.scheduledWith == userInfo?._id
            ? route?.params?.data?.scheduledBy
            : route?.params?.data?.scheduledWith;
        if (otherUserId == data.body?.senderId) {
          var newSessionData: any = sessionDetails;
          newSessionData.sessionStatus = true;
          setSessionDetails(newSessionData);
          moveBackHome();
          Toast.show({
            type: 'success',
            text2: data?.body?.message,
          });
        }
      }
    });
  }, []);

  const moveBackHome = () => {
    let selectedScreen = getPrefsValue(CONSTANTS.STORAGE.SCREEN_NAME);
    updateUserStatus(false);
    if (selectedScreen == 'Chat') {
      navigation.goBack();
    }
  };

  useEffect(() => {
    const backAction = () => {
      updateUserStatus(false);
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

  const keyboardDidShow = (e: any) => {
    setKeyboardStatus(true);
    setVisible(false);
    setHeight(e.endCoordinates.height); // sets the height after opening the keyboard
  };

  const openEmojiPicker = () => {
    Keyboard.dismiss();
    if (inputRef?.current) {
      inputRef?.current.blur();
    }
    setVisible(!visible);
  };

  const getAllChatData = () => {
    getChatListApi(route?.params?.data?._id)
      .unwrap()
      .then((res: any) => {
        setSessionDetails(res?.data?.chatSession || {});
        const giftedChats: IMessage = res?.data?.chatMessages?.map(
          (it: any) => {
            return {
              ...it,
              text: it?.message ? it?.message : '',
              createdAt: moment(it.createdAt).toDate(),
              user:
                it?.senderId == userInfo._id
                  ? {
                      _id: userInfo._id || '',
                      name: userInfo?.firstName || '',
                      avatar: userInfo.profilePicture || '',
                    }
                  : {
                      _id: it?.senderId,
                      name: route?.params?.data?.scheduledBy_firstName
                        ? `${route?.params?.data?.scheduledBy_firstName}${
                            route?.params?.data?.scheduledBy_lasttName
                              ? ' ' + route?.params?.data?.scheduledBy_lasttName
                              : ''
                          }`
                        : customerData?.data?.firstName || '',
                      avatar:
                        route?.params?.data?.scheduledBy_profilePicture ||
                        customerData?.data?.profilePicture ||
                        'https://img.icons8.com/ios/50/user-male-circle--v1.png',
                    },
            };
          },
        );

        setMessages(giftedChats);
        readMessageApi(route?.params?.data?._id)
          .unwrap()
          .then(res => {})
          .catch(e => {
            console.log('readmessage error>>>', e);
          });

        if (
          Array.isArray(res?.data?.chatMessages) &&
          res?.data?.chatMessages.length == 0
        ) {
          var uName = route?.params?.data?.scheduledBy_firstName
            ? `${route?.params?.data?.scheduledBy_firstName}${
                route?.params?.data?.scheduledBy_lasttName
                  ? ' ' + route?.params?.data?.scheduledBy_lasttName
                  : ''
              }`
            : customerData?.data?.firstName || '';
          const _createdtime_ = Date.now();
          var senderData = {
            room: route?.params?.data?._id,
            receiverId:
              route?.params?.data?.scheduledWith == userInfo?._id
                ? route?.params?.data?.scheduledBy
                : route?.params?.data?.scheduledWith,
            senderId: userInfo?._id,
            message: `Hello ${uName}`,
            appointmentId: route?.params?.data?._id,
            createdAt: _createdtime_,
          };

          socketServices.emit(CONSTANTS.SOCKET_EVENTS.SEND_MESSAGE, senderData);
        }
      })
      .catch(e => {
        console.log('chatData error>>', e);
      });
  };

  const getMessageList = () => {
    socketServices.on(CONSTANTS.SOCKET_EVENTS.RECEIVE_MESSAGE, (data: any) => {
      setMessages((prev: any) => [
        ...prev,
        {
          _id: prev?.length ? prev.length + 1 : 1,
          text: data?.message ? data?.message : '',
          ...data,
          user:
            data.senderId == userInfo._id
              ? {
                  _id: userInfo._id || '',
                  name: userInfo?.firstName || '',
                  avatar: userInfo.profilePicture || '',
                }
              : {
                  _id: data?.senderId,
                  name: route?.params?.data?.scheduledBy_firstName
                    ? `${route?.params?.data?.scheduledBy_firstName}${
                        route?.params?.data?.scheduledBy_lasttName
                          ? ' ' + route?.params?.data?.scheduledBy_lasttName
                          : ''
                      }`
                    : customerData?.data?.firstName || '',
                  avatar:
                    route?.params?.data?.scheduledBy_profilePicture ||
                    customerData?.data?.profilePicture ||
                    'https://img.icons8.com/ios/50/user-male-circle--v1.png',
                },
        },
      ]);
    });
  };

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
                  text={`${formatTime(sessionTimer)}`}
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
          // rightIcon={
          //   <WHITE_DOT_ICON
          //     width={CONSTANTS.THEME.size.s20}
          //     height={CONSTANTS.THEME.size.s20}
          //   />
          // }
          customStyle={styles.headerContainer}
          textStyle={{textAlign: 'left'}}
          onHandleLeftPress={() => {
            updateUserStatus(false);
            navigation.goBack();
          }}
        />
      </>
    );
  };

  const selectImage = async () => {
    try {
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();

      if (isStoragePermitted) {
        DocumentPicker.pick({
          allowMultiSelection: false,
          type: [types.doc, types.docx, types.images, types.pdf],
        })
          .then(res => {
            uploadImage(res);
          })
          .catch(err => {
            console.log('err', err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = (values: any) => {
    var formData = new FormData();
    formData.append('profile_picture', {
      uri: values[0]?.uri,
      type: values[0].type,
      name: values[0].name,
    });
    uploadFileApi(formData)
      .unwrap()
      .then(res => {
        var urlData = res?.data?.url || res?.data[0].url;
        var type = urlData.split('.').pop();
        const docData = ['doc', 'docx', 'pdf']; // put here name of screen where you want to hide tabBar
        const isDoc = docData.indexOf(type) <= -1;

        const _createdtime_ = Date.now();
        var senderData = {
          room: route?.params?.data?._id,
          receiverId:
            route?.params?.data?.scheduledWith == userInfo?._id
              ? route?.params?.data?.scheduledBy
              : route?.params?.data?.scheduledWith,
          senderId: userInfo?._id,
          message: '',
          document: !isDoc ? urlData : '',
          image: isDoc ? urlData : '',
          appointmentId: route?.params?.data?._id,
          createdAt: _createdtime_,
        };

        socketServices.emit(CONSTANTS.SOCKET_EVENTS.SEND_MESSAGE, senderData);
      })
      .catch(e => {
        console.log('upload err', JSON.stringify(e));
        if (e?.originalStatus == 413) {
          Toast.show({
            type: 'error',
            text2: 'Request Entity Too Large',
          });
        } else {
          Toast.show({
            type: 'error',
            text2: e?.responseMessage || 'file not upload',
          });
        }
      });
  };

  const onSend = () => {
    Keyboard.dismiss();
    setIsSelectedEmoji(false);
    setVisible(false);
    const _createdtime_ = Date.now();
    var senderData = {
      room: route?.params?.data?._id,
      receiverId:
        route?.params?.data?.scheduledWith == userInfo?._id
          ? route?.params?.data?.scheduledBy
          : route?.params?.data?.scheduledWith,
      senderId: userInfo?._id,
      message: newMessage,
      appointmentId: route?.params?.data?._id,
      createdAt: _createdtime_,
    };

    socketServices.emit(CONSTANTS.SOCKET_EVENTS.SEND_MESSAGE, senderData);
    timerRef.current = setTimeout(() => {
      setNewMessage('');
    }, 500);
  };

  const onContentSizeChange = () => {
    gitfChatRef.current.scrollToEnd({animated: true});
  };

  const renderInputsToolbar = () => {
    return (
      <GTRenderInputToolbar
        ref={inputRef}
        onEmojiPress={() => {
          openEmojiPicker();
        }}
        mediaPress={() => selectImage()}
        onChangeText={(text: any) => setNewMessage(text)}
        value={newMessage}
        onSendMessage={() => {
          setVisible(false);
          Keyboard.dismiss();
          onSend();
        }}
        onFocus={() => {
          setVisible(false);
        }}
        isSelectedEmoji={isSelectedEmoji}
      />
    );
  };

  const onChangeEmoji = (res: any) => {
    var text = `${newMessage}${res}`;
    setNewMessage(text);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
      <ImageBackground source={CHAT_BACKGROUND_IMAGE} style={styles.container}>
        {hearderContainerView()}

        <GiftedChat
          messages={messages}
          inverted={false}
          // renderComposer={renderComposer}
          renderDay={renderDay}
          renderMessageImage={renderMessageImage}
          scrollToBottom
          renderBubble={renderBubble}
          renderMessageText={renderMessageText}
          renderInputToolbar={() => {
            return <View />;
          }}
          minInputToolbarHeight={0}
          // isTyping
          placeholder={CONSTANTS.TEXT.TYPE_YOUR_MESSAGE}
          alwaysShowSend={false}
          listViewProps={{
            ref: gitfChatRef,
            onContentSizeChange: onContentSizeChange,
          }}
          showAvatarForEveryMessage={true}
          showUserAvatar={false}
          user={{
            _id: userInfo._id || '',
            avatar: userInfo.profilePicture || '',
            //@ts-ignore
            name: userInfo?.firstName || '',
          }}
          renderAvatar={() => {
            return <View />;
          }}
        />

        <View>
          {!sessionDetails?.sessionStatus ? (
            renderInputsToolbar()
          ) : (
            <View style={styles.sessionDetailsView}>
              <GTLabel
                text={'Session has been expired'}
                color={CONSTANTS.THEME.colors.WHITE_COLOR}
                fontWeight="600"
              />
            </View>
          )}
          <View
            style={{
              height: visible ? height : 0,
              backgroundColor: CONSTANTS.THEME.colors.BackgroundColor,
            }}>
            <EmojiPicker selectedEmoji={onChangeEmoji} />
          </View>
        </View>

        {Platform.OS == 'ios' && insets.bottom > 0 && (
          <View style={{height: insets.bottom}} />
        )}

        {(isChatLoading || imageLoading) && <GTIndicator />}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default UserChat;
