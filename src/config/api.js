import axios from 'axios';
import Toast from 'react-native-toast-message';
import {store} from '../redux';

const baseURL = 'https://17ad-110-38-246-48.ngrok-free.app';

export const ApiInstance = axios.create({
  baseURL,
  timeout: 3000,
});

export const ApiInstanceWithJWT = axios.create({
  baseURL,
  timeout: 3000,
});

ApiInstanceWithJWT.interceptors.request.use(
  function (config) {
    const token = store.getState()?.user?.user?.jwt;
    console.log("🚀 ~ token:", token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
ApiInstanceWithJWT.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    errorToast(error);
    return Promise.reject(error);
  },
);
ApiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    errorToast(error);
    return Promise.reject(error);
  },
);

export const errorToast = err => {
  let messsage = 'Something went wrong. Please try again';
  if (err?.request?.response) {
    try {
      messsage = JSON.parse(err?.request?.response)?.error;
    } catch (_e) {
      messsage = err?.request?.response;
    }
  } else if (err?.message) {
    messsage = err?.message;
  }
  Toast.show({type: 'error', text2: messsage});
};

export const successToast = messsage => {
  Toast.show({type: 'success', text2: messsage});
};
