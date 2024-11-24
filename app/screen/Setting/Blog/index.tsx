import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CONSTANTS from '../../../utils/constants';
import styles from './styles';
import GTLinearGradientView from '../../../components/GTLinearGradientView';
import GTHeader from '../../../components/GTHeader';
import {
  ADD_IMAGE_ICON,
  Calender_Icon,
  White_Left_Icon,
  X_CLOSE_ICON,
} from '../../../assets';
import GTLabel from '../../../components/GTLabel';
import GTScrollView from '../../../components/GTScrollView';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GTInput from '../../../components/GTInput';
import {useFormik} from 'formik';
import moment from 'moment';
import GTButton from '../../../components/GTButton';
import GTModal from '../../../components/GTModal';
//@ts-ignore
import CalendarPicker from 'react-native-calendar-picker';
import GTButtonContainer from '../../../components/GTButtonContainer';
import {
  requestCameraPermission,
  requestExternalWritePermission,
} from '../../../utils/customFunction';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import GTSelectImageView from '../../../components/GTSelectImageView';
import GTImage from '../../../components/GTImage';
import {useCreateBlogApiApiMutation} from '../../../redux/home-api-slice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useUploadFileApiMutation} from '../../../redux/auth-api-slice';
import GTIndicator from '../../../components/GTIndicator';

