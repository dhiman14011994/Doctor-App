import moment from 'moment';
import {PermissionsAndroid, Platform} from 'react-native';
import CONSTANTS from './constants';
import DeviceInfo from 'react-native-device-info';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export const getDateTime = date1 => {
  var msDiff = new Date();
  var PastYear = moment(date1).format('yyyy');
  var PastMonth = moment(date1).format('MM');
  var PastDate = moment(date1).format('DD');
  var PastHours = moment(date1).format('HH');
  var PastMinutes = moment(date1).format('mm');
  var PastSeconds = moment(date1).format('ss');

  var currentYear = msDiff.getFullYear();
  var currentmonth = msDiff.getMonth() + 1;
  var currentday = msDiff.getDate();
  var currentHours = msDiff.getHours();
  var currentMinutes = msDiff.getMinutes();
  var currentSeconds = msDiff.getSeconds();
  var defYear = currentYear - PastYear;
  var defMonth = currentmonth - PastMonth;
  var defDay = currentday - PastDate;
  var defHour = currentHours - PastHours;
  var defMinutes = currentMinutes - PastMinutes;
  var defSecond = currentSeconds - PastSeconds;
  if (defYear > 0) {
    var deffMonth =
      PastMonth > currentmonth
        ? Number(PastMonth) + Number(currentmonth) - 12
        : 0;
    if (deffMonth > 0) {
      var deffDate =
        PastDate > currentday ? 31 - Number(PastDate) + Number(currentday) : 0;
      if (deffDate > 0) {
        let year =
          deffMonth == 1 ? deffDate + ' D' : Number(deffMonth - 1) + ' M';
        return year;
      }
      let year = deffMonth + ' M';
      return year;
    } else {
      let year = defYear + ' Y';
      return year;
    }
  } else if (Number(defMonth) > 0) {
    var deM =
      PastMonth == 4 || PastMonth == 6 || PastMonth == 9 || PastMonth == 11;
    var defMDate =
      PastDate > currentday
        ? (PastMonth == 2 ? 28 : deM ? 30 : 31) -
          Number(PastDate) +
          Number(currentday)
        : 0;
    var lasrMonthLastDate = PastMonth == 2 ? 28 : deM ? 30 : 31;
    let year =
      defMonth < 2
        ? defMDate < 7
          ? defMDate == 0
            ? defMonth > 0
              ? defMonth + ' M'
              : defMonth + ' M'
            : defMDate + ' D'
          : defMDate < 14
          ? '1 W'
          : defMDate < 21
          ? '2 W'
          : lasrMonthLastDate < defMDate
          ? defMonth + ' M'
          : '3 W'
        : defMonth + ' M';
    return year;
  } else if (Number(defDay) > 0) {
    let checkHour =
      PastHours > currentHours
        ? 24 - Number(PastHours) + Number(currentHours)
        : 0;
    let newDefDay = Number(defDay) - 1;
    let year =
      checkHour > 0
        ? defDay < 2
          ? checkHour + ' hr'
          : newDefDay < 7
          ? newDefDay + ' D'
          : newDefDay < 14
          ? '1 W'
          : newDefDay < 21
          ? '2 W'
          : '3 W'
        : defDay < 7
        ? defDay + ' D'
        : defDay < 14
        ? '1 W'
        : defDay < 21
        ? '2 W'
        : '3 W';
    return year;
  } else if (Number(defHour) > 0) {
    let checkMinutes =
      PastMinutes > currentMinutes
        ? 60 - Number(PastMinutes) + Number(currentMinutes)
        : 0;
    let year =
      checkMinutes > 0
        ? defHour < 2
          ? checkMinutes + ' min ago'
          : Number(defHour) - 1 + ' hr'
        : defHour + ' hr';
    return year;
  } else if (Number(defMinutes) > 0) {
    let checkSec =
      PastSeconds > currentSeconds
        ? 60 - Number(PastSeconds) + Number(currentSeconds)
        : 0;
    let year =
      checkSec > 0
        ? defMinutes < 2
          ? checkSec + ' sec ago'
          : Number(defMinutes) - 1 + ' min ago'
        : defMinutes + ' min ago';
    return year;
  } else {
    let year = defSecond + ' sec ago';
    return year;
  }
};

