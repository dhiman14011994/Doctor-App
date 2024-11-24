import {
  View,
  Text,
  Alert,
  StatusBar,
  Platform,
  BackHandler,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import GTSafeAreaView from '../../../components/GTSafeAreaView';
import GTHeader from '../../../components/GTHeader';
import CONSTANTS from '../../../utils/constants';
import {White_Left_Icon} from '../../../assets';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GTInput from '../../../components/GTInput';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import GTButton from '../../../components/GTButton';
import GTDropdown from '../../../components/GTDropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  useCreateAccountApiMutation,
  useLazyGetSpecialityApiQuery,
} from '../../../redux/auth-api-slice';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {setIsLogin, setToken, setUserInfo} from '../../../redux/app-api-slice';
import {setPrefsValue} from '../../../utils/storage';
import GTLinearGradientView from '../../../components/GTLinearGradientView';
import {personalInfoValidationSchema} from '../../../utils/validations';

import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages, //async functions
  //@ts-ignore
} from 'react-country-state-city';
import GTModal from '../../../components/GTModal';
import GTOnline from '../../../components/GTOnline';
import {RouteNames} from '../../../utils/routesName';

const PersonalInformation = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const route: any = useRoute();
  const [isExpandSpeciality, setExpandSpeciality] = useState(false);
  const [isExpandCountry, setExpandCountry] = useState(false);
  const [isExpandCity, setExpandCity] = useState(false);
  const [isExpandState, setExpandState] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState('Select');
  const [selectedCountry, setSelectedCountry] = useState('Select');
  const [selectedState, setSelectedState] = useState('Select');
  const [selectedCity, setSelectedCity] = useState('Select');
  const [specialityList, setSpecialityList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [countryId, setCountryId] = useState(0);
  const [createAccountApi, {isLoading: isResendLoading}] =
    useCreateAccountApiMutation();
  const [isAccountVerifed, setIsAccountVerifed] = useState(false);

  const [getSpecialityApi, {data, isLoading: isSpeciality}] =
    useLazyGetSpecialityApiQuery();
  const timerRef: any = useRef(null);

  useEffect(() => {
    GetCountries().then((result: any) => {
      setCountryList(result);
    });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  //This function is used for check the validation in input values & call respective API
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      mobile_no: '',
      countryCode: '91',
      zip_code: '',
      countryName: 'IN',
    },
    validationSchema: personalInfoValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: values => {
      //for API call
      onCreateAccount(values);
    },
  });

  useEffect(() => {
    getSpecialityData();
    if (route?.params?.phone_number) {
      formik.setFieldValue(
        CONSTANTS.formik_Key.MOBILE_NO,
        `${route?.params?.phone_number}` || '',
      );
      formik.setFieldValue(
        'countryCode',
        `+${route?.params?.countryCode}` || '',
      );
    }
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.reset({
        index: 0,
        //@ts-ignore
        routes: [{name: RouteNames.WELCOME}],
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const getSpecialityData = () => {
    getSpecialityApi('')
      .unwrap()
      .then(res => {
        console.log('res>>', res);
        setSpecialityList(res?.data || []);
      })
      .catch(e => {
        console.log('error specility', e);
      });
  };

  const onCreateAccount = (values: any) => {
    var selectedList = specialityList
      .filter((dataItem: any) => dataItem?.isSelected)
      .map((item: any) => ({
        cat: item.name,
        key: item._id.toString(),
      }));
    var selectedCountryList = countryList.filter(
      (dataItem: any) => dataItem.isSelected,
    );
    var selectedStateList = stateList.filter(
      (dataItem: any) => dataItem.isSelected,
    );
    var selectedCityList = cityList.filter(
      (dataItem: any) => dataItem.isSelected,
    );

    if (selectedList.length < 1) {
      Alert.alert('Please select speciality');
      return;
    }
    if (selectedCountryList.length < 1) {
      Alert.alert('Please select country');
      return;
    }
    if (selectedStateList.length < 1) {
      Alert.alert('Please select state');
      return;
    }
    if (selectedCityList.length < 1) {
      Alert.alert('Please select city');
      return;
    }
    const param = {
      firstName: values.first_name,
      lastName: values.last_name,
      email: values.email,
      country: selectedCountry,
      city: selectedCity,
      mobileNumber: route?.params?.phone_number
        ? `${route?.params?.countryCode}${route?.params?.phone_number}`
        : `${values?.countryCode}${values.mobile_no}`,
      state: selectedState,
      zipCode: values.zip_code,
      speciality: selectedList,
    };
    createAccountApi(param)
      .unwrap()
      .then(async result => {
        if (result.responseCode === 200) {
          setIsAccountVerifed(true);
          // setPrefsValue(CONSTANTS.STORAGE.ISLOGGED, 'true');
          // dispatch(setIsLogin(true));

          // dispatch(setUserInfo(result.data));
          // dispatch(setToken(result?.data?.accessToken));
          // setPrefsValue(
          //   CONSTANTS.STORAGE.TOKEN,
          //   result?.data?.accessToken || '',
          // );
          // dispatch(setIsLogin(true));
          // setPrefsValue(CONSTANTS.STORAGE.ISLOGGED, 'true');
          // setPrefsValue(
          //   CONSTANTS.STORAGE.USER_DATA,
          //   result.data ? JSON.stringify(result.data) : '',
          // );
        }
      })
      .catch(error => {
        console.log(error);
        // if we have the status error
        if (error?.responseCode === 400) {
          Toast.show({
            type: 'error',
            text1: CONSTANTS.TEXT.ERROR,
            text2: error.data.responseMessage,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: CONSTANTS.TEXT.ERROR,
            text2: error?.data?.error || '',
          });
        }
      });
  };

  const onSelectedCountry = (item: any) => {
    setExpandCountry(false);
    setSelectedCountry(item.name);
    setCountryId(item.id);
    GetState(item.id).then((result: any) => {
      setStateList(result);
    });
    const updatedData: any = countryList.map((itemIndex: any) =>
      item.id === itemIndex.id
        ? {...itemIndex, isSelected: true}
        : {...itemIndex, isSelected: false},
    );
    setCountryList(updatedData);
  };

  const onSelectedState = (item: any) => {
    setExpandState(false);
    setSelectedState(item.name);
    GetCity(countryId, item.id).then((result: any) => {
      setCityList(result);
    });
    const updatedData: any = stateList.map((itemIndex: any) =>
      item.id === itemIndex.id
        ? {...itemIndex, isSelected: true}
        : {...itemIndex, isSelected: false},
    );
    setStateList(updatedData);
  };

  const onSelectedCity = (item: any) => {
    setExpandCity(false);
    setSelectedCity(item.name);
    const updatedData: any = cityList.map((itemIndex: any) =>
      item.id === itemIndex.id
        ? {...itemIndex, isSelected: true}
        : {...itemIndex, isSelected: false},
    );
    setCityList(updatedData);
  };
  const isDisabled =
    formik.values.first_name !== '' &&
    formik.values.zip_code !== '' &&
    selectedCity != 'Select' &&
    selectedCountry != 'Select' &&
    selectedSpeciality != 'Select' &&
    selectedState != 'Select';
  return (
    <View style={styles.container}>
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
        text={CONSTANTS.TEXT.PERSONAL_INFORMATION}
        leftIcon={<White_Left_Icon width={20} height={20} />}
        customStyle={styles.headerContainer}
        onHandleLeftPress={() =>
          navigation.reset({
            index: 0,
            //@ts-ignore
            routes: [{name: RouteNames.WELCOME}],
          })
        }
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: CONSTANTS.THEME.size.HEIGHT * 0.01,
          }}>
          <GTInput
            customStyle={styles.nameInputView}
            inputContainer={styles.inputContainer}
            inputStyle={{...styles.inputStyle}}
            label={CONSTANTS.TEXT.FIRST_NAME}
            labelFontWeight={'600'}
            labelFontSize={CONSTANTS.THEME.size.s14}
            labelFontFamily={CONSTANTS.THEME.typography.fontFamily.Regular}
            placeholder={CONSTANTS.TEXT.ENTER_NAME}
            input={formik.values.first_name}
            setInput={formik.handleChange(CONSTANTS.formik_Key.FIRST_NAME)}
            onRightIconPress={() => {}}
            isError={formik.errors.first_name && formik.errors.first_name}
          />
          <GTInput
            customStyle={styles.nameInputView}
            inputContainer={styles.inputContainer}
            inputStyle={{...styles.inputStyle}}
            label={CONSTANTS.TEXT.LAST_NAME}
            labelFontFamily={CONSTANTS.THEME.typography.fontFamily.Regular}
            placeholder={CONSTANTS.TEXT.ENTER_NAME}
            input={formik.values.last_name}
            setInput={formik.handleChange(CONSTANTS.formik_Key.LAST_NAME)}
            onRightIconPress={() => {}}
            isError={formik.errors.last_name && formik.errors.last_name}
          />
        </View>
        <GTInput
          label={CONSTANTS.TEXT.EMAIL_ADDRESS}
          labelFontFamily={CONSTANTS.THEME.typography.fontFamily.Regular}
          placeholder={CONSTANTS.TEXT.ENTER_EMAIL_ADDRESS}
          input={formik.values.email}
          inputStyle={{...styles.inputStyle}}
          labelFontWeight={'600'}
          autoCapitalize="none"
          labelFontSize={CONSTANTS.THEME.size.s14}
          setInput={formik.handleChange(CONSTANTS.formik_Key.EMAIL_ADDRESS)}
          onRightIconPress={() => {}}
          isError={formik.errors.email && formik.errors.email}
          inputContainer={styles.inputContainer}
        />
        <GTInput
          isEditable={route?.params?.phone_number ? false : true}
          label={CONSTANTS.TEXT.MOBILE_NUMBER}
          labelFontFamily={CONSTANTS.THEME.typography.fontFamily.Regular}
          labelFontWeight={'600'}
          labelFontSize={CONSTANTS.THEME.size.s14}
          placeholder={CONSTANTS.TEXT.ENTER_MOBILE_NUMBER}
          inputStyle={{paddingHorizontal: 0, ...styles.inputStyle}}
          input={formik.values.mobile_no}
          inputContainer={{
            ...styles.inputContainer,
            backgroundColor: route?.params?.phone_number
              ? CONSTANTS.THEME.colors.NEUTRAL['200']
              : CONSTANTS.THEME.colors.WHITE_COLOR,
          }}
          isCountryCode={true}
          setInput={formik.handleChange(CONSTANTS.formik_Key.MOBILE_NO)}
          isError={formik.errors.mobile_no && formik.errors.mobile_no}
          onSelect={(code: any) => {
            formik.setFieldValue('countryCode', `${code.callingCode[0]}` || '');
            formik.setFieldValue('countryName', code?.cca2);
          }}
          containerButtonStyle={{
            backgroundColor: route?.params?.phone_number
              ? CONSTANTS.THEME.colors.NEUTRAL['200']
              : CONSTANTS.THEME.colors.WHITE_COLOR,
          }}
          countryName={formik.values.countryName}
        />
        <GTDropdown
          label={CONSTANTS.TEXT.SPECIALITY}
          isExpand={isExpandSpeciality}
          onPressExpand={() => {
            setExpandSpeciality(!isExpandSpeciality);
          }}
          data={specialityList || []}
          selected={selectedSpeciality}
          onPressHandle={item => {
            const updatedData: any = specialityList.map((itemIndex: any) => {
              if (item._id === itemIndex._id) {
                return {
                  ...itemIndex,
                  isSelected:
                    itemIndex?.isSelected == undefined
                      ? true
                      : !itemIndex?.isSelected,
                };
              }
              return itemIndex;
            });
            // console.log('selec', updatedData);
            setSpecialityList(updatedData);
            var selectedList = updatedData.filter(
              (dataItem: any) => dataItem?.isSelected,
            );
            if (selectedList?.length > 0) {
              setSelectedSpeciality(
                `${selectedList[selectedList?.length - 1].name} ${
                  selectedList.length > 1 ? `+${selectedList.length - 1}` : ''
                }`,
              );
            } else {
              setSelectedSpeciality('Select');
            }
          }}
        />
        <View
          style={{
            // flexDirection: 'row',
            marginTop: CONSTANTS.THEME.size.HEIGHT * 0.01,
          }}>
          <GTDropdown
            // customStyle={{width: CONSTANTS.THEME.size.WIDTH * 0.44}}
            label={CONSTANTS.TEXT.COUNTRY}
            isExpand={isExpandCountry}
            onPressExpand={() => {
              setExpandCountry(!isExpandCountry);
            }}
            data={countryList}
            selected={selectedCountry}
            onPressHandle={(item: any) => {
              onSelectedCountry(item);
            }}
          />
          <GTDropdown
            // customStyle={{width: CONSTANTS.THEME.size.WIDTH * 0.44}}
            label={CONSTANTS.TEXT.STATE}
            isExpand={isExpandState}
            onPressExpand={() => {
              setExpandState(!isExpandState);
            }}
            data={stateList}
            selected={selectedState}
            onPressHandle={(item: any) => {
              onSelectedState(item);
            }}
          />
        </View>
        <View
          style={{
            // flexDirection: 'row',
            marginTop: CONSTANTS.THEME.size.HEIGHT * 0.01,
          }}>
          <GTDropdown
            // customStyle={{width: CONSTANTS.THEME.size.WIDTH * 0.44}}
            label={CONSTANTS.TEXT.CITY}
            isExpand={isExpandCity}
            selected={selectedCity}
            onPressExpand={() => {
              setExpandCity(!isExpandCity);
            }}
            data={cityList}
            onPressHandle={(item: any) => {
              onSelectedCity(item);
            }}
          />
          <GTInput
            customStyle={{
              // width: CONSTANTS.THEME.size.WIDTH * 0.5,
              marginVertical: CONSTANTS.THEME.size.WIDTH * 0.02,
            }}
            label={CONSTANTS.TEXT.ZIP_CODE}
            keytype="numeric"
            labelFontFamily={CONSTANTS.THEME.typography.fontFamily.Regular}
            placeholder={CONSTANTS.TEXT.ZIP_CODE}
            input={formik.values.zip_code}
            setInput={formik.handleChange(CONSTANTS.formik_Key.ZIP_CODE)}
            onRightIconPress={() => {}}
            maxLength={6}
            labelFontWeight={'600'}
            inputStyle={{...styles.inputStyle}}
            labelFontSize={CONSTANTS.THEME.size.s14}
            labelColor={CONSTANTS.THEME.colors.Dark_Gunmetal}
            isError={formik.errors.zip_code && formik.errors.zip_code}
          />
        </View>
      </KeyboardAwareScrollView>

      <GTButton
        text={CONSTANTS.TEXT.SAVE_DETAILS}
        color={
          isDisabled
            ? CONSTANTS.THEME.colors.WHITE_COLOR
            : CONSTANTS.THEME.colors.Light_Gunmetal
        }
        backgroundColor={
          isDisabled
            ? CONSTANTS.THEME.colors.PRIMARY_COLOR
            : CONSTANTS.THEME.colors.LIGHT_WHITE
        }
        customStyle={styles.continueButton}
        onHandlePress={formik.handleSubmit}
        disabled={!isDisabled}
      />
      <GTModal visible={isAccountVerifed}>
        <GTOnline
          isLogin={false}
          onClosePress={() => {
            setIsAccountVerifed(false);
            timerRef.current = setTimeout(() => {
              navigation.reset({
                index: 0,
                //@ts-ignore
                routes: [{name: RouteNames.WELCOME}],
              });
            });
          }}
        />
      </GTModal>
    </View>
  );
};

export default PersonalInformation;
