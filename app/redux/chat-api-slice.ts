import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ENDPOINTS, METHOD, REDUCERS} from '../utils/endpoints';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import CONSTANTS from '../utils/constants';
import {BaseModel} from '../models/BaseMode';
import {ChatDataProps} from '../models/FilterMode';
import {getPrefsValue} from '../utils/storage';

export const chatSlice = createApi({
  reducerPath: REDUCERS.CHAT,
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.BASE_URL,

    prepareHeaders: async (headers, {endpoint}) => {
      headers.set('Content-Type', 'application/json');
      // const token = await AsyncStorage.getItem(CONSTANTS.STORAGE.TOKEN);
      const token = getPrefsValue(CONSTANTS.STORAGE.TOKEN);
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),

  endpoints(builder) {
    return {
      getChatListApi: builder.query<BaseModel<ChatDataProps[]>, any>({
        query: params => {
          return {
            url: `${ENDPOINTS.GET_CHAT}${params}`,
            method: METHOD.GET,
          };
        },
      }),
      readMessageApi: builder.mutation({
        query: params => {
          return {
            url: `${ENDPOINTS.READ_MESSAGE}${params}`,
            method: METHOD.POST,
          };
        },
      }),
      onlineStatusApi: builder.mutation({
        query: params => {
          return {
            url: `${ENDPOINTS.ONLINE_STATUS}`,
            method: METHOD.POST,
            body: params,
          };
        },
      }),
      createCommentApi: builder.mutation({
        query: params => {
          return {
            url: `${ENDPOINTS.CREATE_COMMENT}`,
            method: METHOD.POST,
            body: params,
          };
        },
      }),
      busyUserStatusApi: builder.mutation({
        query: params => {
          return {
            url: `${ENDPOINTS.BUSY_STATUS}`,
            method: METHOD.POST,
            body: params,
          };
        },
      }),
      appointmentCallRecordingApi: builder.mutation({
        query: params => {
          return {
            url: `${ENDPOINTS.CALL_RECORDING}${params.id}`,
            method: METHOD.POST,
            body: params.data,
          };
        },
      }),
      appointmentGetCallRecordingApi: builder.mutation({
        query: params => {
          return {
            url: `${ENDPOINTS.CALL_RECORDING}${params.id}`,
            method: METHOD.GET,
          };
        },
      }),
    };
  },
});

export const {
  useLazyGetChatListApiQuery,
  useReadMessageApiMutation,
  useOnlineStatusApiMutation,
  useCreateCommentApiMutation,
  useBusyUserStatusApiMutation,
  useAppointmentCallRecordingApiMutation,
  useAppointmentGetCallRecordingApiMutation,
} = chatSlice;
