import {View, Platform, StatusBar, FlatList, BackHandler} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useLazyGetUpcomingAppointmentsApiQuery} from '../../redux/home-api-slice';
import GTIndicator from '../../components/GTIndicator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import GTLinearGradientView from '../../components/GTLinearGradientView';
import CONSTANTS from '../../utils/constants';
import GTHeader from '../../components/GTHeader';
import {Menu_Icon, Left_Back_icon, Right_Back_Icon} from '../../assets';
import styles from './styles';
import moment from 'moment';
import GTButtonContainer from '../../components/GTButtonContainer';
import GTLabel from '../../components/GTLabel';
import {getDaysArray} from '../../utils/customFunction';
import GTDateView from '../../components/GTDateView';
import GTTodaySchedule from '../../components/GTTodaySchedule';
import {RouteNames} from '../../utils/routesName';
import {useDispatch, useSelector} from 'react-redux';
import {setScreenName} from '../../redux/app-api-slice';
import {setPrefsValue} from '../../utils/storage';

const Appointment = () => {
  var date = new Date();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(5);
  const flatlistRef: any = useRef();
  const dateflatlistRef: any = useRef();
  const [getUpcomingAppointmentsApi, {data, isLoading}] =
    useLazyGetUpcomingAppointmentsApiQuery();
  const [selectDay, setSelectDay] = useState(0);
  const [selectMonth, setSelectMonth] = useState(6);
  const [selectYear, setSelectYear] = useState(2024);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectDayArray, setSelectDayArray] = useState([]);
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const {screenName} = useSelector((state: any) => state.appState);
  const moveBackRef: any = useRef(null);
  const moveForwordRef: any = useRef(null);
  const monthRef: any = useRef(null);
  const dateTimeRef: any = useRef(null);
  const onScrollRef: any = useRef(null);
  const timerRef: any = useRef(null);

  useEffect(() => {
    setSelectDay(date.getDate());
    setSelectYear(date.getFullYear());
    setSelectMonth(date.getMonth());
    setSelectedYear(date.getFullYear());
    setCurrentMonthIndex(date.getMonth());
    getAppintmentList();
    getDayData({year: date.getFullYear(), month: date.getMonth()});
  }, [isFocus]);

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
      if (onScrollRef.current) {
        clearTimeout(onScrollRef.current);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    updateScreenStatus();
  }, [isFocus]);

  const updateScreenStatus = () => {
    setPrefsValue(CONSTANTS.STORAGE.SCREEN_NAME, 'Appointment');
  };

  const getDayData = async ({year, month}: any) => {
    var dateArray: any = await getDaysArray(year, month + 1);
    setSelectDayArray(dateArray || []);
  };

  const getAppintmentList = () => {
    getUpcomingAppointmentsApi('')
      .unwrap()
      .then(res => {
        console.log('res>>', res);
      })
      .catch(e => console.log('error', JSON.stringify(e)));
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
          text={'Appointment'}
          leftIcon={
            <Menu_Icon
              width={CONSTANTS.THEME.size.s28}
              height={CONSTANTS.THEME.size.s28}
            />
          }
          customStyle={styles.headerContainer}
          onHandleLeftPress={() => {
            //@ts-ignore
            navigation.navigate(RouteNames.SETTING_STACK);
          }}
        />
      </>
    );
  };

  useEffect(() => {
    getDayData({
      year: selectYear || date.getFullYear(),
      month: currentMonthIndex,
    });
    // scroll to current month
    if (flatlistRef?.current) {
      flatlistRef?.current?.scrollToIndex({
        index: currentMonthIndex,
        animated: true,
      });
      if (
        dateflatlistRef.current &&
        currentMonthIndex == date.getMonth() &&
        selectDayArray.length != 0
      ) {
        dateflatlistRef?.current?.scrollToIndex({
          index: date.getDate() - 1,
          animated: true,
        });
      }
    }
  }, [currentMonthIndex, isFocus]);

  useEffect(() => {
    // scroll to current month
    if (
      dateflatlistRef.current &&
      currentMonthIndex == date.getMonth() &&
      selectDayArray.length != 0
    ) {
      dateflatlistRef?.current?.scrollToIndex({
        index: date.getDate() - 1,
        animated: true,
      });
    }
  }, [selectDayArray, isFocus]);

  const moveToBack = () => {
    var moveToBackIndex = currentMonthIndex - 1;
    if (moveToBackIndex < 12 && moveToBackIndex >= 0) {
      setCurrentMonthIndex(moveToBackIndex);
      moveBackRef.current = setTimeout(() => {
        flatlistRef?.current?.scrollToIndex({
          index: moveToBackIndex,
          animated: true,
        });
      }, 200);
    } else {
      setCurrentMonthIndex(11);
      setSelectYear(pre => pre - 1);
      monthRef.current = setTimeout(() => {
        flatlistRef?.current?.scrollToIndex({
          index: 11,
          animated: true,
        });
      }, 200);
    }
  };

  const moveToForward = () => {
    var moveToForwardIndex = currentMonthIndex + 1;
    if (moveToForwardIndex < 12 && moveToForwardIndex >= 0) {
      setCurrentMonthIndex(moveToForwardIndex);
      moveForwordRef.current = setTimeout(() => {
        flatlistRef?.current?.scrollToIndex({
          index: moveToForwardIndex,
          animated: true,
        });
      }, 200);
    } else {
      setCurrentMonthIndex(0);
      setSelectYear(pre => pre + 1);
      dateTimeRef.current = setTimeout(() => {
        flatlistRef?.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      }, 200);
    }
  };

  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.monthView}>
        <GTLabel
          text={`${item} ${selectYear}`}
          fontSize={CONSTANTS.THEME.size.s18}
          fontWeight="700"
          color={CONSTANTS.THEME.colors.Dark_Gunmetal}
        />
      </View>
    );
  };

  const renderDayItem = ({item, index}: any) => {
    const isSelected =
      selectYear == selectedYear &&
      currentMonthIndex == selectMonth &&
      item.date == selectDay;
    const isDisabled =
      selectYear == date.getFullYear() &&
      currentMonthIndex == date.getMonth() &&
      item.date < date.getDate();
    return (
      <GTDateView
        onDatePress={() => {
          setSelectDay(Number(item.date));
          setSelectMonth(currentMonthIndex);
          setSelectedYear(selectYear);
        }}
        disabled={isDisabled}
        date={item.date}
        dateName={item.name}
        dateNameStyle={{
          color: isDisabled
            ? CONSTANTS.THEME.colors.DARK_GRAY
            : CONSTANTS.THEME.colors.Dark_Gunmetal,
        }}
        dateStyle={{
          color: isDisabled
            ? CONSTANTS.THEME.colors.DARK_GRAY
            : CONSTANTS.THEME.colors.Dark_Gunmetal,
        }}
        buttonStyle={{
          ...styles.dateView,
          borderColor: isSelected
            ? CONSTANTS.THEME.colors.PRIMARY_COLOR
            : CONSTANTS.THEME.colors.NEUTRAL[300],
          backgroundColor: isSelected
            ? '#F0F5FF'
            : CONSTANTS.THEME.colors.TRANSPARENT,
        }}
      />
    );
  };
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
        isJoinMeeting={isJoin > -1 || isJoin < 30}
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
        price={18}
        userImage={item.scheduledWithPartner_profilePicture || ''}
        onPress={() => {
          //@ts-ignore
          navigation.navigate(RouteNames.USER_CHAT, {
            data: item,
          });
        }}
      />
    );
  };

  const filterNewArray = useCallback(() => {
    let newArray =
      //@ts-ignore
      data?.data?.filter((item: any) => {
        const newdate = new Date(item.scheduledDateTime);
        if (
          newdate.getFullYear() == selectYear &&
          newdate.getMonth() == currentMonthIndex &&
          newdate.getDate() == (selectDay != 0 ? selectDay : date.getDate())
        ) {
          return item;
        }
      }) || [];
    return newArray;
  }, [selectYear, currentMonthIndex, selectDay]);

  const renderHeader = () => {
    return (
      <View style={styles.container}>
        <View style={styles.monthContainer}>
          <GTButtonContainer
            onHandlePress={moveToBack}
            disabled={
              date.getFullYear() == selectYear &&
              date.getMonth() == currentMonthIndex
            }
            customStyle={styles.moveButton}>
            <Left_Back_icon width={18} height={18} />
          </GTButtonContainer>
          <View style={{width: CONSTANTS.THEME.size.WIDTH * 0.6}}>
            <FlatList
              ref={flatlistRef}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={months}
              onScrollToIndexFailed={error => {
                onScrollRef.cureent = setTimeout(() => {
                  if (months.length !== 0 && flatlistRef !== null) {
                    flatlistRef?.current?.scrollToIndex({
                      index: error.index,
                      animated: true,
                    });
                  }
                }, 100);
              }}
              keyExtractor={(item, index) => (index + 1).toString()}
              renderItem={renderItem}
              ListEmptyComponent={ListEmptyComponent}
            />
          </View>
          <GTButtonContainer
            onHandlePress={moveToForward}
            customStyle={styles.moveButton}>
            <Right_Back_Icon width={18} height={18} />
          </GTButtonContainer>
        </View>
        <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
          <FlatList
            data={selectDayArray}
            ref={dateflatlistRef}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={renderDayItem}
            keyExtractor={(item, index) => (index + 1).toString()}
            onScrollToIndexFailed={error => {
              timerRef.current = setTimeout(() => {
                if (selectDayArray.length !== 0 && dateflatlistRef !== null) {
                  dateflatlistRef?.current?.scrollToIndex({
                    index: error.index,
                    animated: true,
                  });
                }
              }, 100);
            }}
            ListEmptyComponent={ListEmptyComponent}
          />
        </View>
      </View>
    );
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

  return (
    <View>
      {hearderContainerView()}
      {renderHeader()}
      <View style={styles.subContainer}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={filterNewArray()}
          //@ts-ignore
          renderItem={renderTodaySchedule}
          keyExtractor={(item, index) => (index + 1).toString()}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>

      {isLoading && <GTIndicator />}
    </View>
  );
};

export default Appointment;