const Blog = () => {
  const insets = useSafeAreaInsets();
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [isVisable, setVisble] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModal, setModal] = useState(false);
  const [imageData, setImageData] = useState('');
  const [createBlogApiApi, {data: blogData, isLoading: blogLoading}] =
    useCreateBlogApiApiMutation();
  const navigation = useNavigation();
  const [uploadFileApi, {isLoading: uploadFileLoading}] =
    useUploadFileApiMutation();
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
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      blogDate: '',
      image: [],
    },
    //  validationSchema: personalInfoValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values: any) => {
      submitForm(values);
    },
  });

  function flattenArray(arr: any) {
    let result: any = [];
    arr.forEach((element: any) => {
      console.log('element?.uri>>>', element?.uri);
      var formData = new FormData();
      formData.append('profile_picture', {
        uri: element?.uri,
        type: 'image/png',
        name: 'image.png',
      });
      uploadFileApi(formData)
        .unwrap()
        .then(res => {
          result.push(res?.data?.url || res?.data[0]?.url);
        })
        .catch(e => console.log('file upload err', e));
    });
    return result;
  }

  const submitForm = (values: any) => {
    // const formData = new FormData();

    var params: any = {
      title: values.title,
      description: values.description,
      createdTime: values.blogDate,
      image: ['https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png'],
    };
    var newArrayList: any = [];
    var imageData = flattenArray(values.image);
    timerRef.current = setTimeout(() => {
      createBlogApiApi({
        title: values.title,
        description: values.description,
        createdTime: values.blogDate,
        image: imageData,
      })
        .unwrap()
        .then(res => {
          console.log(res);
          navigation.goBack();
        })
        .catch(err => console.log('err', err));
    }, 800);
  };

  const selectImage = async (type: string) => {
    try {
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      let options: any = {
        maxWidth: CONSTANTS.THEME.size.WIDTH * 2,
        maxHeight: CONSTANTS.THEME.size.HEIGHT * 2,
        allowsEditing: false,
        noData: true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },

        quality: 1,
      };
      if (isCameraPermitted && isStoragePermitted) {
        if (type === 'camera') {
          launchCamera(options, async (res: any) => {
            if (res?.assets && res?.assets[0]) {
              setModal(false);
              setImageData(res?.assets[0]);
              formik.setFieldValue('image', [
                ...formik.values.image,
                res?.assets[0],
              ]);
            }
            setModal(false);
          }).catch(_ => {
            setModal(false);
          });
        } else {
          launchImageLibrary(options, async (response: any) => {
            if (response?.assets && response?.assets[0]) {
              setModal(false);
              setImageData(response?.assets[0]);
              formik.setFieldValue('image', [
                ...formik.values.image,
                response?.assets[0],
              ]);
            }
            setModal(false);
          }).catch(_ => {
            setModal(false);
          });
        }
      } else {
        setModal(false);
      }
    } catch (error) {
      setModal(false);
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
          text={'Blog'}
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

  const renderLineView = () => {
    return (
      <View style={styles.lineContainer}>
        <GTLinearGradientView
          color2={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100]}
          color1={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100]}
          container={{
            width: '40%',
            height: 1,
          }}
        />
        <GTLabel text={'Or'} color={CONSTANTS.THEME.colors.Light_Gunmetal} />
        <GTLinearGradientView
          color1={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100]}
          color2={CONSTANTS.THEME.colors.LIGHT_LINE_COLOR[100]}
          container={{
            width: '40%',
            height: 1,
          }}
        />
      </View>
    );
  };

  const deleteSelectedImage = (data: number) => {
    var newList = formik.values.image.filter(
      (val: any, i: number) => i != data,
    );
    formik.setFieldValue('image', newList);
  };

  const renderImage = ({item, index}: any) => {
    const fileSize: any = Number(item?.fileSize) / 1000000;
    const fileName = item.fileName.split('-');
    const fileDurration =
      fileSize > 1
        ? //@ts-ignore
          `${parseInt(1000 * fileSize)} mb`
        : //@ts-ignore
          `${parseInt(1000 * fileSize)} kb`;

    return (
      <View style={styles.imageViewContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <GTImage
            imageStyle={{
              width: CONSTANTS.THEME.size.WIDTH * 0.15,
              height: CONSTANTS.THEME.size.WIDTH * 0.15,
              borderRadius: CONSTANTS.THEME.size.WIDTH * 0.05,
              overflow: 'hidden',
            }}
            uri={item.uri}
          />
          <View style={{marginLeft: CONSTANTS.THEME.size.s16}}>
            <GTLabel
              text={fileName[fileName.length - 1]}
              fontSize={CONSTANTS.THEME.size.s12}
              fontWeight="600"
              color={CONSTANTS.THEME.colors.Dark_Gunmetal}
            />
            <GTLabel
              text={fileDurration}
              fontSize={CONSTANTS.THEME.size.s12}
              fontWeight="400"
              color={CONSTANTS.THEME.colors.Light_Gunmetal}
            />
          </View>
        </View>
        <GTButtonContainer
          customStyle={styles.closeContainer}
          onHandlePress={() => {
            deleteSelectedImage(index);
          }}>
          <X_CLOSE_ICON
            width={CONSTANTS.THEME.size.s18}
            height={CONSTANTS.THEME.size.s18}
          />
        </GTButtonContainer>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: CONSTANTS.THEME.size.HEIGHT,
        flex: 1,
      }}>
      {hearderContainerView()}

      <GTScrollView>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputFormContainer}>
            <GTInput
              label={CONSTANTS.TEXT.TITLE}
              labelFontFamily={CONSTANTS.THEME.typography.fontFamily.Regular}
              focus={nameFocus}
              placeholder={CONSTANTS.TEXT.ENTER_THE_TITLE}
              input={formik.values.title}
              setInput={formik.handleChange('title')}
              onRightIconPress={() => {}}
              setfocus={setNameFocus}
              isError={formik.errors.title && formik.errors.title}
              inputStyle={styles.inputStyle}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '94%',
                marginHorizontal: '3%',
              }}>
              <GTLabel
                text={CONSTANTS.TEXT.DESCRIPTION}
                fontSize={CONSTANTS.THEME.size.s14}
                color={CONSTANTS.THEME.colors.Dark_Gunmetal}
                fontWeight={'600'}
                customStyle={{
                  lineHeight: CONSTANTS.THEME.size.s22,
                }}
              />
              {/* <GTLabel
                text={'*'}
                fontSize={CONSTANTS.THEME.size.s12}
                color={CONSTANTS.THEME.colors.RED}
                fontWeight={'500'}
                customStyle={{
                  lineHeight: CONSTANTS.THEME.size.s18,
                }}
              /> */}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={formik.values.description}
                style={styles.inputViewStyle}
                onChangeText={formik.handleChange('description')}
                multiline
                placeholder={CONSTANTS.TEXT.ENTER_COMMENT}
              />
            </View>
            {/* <GTInput
              label={CONSTANTS.TEXT.DESCRIPTION}
              labelFontFamily={CONSTANTS.THEME.typography.fontFamily.Regular}
              focus={emailFocus}
              placeholder={CONSTANTS.TEXT.ENTER_DESCRIPTION}
              input={formik.values.description}
              setInput={formik.handleChange('description')}
              autoCapitalize="none"
              onRightIconPress={() => {}}
              setfocus={() => {
                setEmailFocus(true);
                setNameFocus(false);
              }}
              inputContainer={{
                backgroundColor: CONSTANTS.THEME.colors.WHITE_COLOR,
                minHeight: CONSTANTS.THEME.size.BUTTON_HEIGHT,
                justifyContent: 'center',
              }}
              isError={formik.errors.description && formik.errors.description}
              inputStyle={{
                color: CONSTANTS.THEME.colors.Dark_Gunmetal,
                // maxHeight: CONSTANTS.THEME.size.WIDTH * 0.05,
                // height: 20,
              }}
              multiline={true}
            /> */}
            <TouchableOpacity
              onPress={() => {
                setVisble(true);
              }}>
              <GTInput
                label={CONSTANTS.TEXT.DATE}
                labelFontFamily={CONSTANTS.THEME.typography.fontFamily.Regular}
                customStyle={{pointerEvents: 'none'}}
                placeholder={CONSTANTS.TEXT.DATE}
                input={
                  formik.values.blogDate
                    ? moment(formik.values.blogDate).format('DD MMM, YYYY')
                    : ''
                }
                // setInput={}
                onRightIconPress={() => {}}
                isError={formik.errors.blogDate && formik.errors.blogDate}
                inputStyle={styles.inputStyle}
                rightIcon={
                  <Calender_Icon
                    width={CONSTANTS.THEME.size.s20}
                    height={CONSTANTS.THEME.size.s20}
                  />
                }
              />
            </TouchableOpacity>

            <View style={styles.selectedImageContaine}>
              <View style={{flexDirection: 'row'}}>
                <GTLabel
                  color={CONSTANTS.THEME.colors.Dark_Gunmetal}
                  fontWeight="bold"
                  fontSize={CONSTANTS.THEME.size.s16}
                  text={'Image'}
                />
                <GTLabel
                  color={CONSTANTS.THEME.colors.RED}
                  fontWeight="bold"
                  fontSize={CONSTANTS.THEME.size.s16}
                  text={'*'}
                />
              </View>
              <View style={styles.selectImageView}>
                <ADD_IMAGE_ICON
                  height={CONSTANTS.THEME.size.s40}
                  width={CONSTANTS.THEME.size.s40}
                />
                <GTLabel
                  color={CONSTANTS.THEME.colors.Dark_Gunmetal}
                  fontWeight="400"
                  fontSize={CONSTANTS.THEME.size.s16}
                  text={CONSTANTS.TEXT.DRAG_FILE}
                  customStyle={{marginTop: CONSTANTS.THEME.size.s12}}
                />
                {renderLineView()}
                <GTButtonContainer
                  customStyle={styles.browserButton}
                  onHandlePress={() => {
                    setModal(true);
                  }}>
                  <GTLabel
                    color={CONSTANTS.THEME.colors.Dark_Gunmetal}
                    fontWeight="400"
                    fontSize={CONSTANTS.THEME.size.s16}
                    text={CONSTANTS.TEXT.BROWSER_FILE}
                  />
                </GTButtonContainer>
              </View>
            </View>
            {Array.isArray(formik?.values?.image) &&
              formik?.values?.image?.length > 0 && (
                <View style={styles.imageView}>
                  {formik?.values?.image?.map((item: any, index: number) =>
                    renderImage({item, index}),
                  )}
                </View>
              )}
            <View
              style={{
                ...styles.bottomContainer,
              }}>
              <GTButton
                text={CONSTANTS.TEXT.SAVE_DETAILS}
                color={
                  formik.values.title &&
                  formik.values.description &&
                  formik.values.blogDate
                    ? CONSTANTS.THEME.colors.WHITE_COLOR
                    : CONSTANTS.THEME.colors.Light_Gunmetal
                }
                backgroundColor={
                  formik.values.title &&
                  formik.values.description &&
                  formik.values.blogDate
                    ? CONSTANTS.THEME.colors.PRIMARY_COLOR
                    : CONSTANTS.THEME.colors.LIGHT_WHITE
                }
                customStyle={styles.continueButton}
                disabled={
                  !(
                    formik.values.title &&
                    formik.values.description &&
                    formik.values.blogDate
                  )
                }
                onHandlePress={formik.handleSubmit}
                fontSize={CONSTANTS.THEME.size.s16}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </GTScrollView>
      <GTModal visible={isVisable} onClose={() => setVisble(false)}>
        <View style={styles.calenderContainer}>
          <CalendarPicker
            maxDate={new Date()}
            onDateChange={(value: any) => {
              setSelectedDate(value);
            }}
            previousTitleStyle={{color: CONSTANTS.THEME.colors.Dark_Gunmetal}}
            nextTitleStyle={{color: CONSTANTS.THEME.colors.Dark_Gunmetal}}
          />
          <View style={styles.confirmContainer}>
            <GTLabel
              onPress={() => {
                setVisble(false);
              }}
              text={CONSTANTS.TEXT.CANCEL}
              fontSize={CONSTANTS.THEME.size.s14}
              color={CONSTANTS.THEME.colors.PRIMARY_COLOR}
              fontWeight="500"
            />
            <GTLabel
              onPress={() => {
                formik.setFieldValue('blogDate', selectedDate);
                setVisble(false);
              }}
              text={CONSTANTS.TEXT.OK}
              fontSize={CONSTANTS.THEME.size.s14}
              color={CONSTANTS.THEME.colors.PRIMARY_COLOR}
              fontWeight="500"
            />
          </View>
        </View>
      </GTModal>
      <GTModal container={{justifyContent: 'flex-end'}} visible={isModal}>
        <GTSelectImageView
          onSelectImageType={selectImage}
          profileText={CONSTANTS.TEXT.CHOOSE_BLOG_PHOTO}
          galleryText={CONSTANTS.TEXT.CHOOSE_FROM_GALLERY}
          cameraText={CONSTANTS.TEXT.CHOOSE_FROM_CAMERA}
          cancelText={CONSTANTS.TEXT.CANCEL}
          onClosePress={() => {
            setModal(false);
          }}
        />
      </GTModal>
      {(uploadFileLoading || blogLoading) && <GTIndicator />}
    </View>
  );
};

export default Blog;
