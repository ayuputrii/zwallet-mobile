import Axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_PIN_REQUEST,
  REGISTER_PIN_SUCCESS,
  REGISTER_PIN_FAILED,
  REG_RES_REQUEST,
  REG_RES_SUCCESS,
  REG_RES_FAILED,
} from '../Type/Register';
import {URI} from '../../utils';
import {ToastAndroid} from 'react-native';

// Register
export const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

export const registerSuccess = (message) => {
  return {
    type: REGISTER_SUCCESS,
    payload: message,
  };
};

export const registerFailed = (message) => {
  return {
    type: REGISTER_FAILED,
    payload: message,
  };
};

export const signup = (data) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const res = await Axios.post(`${URI}/auth/register`, data);
    ToastAndroid.show('Registrasi Success', ToastAndroid.LONG);
    dispatch(registerSuccess(res.data.message));
  } catch (error) {
    ToastAndroid.show('Failed Registration', ToastAndroid.LONG);
    dispatch(registerFailed(error.message));
  }
};

// Reg Pin
export const AuthPinRequest = () => {
  return {
    type: REGISTER_PIN_REQUEST,
  };
};

export const AuthPinSuccess = (message) => {
  return {
    type: REGISTER_PIN_SUCCESS,
    payload: message,
  };
};

export const AuthPinError = (message) => {
  return {
    type: REGISTER_PIN_FAILED,
    payload: message,
  };
};
export const regPin = (data) => async (dispatch) => {
  dispatch(AuthPinRequest());
  try {
    const res = await Axios.patch(`${URI}/auth/createpin`, data);
    ToastAndroid.show('Registrasi Pin Success', ToastAndroid.LONG);
    dispatch(AuthPinSuccess(res.data.message));
  } catch (error) {
    ToastAndroid.show('Failed Register Pin ', ToastAndroid.LONG);
    dispatch(AuthPinError(error.message));
  }
};

// Reset Password
export const AuthResetRequest = () => {
  return {
    type: REG_RES_REQUEST,
  };
};

export const AuthResetSuccess = (message) => {
  return {
    type: REG_RES_SUCCESS,
    payload: message,
  };
};

export const AuthResetError = (message) => {
  return {
    type: REG_RES_FAILED,
    payload: message,
  };
};
export const RegisterPassword = (data) => async (dispatch) => {
  dispatch(AuthResetRequest());
  try {
    const res = await Axios.patch(`${URI}/auth/resetpassword`, data.data);
    ToastAndroid.show('Reset Success', ToastAndroid.LONG);
    dispatch(AuthResetSuccess(res.data.message));
  } catch (error) {
    ToastAndroid.show('Failed Reset Password ', ToastAndroid.LONG);
    dispatch(AuthResetError(error.message));
  }
};
