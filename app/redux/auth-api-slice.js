import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ENDPOINTS, METHOD, REDUCERS} from '../utils/endpoints';
import {getPrefsValue} from '../utils/storage';
import CONSTANTS from '../utils/constants';

export const authSlice = createApi({
  reducerPath: REDUCERS.AUTH,
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.BASE_URL,

    prepareHeaders: async (headers, {endpoint}) => {
      if (endpoint === 'uploadFileApi') {
        headers.set('Content-Type', 'multipart/form-data');
      } else {
        headers.set('Content-Type', 'application/json');
      }

      const token = getPrefsValue(CONSTANTS.STORAGE.TOKEN);
      if (
        endpoint === 'loginApi' ||
        endpoint === 'otpVerificationApi' ||
        endpoint === 'resendCodeApi' ||
        endpoint === 'socialLoginApi' ||
        endpoint === 'getPartnerDetailsApi'
      ) {
        return headers;
      }
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),

  endpoints(builder) {
    return {
      loginApi: builder.mutation({
        query: params => {
          return {
            url: ENDPOINTS.REGISTER,
            method: METHOD.POST,
            body: params,
          };
        },
      }),
      socialLogin: builder.mutation({
        query: params => {
          return {
            url: ENDPOINTS.SOCIAL_LOGIN,
            method: METHOD.POST,
            body: params,
          };
        },
      }),
      verifyOtpApi: builder.mutation({
        query: params => {
          return {
            url: ENDPOINTS.VERIFY,
            method: METHOD.POST,
            body: params,
          };
        },
      }),
      resendOtpApi: builder.mutation({
        query: params => {
          return {
            url: ENDPOINTS.RESEND_CODE,
            method: METHOD.POST,
            body: params,
          };
        },
      }),
      createAccountApi: builder.mutation({
        query: params => {
          return {
            url: ENDPOINTS.PARTNER_ACCOUNT,
            method: METHOD.POST,
            body: params,
          };
        },
      }),
      getSpecialityApi: builder.query({
        query: params => {
          return {
            url: ENDPOINTS.GET_SPECIALITY,
            method: METHOD.GET,
          };
        },
      }),
      uploadFileApi: builder.mutation({
        query: params => {
          return {
            url: ENDPOINTS.FILE_UPLOAD,
            method: METHOD.POST,
            body: params,
          };
        },
      }),
      getPartnerDetailsApi: builder.query({
        query: params => {
          return {
            url: `${ENDPOINTS.PARTNER_DETAILS}${params}`,
            method: METHOD.GET,
          };
        },
      }),
      getUserDataApi: builder.query({
        query: params => {
          return {
            url: `${ENDPOINTS.GET_USER}${params}`,
            method: METHOD.GET,
          };
        },
      }),
      deleteUserDataApi: builder.query({
        query: params => {
          return {
            url: `${ENDPOINTS.DELETE_ACCOUNT}`,
            method: METHOD.DELETE,
          };
        },
      }),
      logoutAccountApi: builder.mutation({
        query: params => {
          return {
            url: `${ENDPOINTS.LOGOUT}`,
            method: METHOD.POST,
          };
        },
      }),
    };
  },
});

export const {
  useLoginApiMutation,
  useSocialLoginMutation,
  useVerifyOtpApiMutation,
  useResendOtpApiMutation,
  useCreateAccountApiMutation,
  useLazyGetSpecialityApiQuery,
  useUploadFileApiMutation,
  useLazyGetPartnerDetailsApiQuery,
  useLazyGetUserDataApiQuery,
  useLazyDeleteUserDataApiQuery,
  useLogoutAccountApiMutation,
} = authSlice;