export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        //@ts-ignore
        {
          title: CONSTANTS.TEXT.CAMERA_PERMISSION,
          message: CONSTANTS.TEXT.PERMISSION_MESSAGE,
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true;
  }
};

export const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      let systemVersion = DeviceInfo.getSystemVersion();
      const granted = await request(
        systemVersion > 12
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
    }
    return false;
  } else {
    return true;
  }
};

export const requestRecordingPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
    }
    return false;
  } else {
    return true;
  }
};
export const compareTwoDate = ({startDate, endDate}) => {
  var PastYear = moment(startDate).format('yyyy');
  var PastMonth = moment(startDate).format('MM');
  var PastDate = moment(startDate).format('DD');

  var endYear = moment(endDate).format('yyyy');
  var endmonth = moment(endDate).format('MM');
  var endday = moment(endDate).format('DD');
  var defYear = endYear - PastYear;
  var defMonth = endmonth - PastMonth;
  var defDay = endday - PastDate;

  if (defYear == 0) {
    if (Number(defMonth) == 0) {
      if (Number(defDay) == 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const compareTodayDate = date1 => {
  var msDiff = new Date();
  var PastYear = moment(date1).format('yyyy');
  var PastMonth = moment(date1).format('MM');
  var PastDate = moment(date1).format('DD');

  var currentYear = msDiff.getFullYear();
  var currentmonth = msDiff.getMonth() + 1;
  var currentday = msDiff.getDate();

  var defYear = currentYear - PastYear;
  var defMonth = currentmonth - PastMonth;
  var defDay = currentday - PastDate;

  if (defYear == 0) {
    if (defMonth == 0) {
      if (defDay == 0) {
        return 'Today';
      } else if (defDay == 1) {
        return 'Yesterday';
      } else {
        return moment(date1).format('YYYY-MM-DD');
      }
    } else {
      var deDay =
        PastMonth == 2
          ? PastDate > 27
            ? true
            : false
          : PastMonth == 4 ||
            PastMonth == 6 ||
            PastMonth == 9 ||
            PastMonth == 11
          ? PastDate == 30
            ? true
            : false
          : PastDate == 31;
      if (deDay && currentday == 1) {
        return 'Yesterday';
      } else {
        return moment(date1).format('YYYY-MM-DD');
      }
    }
  } else {
    if (currentday == 1 && PastMonth == 12 && PastDate == 31) {
      return 'Yesterday';
    } else {
      return moment(date1).format('YYYY-MM-DD');
    }
  }
};

export const getDaysArray = (year, month) => {
  --month; //change it to 0-based, as Date object
  let dayname = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let date = new Date(year, month);
  let result = [];
  while (date.getMonth() == month) {
    result.push({date: `${date.getDate()}`, name: `${dayname[date.getDay()]}`});
    date.setDate(date.getDate() + 1);
  }
  return result;

  //   return daysArray;
};

export const requestMicrophone = async () => {
  //replace your function with this code.
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Permissions for record audio',
          message: 'Give permission to your device to record audio',
          buttonPositive: 'ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permission granted');
      } else {
        console.log('permission denied');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
};

export const requestMultiplePermission = async () => {
  //replace your function with this code.
  if (Platform.OS === 'android') {
    try {
      let systemVersion = DeviceInfo.getSystemVersion();
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        systemVersion > 12
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);

      return;
    } catch (err) {
      console.warn(err);
      return;
    }
  }
};

export const formatTime = secs => {
  let hours = Math.floor(secs / 3600);
  let minutes = Math.floor(secs / 60) % 60;
  let seconds = secs % 60;
  return [hours, minutes, seconds]
    .map(v => ('' + v).padStart(2, '0'))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
};

export const secondsToHHMMSS = seconds => {
  seconds = Number(seconds);
  const h = Math.floor(seconds / (1000 * 60 * 60));
  const m = Math.floor((seconds % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((seconds % (1000 * 60)) / 1000);

  const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
  const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
  const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
  return `${hrs}${mins}${scnds}`;
};
