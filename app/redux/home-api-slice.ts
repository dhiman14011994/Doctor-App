import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ENDPOINTS, METHOD, REDUCERS} from '../utils/endpoints';
import {getPrefsValue} from '../utils/storage';
import CONSTANTS from '../utils/constants';
import {BaseModel} from '../models/BaseMode';
import {
  AppointmentProps,
  AppProps,
  BannerProps,
  BlogProps,
  InsightsProps,
  PartnerList,
  RattingDataProps,
  TestimonialsProps,
} from '../models/HomeMode';

export const homeSlice = createApi({
  reducerPath: REDUCERS.HOME,
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.BASE_URL,

    prepareHeaders: async (headers, {endpoint}) => {
      headers.set('Content-Type', 'application/json');
      const token = getPrefsValue(CONSTANTS.STORAGE.TOKEN);
      if (endpoint === 'getAllRattingApi') {
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
      getAllRattingApi: builder.query<BaseModel<RattingDataProps[]>, any>({
        query: param => {
          return {
            url: `${ENDPOINTS.RATTINGS}${param}`,
            method: METHOD.GET,
          };
        },
      }),
      getAllBlogApi: builder.query<BaseModel<BlogProps[]>, any>({
        query: params => {
          return {
            url: `${ENDPOINTS.GET_BLOG}`,
            method: METHOD.GET,
          };
        },
      }),
      getAllAppointmentsApi: builder.query<BaseModel<AppProps>, any>({
        query: params => {
          return {
            url: `${ENDPOINTS.GET_ALL_APPOINTMENTS}${params}`,
            method: METHOD.GET,
          };
        },
      }),
      getTestimonialsApi: builder.query<BaseModel<TestimonialsProps[]>, any>({
        query: params => {
          return {
            url: `${ENDPOINTS.GET_TESTIMONIALS}${params}`,
            method: METHOD.GET,
          };
        },
      }),
      getBannerApi: builder.query<BaseModel<BannerProps[]>, any>({
        query: params => {
          return {
            url: `${ENDPOINTS.GET_BANNER}`,
            method: METHOD.GET,
          };
        },
      }),
      updateApponintmentStatusApi: builder.mutation({
        query: params => {
          return {
            url: `${ENDPOINTS.UPDATE_APPOINTMENT_STATUS}${params.id}`,
            method: METHOD.POST,
            body: params,
          };
        },
      }),
      getAllAppointmentsRequestApi: builder.query<BaseModel<AppProps>, any>({
        query: () => {
          return {
            url: ENDPOINTS.GET_NEW_REQUEST,
            method: METHOD.GET,
          };
        },
      }),
      getAllTypeAppointmentsApi: builder.query<BaseModel<AppProps>, any>({
        query: params => {
          return {
            url: `${ENDPOINTS.GET_ALL_TYPE_APPOINTMENT}${params}`,
            method: METHOD.GET,
          };
        },
      }),
      createBlogApiApi: builder.mutation({
        query: params => {
          return {
            url: `${ENDPOINTS.CREATE_BLOG}`,
            method: METHOD.POST,
            body: params,
          };
        },
      }),
      getUpcomingAppointmentsApi: builder.query<BaseModel<AppProps>, any>({
        query: () => {
          return {
            url: ENDPOINTS.UPCOMING_APPOINTMENTS,
            method: METHOD.GET,
          };
        },
      }),
      getPartnerInsightsApi: builder.query<BaseModel<InsightsProps>, any>({
        query: () => {
          return {
            url: ENDPOINTS.PARTNER_INSITE,
            method: METHOD.GET,
          };
        },
      }),
      updateWaitingApponintmentStatusApi: builder.mutation({
        query: params => {
          return {
            url: `${ENDPOINTS.UPDATE_WAITING_LIST}${params.id}`,
            method: METHOD.POST,
            body: params,
          };
        },
      }),
    };
  },
});

export const {
  useGetAllRattingApiQuery,
  useLazyGetAllBlogApiQuery,
  useLazyGetAllAppointmentsApiQuery,
  useLazyGetBannerApiQuery,
  useLazyGetTestimonialsApiQuery,
  useUpdateApponintmentStatusApiMutation,
  useLazyGetAllAppointmentsRequestApiQuery,
  useLazyGetAllTypeAppointmentsApiQuery,
  useCreateBlogApiApiMutation,
  useLazyGetUpcomingAppointmentsApiQuery,
  useLazyGetPartnerInsightsApiQuery,
  useUpdateWaitingApponintmentStatusApiMutation,
} = homeSlice;
