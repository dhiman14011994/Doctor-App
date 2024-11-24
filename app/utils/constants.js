import {Dimensions} from 'react-native';
import {fontResize} from './fontResize';

const CONSTANTS = {
  TEXT: {
    MIND_TALKS: 'Mind Talks',
    YOUR_PATH: 'Your Path to Clarity',
    WELCOME_WORLD: 'WELCOME TO THE WORLD OF',
    PSYCHOLOGY: 'PSYCHOLOGY',
    MINDFULL: 'Mindful Insights',
    PERSONAL_GROWTH: 'Personal Growth',
    LOREM_TEXT:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    SIGN_IN_VIA: 'Sign in via mobile number',
    BACK: 'Back',
    YOUR_NUMBER: 'Your Phone Number',
    ENTER_PHONE_NUMBER: 'Enter your phone number to get started.',
    MAKE_SURE:
      'Make sure you can receive SMS to this number so that wer can send you a code.',
    INVALID_PHONE_NUMBER: 'Please enter a valid phone number',
    PHONE_NUMBER: 'Enter the phone number',
    VERIFICATION_CODE: 'Verification Code',
    VALID_VERIFICATION_CODE: 'Please enter valid verification code',
    PLEASE_ENTER_CODE:
      'Please enter the code we have sent to your phone number',
    EDIT_NUMBER: 'Edit number?',
    RESEND_CODE: 'Resend code',
    OR: 'Or',
    ERROR: 'ERROR',
    ZIP_CODE: 'Zip Code',
    CONTINUE: 'Continue',
    PERSONAL_INFORMATION: 'Personal Information',
    NAME: 'Name',
    ENTER_NAME: 'Enter name',
    FIRST_NAME: 'First Name',
    CITY: 'City',
    STATE: 'State',
    COUNTRY: 'Country',
    LAST_NAME: 'Last Name',
    SPECIALITY: 'Speciality',
    MY_APPOINTMENTS: 'My Appointments',
    TESTIMONIALS: 'Testimonials',
    SCHEDULE: 'Schedule',
    SETTINGS: 'Settings',
    BLOG: 'Blog',
    ABOUT_US: 'About us',
    SERVICES: 'Services',
    RATE_US: 'Rate us',
    CUSTOMER_SUPPORT: 'Customer Support',
    DIGITAL_WALLET: 'Digital Wallet',
    TOTAL_CHAT: 'Total Chat',
    TOTAL_AUDIO: 'Total Audio',
    TOTAL_EARNING: 'Total Earning',
    TODAY_SCHEDULE: 'TODAY schedule',
    SIGN_UP_PYCHOLOGIST: 'Sign up',
    SIGN_OUT: 'Sign out',
    DESCRIPTION: 'Description',
    GO_ONLINE: 'Go Online',
    GO_OFFLINE: 'Go Offline',
    THANK_YOU_SUBMITTING:
      'Thank you for submitting your details with Mind talk. Please Join the waitlist of the Mind talk once you get shortlisted. Please note that you will be notified vai email.',
    ACCOUNT_VERIFICATION: 'Account verification under process',
    DO_HAVE: 'do you wish to go online?',
    DO_HAVE_OFFLINE: 'do you wish to go offline?',
    BLAG: 'Blog',
    WHAT_OUR_CLIENTS: 'What our client says about us',
    TODAY_SESSIONS: 'Today’s Sessions',
    RECENT_TESTIMONIALS: 'Recent Testimonials',
    NEW_REQUEST_ARRIVED: 'New Request Arrived',
    EMAIL_ADDRESS: 'Email Address',
    ENTER_EMAIL_ADDRESS: 'Enter email address',
    ENTER_DESCRIPTION: 'Enter description',
    MOBILE_NUMBER: 'Mobile Number',
    ENTER_MOBILE_NUMBER: 'Enter mobile number',
    DATE_BIRTH: 'Birth Date',
    DATE: 'Date',
    SELECT_DATE: 'Select date',
    GENDER: 'Gender',
    MALE: 'MAle',
    FEMALE: 'Female',
    OTHER: 'Other',
    VERIFY: 'Verify',
    NEXT: 'Next',
    Skip: 'Skip',
    UPDATE: 'Update',
    LOGIN: 'Login',
    DOB: 'Date Of Birth',
    NEW_USER: ' New user? ',
    LOG_IN: 'Log in',
    FORGOT_PASSWORD: 'Forgot\nPassword',
    I_ALREADY_ACCOUNT: 'I aleady have an account',
    CONTINUE_WITH_FACEBOOK: 'Continue with Facebook',
    CONTINUE_WITH_GOOGLE: 'Continue with Google',
    CONTINUE_WITH_APPLE: 'Continue with Apple',
    OR_CONTINUE_WITH: 'Or continue with',
    EMAIL: 'Email',
    Username: 'Username',
    REGISTER: 'Register',
    SIGN_UP: 'Sign up',
    FORGOT_YOUR_PASSWORD: 'Forgot your password',
    LEARN_MORE: 'Learn more',
    TITLE: 'Title',
    CONDITION: 'Condition',
    ADD: 'Add',
    ACCEPT: 'Accept',
    REJECT: 'Reject',
    NEWS_FEED: 'News Feed',
    NEWS: 'News',
    MOST_POPULAR: 'Most Popular',
    VIEW_ALL: 'View all',
    SHORT: 'Short',
    ALERT_TITLE: 'Alert',
    YES: 'Yes',
    OK: 'OK',
    DELETE: 'Delete',
    NO: 'No',
    SAVE: 'Save',
    SAVE_DETAILS: 'Save Details',
    NOTIFICATION: 'Notification',
    TYPE_YOUR_MESSAGE: 'Type your message here',
    CANCEL: 'Cancel',
    ENTER_THE_TITLE: 'Enter title',
    DRAG_FILE: 'Drag your file(s) to start uploading',
    BROWSER_FILE: 'Browse files',
    CHOOSE_PROFILE_PHOTO: 'Choose Profile Picture',
    CHOOSE_BLOG_PHOTO: 'Choose Blog Picture',
    CHOOSE_FROM_GALLERY: 'Choose from gallery',
    CHOOSE_FROM_CAMERA: 'Choose from camera',
    WALLET_TRANSACTIONS: 'Wallet Transactions',
    AVAILABLE_BALANCE: 'Available Balance',
    WITHDRAWAL: 'Withdrawal',
    WITHDEAWAL_REQUEST: 'Withdrawal Request',
    SUBMIT: 'Submit',
    COMMENT: 'Comment',
    ENTER_COMMENT: 'Enter comment',
    ARE_YOU_SURE_CONFIRM: 'Are you sure, to confirm this slot?',
    ARE_YOU_SURE_CANCEL: 'Are you sure, to cancel this slot?',
    REASON_FOR_CANCEL: 'Reason for cancellation',
    ENTER_REASON_FOR_CANCEL: 'Enter reason for cancellation',
    WAIT_TIME_MIN: 'Waiting time in Min',
    ENTER_WAITING_TIME: 'Enter waiting time',
    DELETE_ACCOUNT: 'Delete account',
  },
  PERMISSION_MESSGAE: {
    PERMISSION_NOTITIFCATION_MESSAGE:
      'Please turn on notification permission manually',
    BLOCKED_PERMISSION: 'The permission is denied and not requestable anymore',
    CANNOT_OPEN: 'cannot open settings',
    GRANTED_PERMISSION: 'The permission is granted',
    LIMITED_PERMISSION: 'The permission is limited: some actions are possible',
    DENIED_PERMISSION:
      'The permission has not been requested / is denied but requestable',
    UNIAVAILABLE_PERMISSION:
      'This feature is not available (on this device / in this context)',
    BLOCK_USER_MESSAGE: 'You blocked this account. Tap to unblock',
  },
  STYLE_TYPE: {
    CANCEL: 'cancel',
    SUCCESS: 'success',
    ERROR: 'error',
    PADDING: 'padding',
  },
  Validation: {
    EMAIL_REQUIRED: 'Email is required',
    PASSWORD_REQUIRED: 'Password is required',
    CONFIRM_PASSWORD_REQUIRED: 'Confirm Password is required',
    MATCH_PASSWORD: 'Passwords must match',
    PASSWORD_MIN: 'Minimum character is 6',
    PASSWORD_MAX: 'Maximum character is 50',
    EMAIL_INVALID: 'Please enter valid email',
    NAME_REQUIRED: 'Name is required',
    NAME_INVALID: 'Please enter name',
    FIRST_NAME_INVALID: 'Please enter first name',
    LAST_NAME_INVALID: 'Please enter last name',
    MOBILE_NO_INVALID: 'Enter vaild phone number',
    MOBILE_NO_REQUIRED: 'Phone number is required',
    FIRST_NAME_REQUIRED: 'First name is required',
    LAST_NAME_REQUIRED: 'Last name is required',
    OTP_INVALID: 'Please enter valid OTP',
    OTP_REQUIRED: 'Please enter one time password',
    ZIP_CODE_INVALID: 'Please enter valid zip code',
    ZIP_CODE_REQUIRED: 'Zip code is required',
  },
  ERROR_MESSAGE: {
    YOU_HAVE: 'You have',
    ATTEMPS_LEFT: 'attempts left',
    PASSWORD_EMAIL: 'Your password or email do not match',
    YOU_ARE_BLOCKED:
      'You are currently blocked from the app.Please start the pin recovery procedure.',
  },
  formik_Key: {
    NAME: 'name',
    LAST_NAME: 'last_name',
    PASSWORD: 'password',
    EMAIL_ADDRESS: 'email',
    FIRST_NAME: 'first_name',
    MOBILE_NO: 'mobile_no',
    ZIP_CODE: 'zip_code',
    GENDER: 'gender',
    DOB: 'dateOfBirth',
    COUNTRY_CODE: 'countryCode',
    CURRENT_PASSWORD: 'currentPassword',
    NEW_PASSWORD: 'newPassword',
    CONFIRM_PASSWORD: 'confirmPassword',
    SELECTED_SPECIALITY: 'selectedSpeciality',
    SELECTED_COUNTRY: 'selectedCountry',
    SELECTED_STATE: 'selectedState',
    SELECTED_CITY: 'selectedCity',
  },
  KEYBOARD_TYPE: {
    DEFAULT: 'default',
    NUMBER_PAD: 'number-pad',
    DECIMAL_PAD: 'decimal-pad',
    NUMERIC: 'numeric',
    EMAIL_ADDRESS: 'email-address',
    PHONE_PAD: 'phone-pad',
    URL: 'url',
  },

  STORAGE: {
    ISLOGGED: 'ISLOGGED',
    ISONBOARDING: 'ISONBOARDING',
    TOKEN: 'token',
    PROFILE_UPDATE: 'isProfileUpdate',
    USER_DATA: 'USER_DATA',
    FCM_TOKEN: 'FCM_TOKEN',
    EMAIL: 'email',
    SCREEN_NAME: 'SCREEN',
  },
  SOCKET_EVENTS: {
    JOIN_ROOM: 'join_room',
    RECEIVE_MESSAGE: 'receive_message',
    SEND_MESSAGE: 'send_message',
    NOTIFICATION: 'notification',
  },
  THEME: {
    colors: {
      BLACK: '#000000',
      BackgroundColor: 'rgb(247,248,251)',
      Dark_Gunmetal: '#1D2433',
      Dark_Gunmetal_Opacity: '#1D2433CC',
      Light_Gray: 'rgba(29, 36, 51, 0.8)',
      PRIMARY_COLOR: '#2F6FED',
      PRIMARY_ONE_COLOR: '#2F92ED',
      PRIMARY_SECOND_COLOR: '#1A5D9A',
      Light_Gunmetal: 'rgba(29, 36, 51, 0.65)',
      Light_Primary_Gunmetal: 'rgba(29, 36, 51, 0.8)',
      LIGHT_WHITE: '#E1E6EF',
      SELECTED_DROPDOWN: '#1F51E514',
      CHAT_BG_COLOR: '#08875D26',
      MIC_BG_COLOR: '#2F6FED26',
      EARNING_BG_COLOR: '#E5730B1A',
      CHAT_BORDER_COLOR: '#EDFDF8',
      MIC_BORDER_COLOR: '#F0F5FF',
      EARNING_BORDER_COLOR: '#FEF4EB',
      SECONDARY_COLOR: {
        80: 'rgba(29, 36, 51, 0.8)',
      },
      PRIMARY_COLORS: {
        100: '#F0F5FF',
      },
      PLATINUM_COLOR: '#E4E4E7',
      ORANGE: '#E5730B',
      DARK_GRAY_COLOR: '#1E1E1E',
      LIGHT_LINE_COLOR: {
        0: 'rgba(225, 230, 239, 0)',
        100: 'rgba(225, 230, 239, 1)',
      },
      GRAY_COLOR: '#757575',
      WHITE_COLOR: '#fff',
      TRANSPARENT: 'transparent',
      YELLOW_COLOR: '#FFD400',
      RED: '#E02D3C',
      GRAY31: '#4F4F4F',
      GRAY11: '#1C1C1C',
      DARK_GRAY: '#a9a9a9',
      MODAL_COLOR: '#00000080',
      MODAL_LIGHT_COLOR: 'rgba(0,0,0,0.4)',
      BLACK_OPACITY_COLOR: 'rgba(0,0,0,0.6)',
      MODAL_BG_COLOR: 'rgba(0,0,0,0.7)',
      TRANSPARENT_5: 'rgba(0,0,0,.5)',
      GREEN: '#08875D',
      CHAT_PRIMARY_COLOR: '#D9E7FC',
      CHAT_SECONDARY_COLOR: '#FFFFFF',
      NEUTRAL: {
        100: '#F8F9FC',
        200: '#F1F3F9',
        300: '#E1E6EF',
      },
      WHITE: {
        100: '#FFFFFF',
        0: 'rgba(255, 255, 255, 0)',
        20: 'rgba(255, 255, 255, 0.2)',
        40: 'rgba(255, 255, 255, 0.4)',
        50: 'rgba(255, 255, 255, 0.5)',
        60: 'rgba(255, 255, 255, 0.6)',
        80: 'rgba(255, 255, 255, 0.8)',
      },
    },
    typography: {
      fontFamily: {
        Bold: 'Lato-Bold',
        Light: 'Lato-Light',
        Black: 'Lato-Black',
        Regular: 'Lato-Regular',
        Hairline: 'Lato-Hairline',
      },
      fontWeights: {
        hairline: '100',
        thin: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
    },
    size: {
      WIDTH: Dimensions.get('window').width,
      HEIGHT: Dimensions.get('window').height,
      s2: fontResize(2),
      s3: fontResize(3),
      s4: fontResize(4),
      s6: fontResize(6),
      s8: fontResize(8),
      s10: fontResize(10),
      s12: fontResize(12),
      s14: fontResize(14),
      s16: fontResize(16),
      s18: fontResize(18),
      s20: fontResize(20),
      s22: fontResize(22),
      s24: fontResize(24),
      s26: fontResize(26),
      s28: fontResize(28),
      s30: fontResize(30),
      s32: fontResize(32),
      s34: fontResize(34),
      s36: fontResize(36),
      s38: fontResize(38),
      s40: fontResize(40),
      s42: fontResize(42),
      s44: fontResize(44),
      s46: fontResize(46),
      s48: fontResize(48),
      s50: fontResize(50),
      s60: fontResize(60),
      s70: fontResize(70),
      BUTTON_HEIGHT: fontResize(48),
      BUTTON_RADIUS: fontResize(8),
    },
  },
};
export default CONSTANTS;