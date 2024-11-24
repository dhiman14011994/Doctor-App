import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {REDUCERS} from '../utils/endpoints';

const initialState = {
  isLogin: false,
  userInfo: {},
  token: '',
  isLive: false,
  userStatus: 'offline',
  screenName: 'home',
  waitData: {},
  clientCallingDetails: null,
  currentAppointmentData: null,
  candidates: '',
  isSessionRuning: false,
  sessionTimer: 0,
  isRecording: false,
};

const appStateSlice = createSlice({
  name: REDUCERS.APP,
  initialState,
  reducers: {
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setIsLive(state, action) {
      state.isLive = action.payload;
    },
    setUserStatus(state, action) {
      state.userStatus = action.payload;
    },
    setScreenName(state, action) {
      state.screenName = action.payload;
    },
    setWaitDataInfo(state, action) {
      state.waitData = action.payload;
    },
    setclientCallingDetails(state, action) {
      state.clientCallingDetails = action.payload;
    },
    setCurrentappointmentData(state, action) {
      state.currentAppointmentData = action.payload;
    },
    setCandidates(state, action) {
      state.candidates = action.payload;
    },
    setAppointmentId(state, action) {
      state.appointmentId = action.payload;
    },
    setSessionRunning(state, action) {
      state.isSessionRuning = action.payload;
    },
    setSessionTimer(state, action) {
      state.sessionTimer = action.payload;
    },
    setAudioRecording(state, action) {
      state.isRecording = action.payload;
    },
  },
});

export const {
  setIsLogin,
  setUserInfo,
  setToken,
  setIsLive,
  setUserStatus,
  setScreenName,
  setWaitDataInfo,
  setclientCallingDetails,
  setCurrentappointmentData,
  setCandidates,
  setAppointmentId,
  setSessionRunning,
  setSessionTimer,
  setAudioRecording,
} = appStateSlice.actions;
export default appStateSlice.reducer;
