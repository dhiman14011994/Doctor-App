import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS, METHOD, REDUCERS } from '../utils/endpoints';
import { getPrefsValue } from '../utils/storage';
import CONSTANTS from '../utils/constants';
import { BaseModel } from '../models/BaseMode';

export const PaymentSlice = createApi({
  reducerPath: REDUCERS.PAYMENT,
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.BASE_URL,

    prepareHeaders: async (headers, { endpoint }) => {
      headers.set('Content-Type', 'application/json');
      const token = getPrefsValue(CONSTANTS.STORAGE.TOKEN);
      if (endpoint === 'getAllCategoriesApi') {
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
      getAllPartnerTransaction: builder.query<BaseModel<void>, any>({
        query: params => {
          return {
            url: `${ENDPOINTS.GET_ALL_PARTNER_TRANSACTION}${params.id}?page=1&limit=10`,
            method: METHOD.GET,
          };
        },
      }),
      withdrawRequestByPartner: builder.mutation<BaseModel<void>, any>({
        query: params => {
          return {
            url: `${ENDPOINTS.WITHDRAW_REQUEST_BY_PARTNER}`,
            method: METHOD.POST,
            body: params,
          };
        },
      }),
    };
  },
});

export const { useLazyGetAllPartnerTransactionQuery, useWithdrawRequestByPartnerMutation } = PaymentSlice;

