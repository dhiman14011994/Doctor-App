import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appApiSlice from './app-api-slice';
import { authSlice } from './auth-api-slice';
import { homeSlice } from './home-api-slice';
import { chatSlice } from './chat-api-slice';
import { PaymentSlice } from './payment-api-slice';

const reducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  [homeSlice.reducerPath]: homeSlice.reducer,
  [chatSlice.reducerPath]: chatSlice.reducer,
  [PaymentSlice.reducerPath]: PaymentSlice.reducer,
  appState: appApiSlice,
});

export const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      authSlice.middleware,
      homeSlice.middleware,
      chatSlice.middleware,
      PaymentSlice.middleware
    );
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
