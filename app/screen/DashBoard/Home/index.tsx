import {
  View,
  FlatList,
  Animated,
  RefreshControl,
  Keyboard,
  AppState,
} from 'react-native';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import CONSTANTS from '../../../utils/constants';
import {
  BLUE_RIGHT_ARROW,
  Chat_Icon,
  Earning_Icon,
  Mic_Icon,
} from '../../../assets';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GTLabel from '../../../components/GTLabel';
import GTLinearGradientView from '../../../components/GTLinearGradientView';
import PagingDotContainer from '../../../components/PagingDotContainer';
import GTFlatlist from '../../../components/GTFlatlist/GTFlatlist';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAppointmentId,
  setCandidates,
  setclientCallingDetails,
  setCurrentappointmentData,
  setIsLive,
  setIsLogin,
  setToken,
  setUserInfo,
} from '../../../redux/app-api-slice';
import {getPrefsValue, setPrefsValue} from '../../../utils/storage';
import GTReviewList from '../../../components/GTReviewList';
import GTButtonContainer from '../../../components/GTButtonContainer';
import {RouteNames} from '../../../utils/routesName';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import GTModal from '../../../components/GTModal';
import GTOnline from '../../../components/GTOnline';
import GTTodaySchedule from '../../../components/GTTodaySchedule';
import GTTodaySessionList from '../../../components/GTTodaySessionList';
import GTCarousalFlatList from '../../../components/GTCarousalFlatList';
import GTRequestView from '../../../components/GTRequestView';
import {
  useLazyGetAllAppointmentsRequestApiQuery,
  useLazyGetAllBlogApiQuery,
  useLazyGetAllTypeAppointmentsApiQuery,
  useLazyGetBannerApiQuery,
  useLazyGetPartnerInsightsApiQuery,
  useLazyGetTestimonialsApiQuery,
  useUpdateApponintmentStatusApiMutation,
} from '../../../redux/home-api-slice';
import GTRequestListView from '../../../components/GTRequestListView';
import GTImage from '../../../components/GTImage';
import socketServices from '../../../utils/socketService';
import moment from 'moment';
import {
  useBusyUserStatusApiMutation,
  useCreateCommentApiMutation,
  useOnlineStatusApiMutation,
} from '../../../redux/chat-api-slice';
import {compareTwoDate} from '../../../utils/customFunction';
import {useLazyGetPartnerDetailsApiQuery} from '../../../redux/auth-api-slice';
import GTCommentView from '../../../components/GTCommentView';
import Toast from 'react-native-toast-message';
import {
  RTCPeerConnection,
  RTCSessionDescription,
  mediaDevices,
  RTCIceCandidate,
} from 'react-native-webrtc';
import {onboardingData} from '../../../utils/demoData';
import GTStatusBar from '../../../components/GTStatusBar/GTStatusBar';
import GTHeaderComponent from '../../../components/GTHeaderComponent/GTHeaderComponent';

