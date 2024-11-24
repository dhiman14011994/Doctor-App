import {View, Text, StatusBar, Platform, BackHandler} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import styles from './styles';
import GTHeader from '../../../components/GTHeader';
import {WHITE_EDIT_ICON, White_Left_Icon} from '../../../assets';
import CONSTANTS from '../../../utils/constants';
import GTLinearGradientView from '../../../components/GTLinearGradientView';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import GTScrollView from '../../../components/GTScrollView';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GTImage from '../../../components/GTImage';
import GTButtonContainer from '../../../components/GTButtonContainer';
import {useFormik} from 'formik';
import {personalInfoValidationSchema} from '../../../utils/validations';
import GTInput from '../../../components/GTInput';
import GTDropdown from '../../../components/GTDropdown';
import {useSelector} from 'react-redux';

const EditProfile = () => {
  const navigation = useNavigation();
  const userInfo = useSelector((state: any) => state.appState.userInfo);
  const isFocus = useIsFocused();
  const insets = useSafeAreaInsets();
  const [isExpandSpeciality, setExpandSpeciality] = useState(false);
  const [isExpandCountry, setExpandCountry] = useState(false);
  const [isExpandCity, setExpandCity] = useState(false);
  const [isExpandState, setExpandState] = useState(false);
  const [specialityList, setSpecialityList] = useState([
    {
      id: 1,
      name: 'Aviation Psychologists',
      isSelected: false,
    },
    {
      id: 2,
      name: 'Comparative Psychologists',
      isSelected: false,
    },
    {
      id: 3,
      name: 'Biopsychologists',
      isSelected: false,
    },
    {
      id: 4,
      name: 'Consumer Psychologists',
      isSelected: false,
    },
    {
      id: 5,
      name: 'Clinical Psychologists',
      isSelected: false,
    },
    {
      id: 6,
      name: 'Counseling Psychologists',
      isSelected: false,
    },
  ]);
  const [countryList, setCountryList] = useState([
    {
      id: 1,
      name: 'Denmark',
      isSelected: false,
    },
    {
      id: 2,
      name: 'India',
      isSelected: false,
    },
    {
      id: 3,
      name: 'United States',
      isSelected: false,
    },
  ]);
  const [stateList, setStateList] = useState([
    {
      id: 1,
      name: 'Haryana',
      isSelected: false,
    },
    {
      id: 2,
      name: 'Punjab',
      isSelected: false,
    },
    {
      id: 3,
      name: 'Telangana',
      isSelected: false,
    },
  ]);
  const [cityList, setCityList] = useState([
    {
      id: 1,
      name: 'Hyderabad',
      isSelected: false,
    },
    {
      id: 2,
      name: 'Warangal',
      isSelected: false,
    },
    {
      id: 3,
      name: 'Karimnagar',
      isSelected: false,
    },
  ]);

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
    setUserData();
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

  const setUserData = () => {
    console.log(userInfo);
    formik.setFieldValue(
      CONSTANTS.formik_Key.FIRST_NAME,
      userInfo?.firstName || '',
    );
    formik.setFieldValue(
      CONSTANTS.formik_Key.LAST_NAME,
      userInfo?.lastName || '',
    );
    formik.setFieldValue(
      CONSTANTS.formik_Key.EMAIL_ADDRESS,
      userInfo?.email || '',
    );
    formik.setFieldValue(
      CONSTANTS.formik_Key.MOBILE_NO,
      userInfo?.mobileNumber || '',
    );
    formik.setFieldValue(
      CONSTANTS.formik_Key.COUNTRY_CODE,
      userInfo?.countryCode || '91',
    );
    formik.setFieldValue(
      CONSTANTS.formik_Key.ZIP_CODE,
      userInfo?.zipCode || '',
    );
    formik.setFieldValue(
      CONSTANTS.formik_Key.SELECTED_SPECIALITY,
      userInfo?.speciality
        ? `${userInfo?.speciality[userInfo?.speciality?.length - 1]?.cat} ${
            userInfo?.speciality.length > 1
              ? `+${userInfo?.speciality.length - 1}`
              : ''
          }`
        : 'Select',
    );
    formik.setFieldValue(
      CONSTANTS.formik_Key.SELECTED_CITY,
      userInfo?.city || 'Select',
    );
    formik.setFieldValue(
      CONSTANTS.formik_Key.SELECTED_COUNTRY,
      userInfo?.country || 'Select',
    );
    formik.setFieldValue(
      CONSTANTS.formik_Key.SELECTED_STATE,
      userInfo?.state || 'Select',
    );
    const updatedData = specialityList.map((item, index) => {
      var itemIndex = userInfo?.speciality?.findIndex(
        (specialityItem: any) => specialityItem.cat === item.name,
      );
      if (itemIndex !== -1) {
        return {...item, isSelected: true};
      }
      return item;
    });
    setSpecialityList([...updatedData]);

    const updateCity = cityList.map((item, index) => {
      if (item.name == userInfo?.city) {
        return {...item, isSelected: true};
      }
      return item;
    });
    setCityList([...updateCity]);
    const updateCountry = countryList.map((item, index) => {
      if (item.name == userInfo?.country) {
        return {...item, isSelected: true};
      }
      return item;
    });
    setCountryList([...updateCountry]);
    const updateState = stateList.map((item, index) => {
      if (item.name == userInfo?.state) {
        return {...item, isSelected: true};
      }
      return item;
    });
    setStateList([...updateState]);
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
          text={'Edit Profile'}
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

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      mobile_no: '',
      countryCode: '91',
      zip_code: '',
      countryName: 'IN',
      selectedSpeciality: 'Select',
      selectedCountry: 'Select',
      selectedState: 'Select',
      selectedCity: 'Select',
    },
    validationSchema: personalInfoValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: values => {
      //for API call
      //    onCreateAccount(values);
    },
  });

  return (
    <View style={styles.container}>
      {hearderContainerView()}
      <GTScrollView>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <View style={styles.imageStyle}>
              <GTImage imageStyle={styles.imageStyle} />
              <GTButtonContainer customStyle={styles.editButton}>
                <WHITE_EDIT_ICON
                  width={CONSTANTS.THEME.size.s18}
                  height={CONSTANTS.THEME.size.s18}
                />
              </GTButtonContainer>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: CONSTANTS.THEME.size.HEIGHT * 0.01,
            }}>
            <GTInput
              customStyle={styles.nameInputView}
              inputContainer={styles.inputContainer}
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
            labelFontWeight={'600'}
            autoCapitalize="none"
            labelFontSize={CONSTANTS.THEME.size.s14}
            setInput={formik.handleChange(CONSTANTS.formik_Key.EMAIL_ADDRESS)}
            onRightIconPress={() => {}}
            isError={formik.errors.email && formik.errors.email}
            inputContainer={styles.inputContainer}
          />
          <GTInput
            isEditable={false}
            label={CONSTANTS.TEXT.MOBILE_NUMBER}
            labelFontFamily={CONSTANTS.THEME.typography.fontFamily.Regular}
            labelFontWeight={'600'}
            labelFontSize={CONSTANTS.THEME.size.s14}
            placeholder={CONSTANTS.TEXT.ENTER_MOBILE_NUMBER}
            inputStyle={{paddingHorizontal: 0}}
            input={formik.values.mobile_no}
            inputContainer={{
              ...styles.inputContainer,
              backgroundColor: CONSTANTS.THEME.colors.NEUTRAL['200'],
            }}
            isCountryCode={true}
            setInput={formik.handleChange(CONSTANTS.formik_Key.MOBILE_NO)}
            isError={formik.errors.mobile_no && formik.errors.mobile_no}
            onSelect={(code: any) => {
              formik.setFieldValue(
                'countryCode',
                `${code.callingCode[0]}` || '',
              );
              formik.setFieldValue('countryName', code?.cca2);
            }}
            containerButtonStyle={{
              backgroundColor: CONSTANTS.THEME.colors.NEUTRAL['200'],
            }}
            countryName={formik.values.countryName}
          />
          <GTDropdown
            label={CONSTANTS.TEXT.SPECIALITY}
            isExpand={isExpandSpeciality}
            onPressExpand={() => {
              setExpandSpeciality(!isExpandSpeciality);
            }}
            data={specialityList}
            selected={formik.values.selectedSpeciality}
            onPressHandle={item => {
              const updatedData = specialityList.map(itemIndex =>
                item.id === itemIndex.id
                  ? {...itemIndex, isSelected: !itemIndex?.isSelected}
                  : itemIndex,
              );
              setSpecialityList(updatedData);
              var selectedList = updatedData.filter(
                dataItem => dataItem.isSelected,
              );
              if (selectedList?.length > 0) {
                formik.setFieldValue(
                  CONSTANTS.formik_Key.SELECTED_SPECIALITY,
                  `${selectedList[selectedList?.length - 1].name} ${
                    selectedList.length > 1 ? `+${selectedList.length - 1}` : ''
                  }`,
                );
              } else {
                formik.setFieldValue(
                  CONSTANTS.formik_Key.SELECTED_SPECIALITY,
                  'Select',
                );
              }
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: CONSTANTS.THEME.size.HEIGHT * 0.01,
            }}>
            <GTDropdown
              customStyle={{width: CONSTANTS.THEME.size.WIDTH * 0.44}}
              label={CONSTANTS.TEXT.COUNTRY}
              isExpand={isExpandCountry}
              onPressExpand={() => {
                setExpandCountry(!isExpandCountry);
              }}
              data={countryList}
              selected={formik.values.selectedCountry}
              onPressHandle={item => {
                formik.setFieldValue(
                  CONSTANTS.formik_Key.SELECTED_COUNTRY,
                  item.name,
                );
                const updatedData = countryList.map(itemIndex =>
                  item.id === itemIndex.id
                    ? {...itemIndex, isSelected: true}
                    : {...itemIndex, isSelected: false},
                );
                setCountryList(updatedData);
              }}
            />
            <GTDropdown
              customStyle={{width: CONSTANTS.THEME.size.WIDTH * 0.44}}
              label={CONSTANTS.TEXT.STATE}
              isExpand={isExpandState}
              onPressExpand={() => {
                setExpandState(!isExpandState);
              }}
              data={stateList}
              selected={formik.values.selectedState}
              onPressHandle={item => {
                formik.setFieldValue(
                  CONSTANTS.formik_Key.SELECTED_STATE,
                  item.name,
                );
                const updatedData = stateList.map(itemIndex =>
                  item.id === itemIndex.id
                    ? {...itemIndex, isSelected: true}
                    : {...itemIndex, isSelected: false},
                );
                setStateList(updatedData);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: CONSTANTS.THEME.size.HEIGHT * 0.01,
            }}>
            <GTDropdown
              customStyle={{width: CONSTANTS.THEME.size.WIDTH * 0.44}}
              label={CONSTANTS.TEXT.CITY}
              isExpand={isExpandCity}
              selected={formik.values.selectedCity}
              onPressExpand={() => {
                setExpandCity(!isExpandCity);
              }}
              data={cityList}
              onPressHandle={item => {
                formik.setFieldValue(
                  CONSTANTS.formik_Key.SELECTED_CITY,
                  item.name,
                );
                const updatedData = cityList.map(itemIndex =>
                  item.id === itemIndex.id
                    ? {...itemIndex, isSelected: true}
                    : {...itemIndex, isSelected: false},
                );
                setCityList(updatedData);
              }}
            />
            <GTInput
              customStyle={{
                width: CONSTANTS.THEME.size.WIDTH * 0.5,
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
              isError={formik.errors.zip_code && formik.errors.zip_code}
            />
          </View>
          <View style={styles.emptyView} />
        </KeyboardAwareScrollView>
      </GTScrollView>
    </View>
  );
};

export default EditProfile;
