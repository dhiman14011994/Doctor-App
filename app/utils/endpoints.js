const ENDPOINTS = {
  // Live url
  // BASE_URL: 'https://openmindsapi.codefactstech.com/',
  BASE_URL: 'https://devapi.mindtalks.in/',
  LOGIN: 'auth/api/v1/login',
  VERIFY: 'auth/api/v1/verifyOTP',
  SOCIAL_LOGIN: 'auth/api/v1/socialLogin',
  RESEND_CODE: 'auth/api/v1/resendOTP',
  REGISTER: 'auth/api/v1/registerPartner',
  PARTNER_ACCOUNT: 'auth/api/v1/createPartnerAccount',
  DELETE_ACCOUNT: 'auth/api/v1/deleteAccount',
  LOGOUT: 'auth/api/v1/logOut',
  RATTINGS: 'listing/api/v1/rating/',
  GET_BLOG: 'listing/api/v1/blog',
  GET_ALL_APPOINTMENTS: 'appointment/api/v1/getAllAppointments',
  GET_SPECIALITY: 'listing/api/v1/getAllSpeciality',
  GET_BANNER: 'listing/api/v1/banner',
  GET_TESTIMONIALS: 'listing/api/v1/getTestimonials',
  GET_NEW_REQUEST:
    'appointment/api/v1/getAllAppointments?search=All&type=newRequest',
  UPDATE_APPOINTMENT_STATUS: 'appointment/api/v1/updateAppointmentStatus/',
  GET_ALL_TYPE_APPOINTMENT:
    'appointment/api/v1/getAllAppointments?search=All&type=',
  GET_CHAT: 'listing/api/v1/getChat/',
  READ_MESSAGE: 'appointment/api/v1/readMessages/',
  FILE_UPLOAD: 'auth/api/v1/fileUpload',
  ONLINE_STATUS: '/appointment/api/v1/onlineStatus',
  CREATE_BLOG: 'listing/api/v1/blog',
  UPCOMING_APPOINTMENTS:
    'appointment/api/v1/getUpcommingAppointments?search=All',
  PARTNER_INSITE: 'listing/api/v1/partnerInsite',
  PARTNER_DETAILS: 'listing/api/v1/getPartner/',
  CREATE_COMMENT: 'appointment/api/v1/createComment',
  BUSY_STATUS: 'auth/api/v1/busyStatus',
  UPDATE_WAITING_LIST: 'appointment/api/v1/updateWaitListAppointmentStatus/',
  GET_USER: 'listing/api/v1/getUser/',
  GET_ALL_PARTNER_TRANSACTION: 'payment/api/v1/getAllPartnerTransaction/',
  WITHDRAW_REQUEST_BY_PARTNER: 'appointment/api/v1/withdrawRequestByPartner/',
  CALL_RECORDING: 'appointment/api/v1/callRecording/',
};
// const SOCKET_URL = 'https://openmindsapi.codefactstech.com';
const SOCKET_URL = 'https://devapi.mindtalks.in';
const METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

const REDUCERS = {
  APP: 'app',
  AUTH: 'auth',
  HOME: 'home',
  CHAT: 'chat',
  PAYMENT: 'payment',
};

export {ENDPOINTS, METHOD, REDUCERS, SOCKET_URL};