const Home = () => {
  const insets = useSafeAreaInsets();
  const homeData = [{}, {}, {}, {}, {}, {}, {}, {}];
  const [isViewAll, setIsViewAll] = useState(false);
  const [isRequestViewAll, setIsRequestViewAll] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  var date = new Date();
  const {isLive, userInfo, currentAppointmentData} = useSelector(
    (state: any) => state.appState,
  );
  const isFocus = useIsFocused();
  const flashListRef: any = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [appointmentIndex, setAppointmentIndex] = useState(0);
  const [getAllBlog, {data: blogData, isLoading: blogLoading}] =
    useLazyGetAllBlogApiQuery();
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, CONSTANTS.THEME.size.WIDTH - 64);
  const [isRequest, SetIsRequest] = useState(false);
  const [isCommentRequest, SetIsCommentRequest] = useState(false);
  const [chatIndex, SetChatIndex] = useState(0);
  const [
    getTestimonialsApi,
    {data: testimonialData, isLoading: testimonialsLoading},
  ] = useLazyGetTestimonialsApiQuery();
  const [updateApponintmentStatusApi] =
    useUpdateApponintmentStatusApiMutation();
  const [
    getAllAppointmentsRequestApi,
    {data: requestData, isLoading: requestLoading},
  ] = useLazyGetAllAppointmentsRequestApiQuery();
  const [
    getAllTypeAppointmentsApi,
    {data: todayAppointment, isLoading: toadyLoading},
  ] = useLazyGetAllTypeAppointmentsApiQuery();
  const [getBannerApi, {data: bannerListData, isLoading: bannerLoading}] =
    useLazyGetBannerApiQuery();
  const [onlineStatusApi] = useOnlineStatusApiMutation();
  const [refreshing, setRefreshing] = useState(false);
  const [newRequestData, setNewRequestData] = useState<any>({});
  const [
    getPartnerInsightsApi,
    {data: insightsData, isLoading: insightLoading},
  ] = useLazyGetPartnerInsightsApiQuery();
  const [getPartnerDetailsApi, {data: userData, isLoading: userLoading}] =
    useLazyGetPartnerDetailsApiQuery();
  const [comment, setComment] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [createCommentApi, {data: commentValue, isLoading: commentLoading}] =
    useCreateCommentApiMutation();
  const [busyUserStatusApi] = useBusyUserStatusApiMutation();
  const connectionRef: any = useRef(false);
  let candidateArr: any = useRef([]);
  const moveBackRef: any = useRef(null);
  const moveForwordRef: any = useRef(null);
  const monthRef: any = useRef(null);
  const dateTimeRef: any = useRef(null);

  useEffect(() => {
    if (isFocus) {
      setPrefsValue(CONSTANTS.STORAGE.SCREEN_NAME, 'Home');
      updateUserStatus(false);
    }
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
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        var scName = getPrefsValue(CONSTANTS.STORAGE.SCREEN_NAME);
        if (scName == 'Home' && !userInfo?.isOnline) {
          dispatch(setIsLive(true));
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const updateUserStatus = (params: any) => {
    busyUserStatusApi({status: params})
      .unwrap()
      .then(res => {
        console.log('res home', res?.data?.isBusy);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    socketServices.on('notification', (data: any) => {
      if (data?.body?.receiverId === userInfo._id) {
        if (data?.body?.senderId != userInfo._id) {
          if (data?.body?.notificationType == 'Create Appointment') {
            var scName = getPrefsValue(CONSTANTS.STORAGE.SCREEN_NAME);
            if (scName == 'Home') {
              getNewRequest();
              setNewRequestData(data?.body);
              SetIsRequest(true);
            }
            setPrefsValue('cureentValue', '');
            dispatch(setCurrentappointmentData(''));
          } else if (data?.body?.notificationType == 'cancleAppointment') {
            getNewRequest();
            SetIsRequest(false);
            setNewRequestData({});
          }
        }
      }
    });
    return () => socketServices.removeListener('notification');
  }, []);

  useEffect(() => {
    if (socketServices) {
      socketServices.on('appointmentId', async (data: any) => {
        // if (!connectionRef.current) {
        connectionRef.current = true;
        socketServices.emit('joinRoom', data.appointmentId.appointmentId);
        var currentData: any = getPrefsValue('cureentValue');
        var newData = currentAppointmentData?._id
          ? currentAppointmentData
          : currentData == null
          ? {}
          : currentData == undefined
          ? {}
          : currentData == ''
          ? {}
          : JSON.parse(currentData);
        if (newData?._id == data?.appointmentId?.appointmentId) {
          dispatch(setAppointmentId(data.appointmentId.appointmentId));
        }
        // }
      });

      socketServices.on('getCandidates', async (data: any) => {
        if (data) {
          const candidatesCopy = {...data.candidates};
          const newObj = {selected: false, ...candidatesCopy};
          candidateArr.current = [...candidateArr.current, newObj];
          dispatch(setCandidates(candidateArr.current));
        }
      });

      socketServices.on('callUser', async ({signal, from, userToCall}: any) => {
        if (userToCall == userInfo?._id) {
          dispatch(
            setclientCallingDetails({
              isReceivingCall: true,
              from,
              signal,
            }),
          );
          joinCallRoom('');
        }
      });
    }
  }, []);

  const joinCallRoom = (data: any) => {
    try {
      var currentData: any = getPrefsValue('cureentValue');
      var newData = currentAppointmentData?._id
        ? currentAppointmentData
        : currentData == null
        ? {}
        : currentData == undefined
        ? {}
        : currentData == ''
        ? {}
        : JSON.parse(currentData);
      if (newData?._id) {
        //@ts-ignore
        navigation.navigate(RouteNames.USER_CALL, {
          data: newData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPartnerInsightsData = () => {
    getPartnerInsightsApi('')
      .unwrap()
      .then(res => {})
      .catch(e => {
        console.log('error', e);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, [refreshing]);

  useEffect(() => {
    getBlogData();
    getNewRequest();
    getAllTypeAppointments('');
    getBannerData();
    getTestimonialData();
    getPartnerInsightsData();
  }, [refreshing]);

  const getTestimonialData = () => {
    getTestimonialsApi('')
      .unwrap()
      .then(res => {
        setRefreshing(false);
      })
      .catch(err => {
        setRefreshing(false);
        console.log('testimonals api error', JSON.stringify(err));
      });
  };

  const getBannerData = () => {
    getBannerApi('')
      .unwrap()
      .then((res: any) => {})
      .catch((err: any) => {
        console.log('banner error', err);
        setRefreshing(false);
      });
  };

  const updateOnlineStatus = (value: boolean) => {
    onlineStatusApi({status: value})
      .unwrap()
      .then(res => {
        getUserInfo('');
      })
      .catch(err => {
        console.log('online status error', err);
        if (err.originalStatus == 503) {
          Toast.show({
            type: 'error',
            text2: err?.responseMessage || err?.data || '',
          });
          setRefreshing(false);
        }
        setRefreshing(false);
      });
  };

  const getAllTypeAppointments = (data: any) => {
    getAllTypeAppointmentsApi('today')
      .unwrap()
      .then((res: any) => {
        if (data != '') {
          var appointmentDetail = Array.isArray(res?.data?.allAppointments)
            ? res?.data?.allAppointments?.filter((it: any) => it._id == data)
            : [];
          if (appointmentDetail[0]._id) {
            if (appointmentDetail[0]?.appointmentType == 'chat') {
              //@ts-ignore
              navigation.navigate(RouteNames.USER_CHAT, {
                data: appointmentDetail[0],
              });
            } else {
              // setPrefsValue(
              //   'cureentValue',
              //   JSON.stringify(appointmentDetail[0]),
              // );
              // dispatch(setCurrentappointmentData(appointmentDetail[0]));
            }
          }
        }
      })
      .catch(e => {
        console.log('appointment all Type error', e);
        if (e.originalStatus == 503) {
          Toast.show({
            type: 'error',
            text2: e?.responseMessage || e?.data || '',
          });
          setRefreshing(false);
        }
        if (e?.status == 403) {
          dispatch(setIsLive(false));
          monthRef.current = setTimeout(() => {
            logout();
          }, 500);
        }
        setRefreshing(false);
      });
  };

  const getNewRequest = () => {
    getAllAppointmentsRequestApi('')
      .unwrap()
      .then((res: any) => {})
      .catch((err: any) => {
        console.log('new Requester error', err);
        setRefreshing(false);
        if (err?.status == 403) {
          getUserInfo('');
        }
        if (err.originalStatus == 503) {
          Toast.show({
            type: 'error',
            text2: err?.responseMessage || err?.data || '',
          });
          setRefreshing(false);
        }
      });
  };

  const getUserInfo = (status: any) => {
    getPartnerDetailsApi(userInfo?._id || userInfo?.id || '')
      .unwrap()
      .then(result => {
        setPrefsValue(
          CONSTANTS.STORAGE.USER_DATA,
          JSON.stringify(result?.data),
        );
        dispatch(setUserInfo(result.data));
        dispatch(setToken(result?.data?.accessToken));
        setPrefsValue(CONSTANTS.STORAGE.TOKEN, result?.data?.accessToken || '');
        moveBackRef.current = setTimeout(() => {
          if (status != '') {
            updateAppointmentStatus(status);
          }
          getBlogData();
          getNewRequest();
          getAllTypeAppointments('');
          getBannerData();
          getTestimonialData();
          getPartnerInsightsData();
        });
      })
      .catch(err => {
        console.log('err', err);
        if (err.originalStatus == 503) {
          Toast.show({
            type: 'error',
            text2: err?.responseMessage || err?.data || '',
          });
          setRefreshing(false);
        }
      });
  };

  const getBlogData = () => {
    getAllBlog('')
      .unwrap()
      .then(res => {})
      .catch(err => {
        setRefreshing(false);
        console.log('blog error', JSON.stringify(err));
        if (err.originalStatus == 503) {
          Toast.show({
            type: 'error',
            text2: err?.responseMessage || err?.data || '',
          });
          setRefreshing(false);
        }
      });
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <GTLabel
          text={`No Data Found`}
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
        />
      </View>
    );
  };

  const renderImageItem = ({item, index}: any) => {
    return (
      <View style={styles.bannerMainContainer}>
        <GTImage uri={item.image} imageStyle={styles.bannerMainContainer} />
      </View>
    );
  };

  const filterTodaySessionData = useCallback(
    (data: any) => {
      //@ts-ignore
      var newData = todayAppointment?.data?.allAppointments?.filter(
        (item: any) =>
          compareTwoDate({
            startDate: item?.scheduledDateTime,
            endDate: new Date(),
          }) &&
          item.appointmentStatus == 'confirmed' &&
          !item?.isExpireAppointment &&
          item?.appointmentType == 'chat',
      );
      return newData || [];
    },
    [todayAppointment?.data?.allAppointments],
  );

  const renderTodaySchedule = ({item, index}: any) => {
    const newdate = moment(item.scheduledDateTime).format('hh:mm A');
    const dates = new Date(item.scheduledDateTime);
    var isToday =
      dates.getFullYear() == date.getFullYear() &&
      dates.getMonth() == date.getMonth() &&
      dates.getDate() == date.getDate();
    var isLeftTime = isToday
      ? dates.getHours() == date.getHours()
        ? dates.getMinutes() == date.getMinutes()
          ? `${60 - date.getSeconds()} Sec left to start`
          : dates.getMinutes() > date.getMinutes()
          ? `${dates.getMinutes() - date.getMinutes()} Min left to start`
          : dates.getMinutes() - date.getMinutes() < 5
          ? ` User are waitting `
          : ''
        : ''
      : '';

    var isJoin = isToday
      ? dates.getHours() == date.getHours()
        ? dates.getMinutes() == date.getMinutes()
          ? 60 - date.getSeconds()
          : 200
        : 200
      : 200;

    return (
      <GTTodaySchedule
        container={{
          marginTop: index == 0 ? CONSTANTS.THEME.size.WIDTH * 0.05 : 0,
        }}
        onPress={() => {
          //@ts-ignore
          navigation.navigate(RouteNames.USER_CHAT, {
            data: item,
          });
        }}
        isJoinMeeting={isJoin > -1 && isJoin < 30}
        name={`${item?.scheduledWithPartner_firstName} ${
          item?.scheduledWithPartner_lastName || ''
        }`}
        title={item.title || ''}
        isWaitting={isLeftTime != '' ? isJoin < 30 : false}
        time={
          isToday
            ? isLeftTime != ''
              ? isLeftTime
              : `${newdate}`
            : `${newdate}`
        }
        price={
          item?.appointmentType == 'chat'
            ? userInfo?.wageForChat || 10
            : userInfo?.wageForCall || 10
        }
        userImage={item.scheduledWithPartner_profilePicture || ''}
      />
    );
  };

  const renderBennerView = () => {
    var bannerData = bannerListData?.data || [];
    if (Array.isArray(bannerData) && bannerData.length > 0) {
      return (
        <View style={styles.bannerView}>
          <GTFlatlist
            scrollX={scrollX}
            flatListref={flashListRef}
            setCurrentIndex={setCurrentIndex}
            data={bannerListData?.data || []}
            renderItem={renderImageItem}
          />
          <View style={styles.pageContainer}>
            <PagingDotContainer
              elements={bannerListData?.data || []}
              position={position}
              dotColor={CONSTANTS.THEME.colors.PRIMARY_COLOR}
            />
          </View>
        </View>
      );
    } else {
      <View />;
    }
  };

  const ListFooterTodayScheduleComponent = () => {
    return (
      <GTButtonContainer
        customStyle={styles.viewAllStyle}
        onHandlePress={() => {}}>
        <GTLabel
          text={'View All'}
          color={CONSTANTS.THEME.colors.PRIMARY_COLOR}
        />
        <BLUE_RIGHT_ARROW
          width={CONSTANTS.THEME.size.s14}
          height={CONSTANTS.THEME.size.s14}
        />
      </GTButtonContainer>
    );
  };

  const renderTestimonialItem = ({item, index}: any) => {
    if (!isViewAll) {
      if (index < 4) {
        return (
          <View>
            {index != 0 && renderLineView()}
            <GTReviewList key={index.toString()} index={index} item={item} />
          </View>
        );
      }
    } else {
      return (
        <View>
          {index != 0 && renderLineView()}
          <GTReviewList key={index.toString()} index={index} item={item} />
        </View>
      );
    }
  };

  const renderRequestItem = ({item, index}: any) => {
    if (isRequestViewAll) {
      return (
        <View>
          {index != 0 && renderLineView()}
          <GTRequestListView
            onHandlePress={() => {
              setAppointmentIndex(index);
              updateAppointmentStatus('confirmed');
            }}
            onHandleRejectPress={() => {
              setAppointmentIndex(index);
              updateAppointmentStatus('cancelled');
            }}
            name={`${item?.scheduledBy_firstName || ''} ${
              item?.scheduledBy_lasttName || ''
            }`}
            type={item?.appointmentType}
          />
        </View>
      );
    } else if (index < 5) {
      return (
        <View>
          {index != 0 && renderLineView()}
          <GTRequestListView
            onHandlePress={() => {
              setAppointmentIndex(index);
              updateAppointmentStatus('confirmed');
            }}
            onHandleRejectPress={() => {
              setAppointmentIndex(index);
              updateAppointmentStatus('cancelled');
            }}
            name={`${item?.scheduledBy_firstName || ''} ${
              item?.scheduledBy_lasttName || ''
            }`}
            type={item?.appointmentType}
          />
        </View>
      );
    }
  };

  const ListFooterTestimonialComponent = () => {
    var ratingData = testimonialData?.data || [];
    if (ratingData?.length > 4) {
      return (
        <GTButtonContainer
          customStyle={styles.viewAllStyle}
          onHandlePress={() => {
            setIsViewAll(!isViewAll);
          }}>
          <GTLabel
            text={isViewAll ? 'View Less' : 'View All'}
            color={CONSTANTS.THEME.colors.PRIMARY_COLOR}
          />
          <BLUE_RIGHT_ARROW
            width={CONSTANTS.THEME.size.s14}
            height={CONSTANTS.THEME.size.s14}
          />
        </GTButtonContainer>
      );
    } else {
      return <View style={{height: 20}} />;
    }
  };

  const renderAppointmentItem = ({item, index}: any) => {
    const dates = new Date(item.scheduledDateTime);
    var isToday =
      dates.getFullYear() == date.getFullYear() &&
      dates.getMonth() == date.getMonth() &&
      dates.getDate() == date.getDate();
    var isLeftTime = isToday
      ? dates.getHours() == date.getHours()
        ? dates.getMinutes() == date.getMinutes()
          ? `${60 - date.getSeconds()} Sec age`
          : dates.getMinutes() > date.getMinutes()
          ? `${dates.getMinutes() - date.getMinutes()} Min left to start`
          : dates.getMinutes() - date.getMinutes() < 5
          ? ` User are waitting `
          : ''
        : ''
      : '';
    return (
      <View>
        {index != 0 && renderLineView()}
        <GTTodaySessionList
          isChat={item?.appointmentType == 'chat'}
          isMessage={item.isMessage}
          message={isLeftTime}
          duration={item.duration}
          name={`${item.scheduledBy_firstName || ''}${
            item?.scheduledBy_lasttName ? ' ' + item?.scheduledBy_lasttName : ''
          }`}
          commentPress={() => {
            SetIsCommentRequest(true);
            SetChatIndex(index);
          }}
          onChatCallPress={() => {
            if (item?.appointmentType == 'chat') {
              //@ts-ignore
              navigation.navigate(RouteNames.USER_CHAT, {
                data: item,
              });
            } else {
              //@ts-ignore
              navigation.navigate(RouteNames.USER_CALL, {
                data: item,
              });
            }
          }}
        />
      </View>
    );
  };

  const ListRequestFooterComponent = () => {
    if (
      requestData?.data?.allAppointments == undefined ||
      requestData?.data?.allAppointments?.length < 5
    ) {
      return <View />;
    } else {
      return (
        <View>
          <GTButtonContainer
            customStyle={styles.viewAllStyle}
            onHandlePress={() => {
              setIsRequestViewAll(!isRequestViewAll);
            }}>
            <GTLabel
              text={isRequestViewAll ? 'View Less' : 'View All'}
              color={CONSTANTS.THEME.colors.PRIMARY_COLOR}
            />
            <BLUE_RIGHT_ARROW
              width={CONSTANTS.THEME.size.s14}
              height={CONSTANTS.THEME.size.s14}
            />
          </GTButtonContainer>
        </View>
      );
    }
  };

  const renderItem = ({item, index}: any) => {
    if (index == 0) {
      return <View>{renderBennerView()}</View>;
    } else if (index == 1) {
      var newReq = requestData?.data?.allAppointments || [];
      if (Array.isArray(newReq) && newReq?.length > 0) {
        return (
          <View style={styles.requestContainerStyle}>
            <GTLabel
              text={'NEW REQUEST'}
              fontSize={CONSTANTS.THEME.size.s12}
              fontWeight="900"
              customStyle={styles.textStyle}
              color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            />

            <FlatList
              //@ts-ignore
              data={requestData?.data?.allAppointments || []}
              //@ts-ignore
              renderItem={renderRequestItem}
              keyExtractor={(item, index) => (index + 1).toString()}
              ListFooterComponent={ListRequestFooterComponent}
              ListEmptyComponent={ListEmptyComponent}
            />
          </View>
        );
      } else {
        return <View />;
      }
    } else if (index == 2) {
      return (
        <View style={styles.requestContainerStyle}>
          <GTLabel
            text={'Today’s Insights'}
            fontSize={CONSTANTS.THEME.size.s12}
            fontWeight="900"
            customStyle={{...styles.textStyle, textTransform: 'uppercase'}}
            color={CONSTANTS.THEME.colors.Dark_Gunmetal}
          />

          <View style={styles.detailContainer}>
            <View style={styles.chat_container}>
              <Chat_Icon />
              <GTLabel
                text={`${insightsData?.data?.totalChatSession || 0} mins`}
                fontSize={CONSTANTS.THEME.size.s16}
                fontWeight="700"
                customStyle={styles.textStyle}
                color={CONSTANTS.THEME.colors.Dark_Gunmetal}
              />
              <GTLabel
                text={'Chat'}
                fontSize={CONSTANTS.THEME.size.s12}
                fontWeight="400"
                color={CONSTANTS.THEME.colors.Dark_Gunmetal}
                customStyle={{lineHeight: CONSTANTS.THEME.size.s18}}
              />
            </View>
            <View style={styles.mic_Container}>
              <Mic_Icon />
              <GTLabel
                text={`${insightsData?.data?.totalCallSession || 0} mins`}
                fontSize={CONSTANTS.THEME.size.s16}
                fontWeight="700"
                customStyle={styles.textStyle}
                color={CONSTANTS.THEME.colors.Dark_Gunmetal}
              />
              <GTLabel
                text={'Audio'}
                fontSize={CONSTANTS.THEME.size.s12}
                fontWeight="400"
                color={CONSTANTS.THEME.colors.Dark_Gunmetal}
                customStyle={{lineHeight: CONSTANTS.THEME.size.s18}}
              />
            </View>
            <View style={styles.earning_container}>
              <Earning_Icon />
              <GTLabel
                text={`₹${insightsData?.data?.totalChatSession || 0}`}
                fontSize={CONSTANTS.THEME.size.s16}
                fontWeight="700"
                customStyle={styles.textStyle}
                color={CONSTANTS.THEME.colors.Dark_Gunmetal}
              />
              <GTLabel
                text={'Earning'}
                fontSize={CONSTANTS.THEME.size.s12}
                fontWeight="400"
                color={CONSTANTS.THEME.colors.Dark_Gunmetal}
                customStyle={{lineHeight: CONSTANTS.THEME.size.s18}}
              />
            </View>
          </View>
        </View>
      );
    } else if (index == 3) {
      var todayData =
        filterTodaySessionData(todayAppointment?.data?.allAppointments) || [];
      if (Array.isArray(todayData) && todayData?.length) {
        return (
          <View style={styles.requestContainerStyle}>
            <GTLabel
              text={CONSTANTS.TEXT.TODAY_SCHEDULE}
              fontSize={CONSTANTS.THEME.size.s12}
              fontWeight="900"
              customStyle={{...styles.textStyle, textTransform: 'uppercase'}}
              color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            />
            <FlatList
              data={todayData}
              //@ts-ignore
              renderItem={renderTodaySchedule}
              keyExtractor={(item, index) => (index + 1).toString()}
              ListEmptyComponent={ListEmptyComponent}
            />
          </View>
        );
      } else {
        return <View />;
      }
    } else if (index == 4) {
      var testimonialInfo = testimonialData?.data || [];
      if (Array.isArray(testimonialInfo) && testimonialInfo?.length > 0) {
        return (
          <View style={styles.requestContainerStyle}>
            <GTLabel
              text={CONSTANTS.TEXT.RECENT_TESTIMONIALS}
              fontSize={CONSTANTS.THEME.size.s12}
              fontWeight="900"
              customStyle={{...styles.textStyle, textTransform: 'uppercase'}}
              color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            />
            <FlatList
              data={testimonialData?.data || []}
              //@ts-ignore
              renderItem={renderTestimonialItem}
              keyExtractor={(item, index) => (index + 1).toString()}
              ListFooterComponent={ListFooterTestimonialComponent}
              ListEmptyComponent={ListEmptyComponent}
            />
          </View>
        );
      } else {
        return <View />;
      }
    } else if (index == 5) {
      var todayApp =
        filterTodaySessionData(todayAppointment?.data?.allAppointments) || [];

      if (Array.isArray(todayApp) && todayApp.length > 0) {
        return (
          <View style={styles.requestContainerStyle}>
            <GTLabel
              text={CONSTANTS.TEXT.TODAY_SESSIONS}
              fontSize={CONSTANTS.THEME.size.s12}
              fontWeight="900"
              customStyle={{...styles.textStyle, textTransform: 'uppercase'}}
              color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            />

            <FlatList
              data={todayApp}
              //@ts-ignore
              renderItem={renderAppointmentItem}
              keyExtractor={(item, index) => (index + 1).toString()}
              ListEmptyComponent={ListEmptyComponent}
            />
          </View>
        );
      } else {
        return <View />;
      }
    } else if (index == 6) {
      if (Array.isArray(blogData?.data) && blogData?.data.length != 0) {
        return (
          <View style={styles.blogContainer}>
            <GTLabel
              text={CONSTANTS.TEXT.BLAG}
              color={CONSTANTS.THEME.colors.Dark_Gunmetal}
              fontWeight="900"
              fontSize={CONSTANTS.THEME.size.s12}
              customStyle={{marginLeft: '5%', marginBottom: '5%'}}
            />
            <GTCarousalFlatList data={blogData?.data || []} isBlog={true} />
          </View>
        );
      } else {
        return <View />;
      }
    } else if (index == 7) {
      return (
        <View style={styles.blogContainer}>
          <GTLabel
            text={CONSTANTS.TEXT.WHAT_OUR_CLIENTS}
            color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            fontWeight="900"
            fontSize={CONSTANTS.THEME.size.s12}
            customStyle={{marginLeft: '5%', marginBottom: '5%'}}
          />
          <GTCarousalFlatList data={onboardingData} isBlog={false} />
        </View>
      );
    }
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

  const logout = () => {
    dispatch(setIsLogin(false));
    dispatch(setUserInfo({}));
    dispatch(setToken(''));
    setPrefsValue(CONSTANTS.STORAGE.ISLOGGED, 'false');
    setPrefsValue(CONSTANTS.STORAGE.USER_DATA, '');
    setPrefsValue(CONSTANTS.STORAGE.TOKEN, '');
  };

  const ListFooterComponent = () => {
    return <View style={styles.emptyStyle} />;
  };

  const noButtonPress = () => {
    dispatch(setIsLive(false));
  };
  const yesButtonPress = () => {
    dispatch(setIsLive(false));
    // dispatch(setUserStatus('Online'));
  };

  const updateAppointmentStatus = (status: string) => {
    if (requestData?.data?.allAppointments) {
      var params = {
        id: requestData?.data?.allAppointments
          ? requestData?.data?.allAppointments[appointmentIndex]?._id
          : '',
        status: status,
      };
      updateApponintmentStatusApi(params)
        .unwrap()
        .then(res => {
          getNewRequest();
          setPrefsValue('cureentValue', '');
          getAllTypeAppointments(
            status == 'confirmed'
              ? requestData?.data?.allAppointments
                ? requestData?.data?.allAppointments[appointmentIndex]._id
                : ''
              : '',
          );
          if (status == 'confirmed') {
            console.log(
              'appointmentDetail111',
              requestData?.data?.allAppointments
                ? requestData?.data?.allAppointments[appointmentIndex]
                : '',
            );
            setPrefsValue(
              'cureentValue',
              JSON.stringify(
                requestData?.data?.allAppointments
                  ? requestData?.data?.allAppointments[appointmentIndex]
                  : '',
              ),
            );
            dispatch(
              setCurrentappointmentData(
                requestData?.data?.allAppointments
                  ? requestData?.data?.allAppointments[appointmentIndex]
                  : '',
              ),
            );
          }
        })
        .catch(error => {
          console.log('appointment status err', error);
          if (error?.status == 403) {
            getUserInfo(status);
          }
          if (error.originalStatus == 503) {
            Toast.show({
              type: 'error',
              text2: error?.responseMessage || error?.data || '',
            });
          }
        });
    }
  };

  const updatePopAppointmentStatus = (status: string) => {
    if (newRequestData?.appointmentId) {
      var params = {
        id: newRequestData?.appointmentId,
        status: status,
      };
      updateApponintmentStatusApi(params)
        .unwrap()
        .then(res => {
          getNewRequest();
          getAllTypeAppointments(
            status == 'confirmed'
              ? newRequestData?.appointmentId
                ? newRequestData?.appointmentId
                : newRequestData?.appointmentDetail
              : '',
          );

          if (status == 'confirmed') {
            setPrefsValue(
              'cureentValue',
              JSON.stringify(
                newRequestData?.appointmentDetail || newRequestData,
              ),
            );
            dispatch(
              setCurrentappointmentData(
                newRequestData?.appointmentDetail || newRequestData,
              ),
            );
          }
        })
        .catch(error => {
          console.log('appointment status err11', error);
          if (error.originalStatus == 503) {
            Toast.show({
              type: 'error',
              text2: error?.responseMessage || error?.data || '',
            });
          }
        });
    }
  };

  const createComment = () => {
    var appointmentData: any = todayAppointment?.data?.allAppointments;
    var params = {
      appointmentId: appointmentData[chatIndex]._id,
      comment: comment,
      commentFor: userInfo?._id || userInfo?.id,
    };
    createCommentApi(params)
      .unwrap()
      .then((res: any) => {
        SetIsCommentRequest(false);
        SetChatIndex(2000);
        setComment('');
        moveForwordRef.current = setTimeout(() => {
          Toast.show({
            type: 'success',
            text2: 'comment send successfully',
          });
        }, 200);
      })
      .catch((err: any) => {
        console.log('error create comment', err);
        SetIsCommentRequest(false);
        SetChatIndex(2000);
        dateTimeRef.current = setTimeout(() => {
          Toast.show({
            type: 'error',
            text2: err?.responseMessage || '',
          });
        }, 200);
      });
  };

  return (
    <View style={styles.container}>
      <GTStatusBar insets={insets} />
      <GTHeaderComponent
        customStyle={styles.headerContainer}
        onHandleRightPress={() => {
          dispatch(setIsLive(true));
        }}
        onHandleLeftPress={() => {
          //@ts-ignore
          navigation.navigate(RouteNames.SETTING_STACK);
        }}
        userInfo={userInfo}
      />

      <FlatList
        data={homeData}
        //@ts-ignore
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
        keyExtractor={(item, index) => (index + 1).toString()}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={CONSTANTS.THEME.colors.PRIMARY_COLOR}
            onRefresh={onRefresh}
          />
        }
      />
      <GTModal visible={isLive}>
        <GTOnline
          isLogin={true}
          isLive={userInfo?.isOnline}
          onClosePress={() => {
            noButtonPress();
          }}
          noButtonPress={() => {
            noButtonPress();
            // updateOnlineStatus(false);
          }}
          yesButtonPress={() => {
            yesButtonPress();
            updateOnlineStatus(!userInfo?.isOnline);
          }}
        />
      </GTModal>
      <GTModal container={{justifyContent: 'flex-end'}} visible={isRequest}>
        <GTRequestView
          onHandlePress={() => {
            updatePopAppointmentStatus('confirmed');
            SetIsRequest(false);
          }}
          onHandleRejectPress={() => {
            updatePopAppointmentStatus('cancelled');
            SetIsRequest(false);
          }}
          onClosePress={() => {
            getNewRequest();
            SetIsRequest(false);
          }}
          data={newRequestData}
          name={newRequestData?.senderInfo?.firstName || ''}
          type={newRequestData?.appointmentDetail?.appointmentType}
        />
      </GTModal>

      <GTModal visible={isCommentRequest}>
        <GTCommentView
          onHandlePress={() => createComment()}
          comment={comment}
          setComment={setComment}
          onClosePress={() => {
            SetIsCommentRequest(false);
            SetChatIndex(0);
            setComment('');
          }}
          isLoading={commentLoading}
          isKeyboard={keyboardStatus}
        />
      </GTModal>
    </View>
  );
};

export default Home;
