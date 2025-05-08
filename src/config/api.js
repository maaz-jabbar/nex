import axios from 'axios';
import Toast from 'react-native-toast-message';
import {store} from '../redux';
import {getUser} from '../redux/middlewares/user';

// export const baseURL = 'https://888d-39-35-214-166.ngrok-free.app'; //ngrok
// export const baseURL = 'http://18.227.107.142'; //uat
export const baseURL = 'http://110.93.217.235:9092'; // staging

export const ApiInstance = axios.create({
  baseURL,
  timeout: 30000,
});

export const ApiInstanceWithJWT = axios.create({
  baseURL,
  timeout: 30000,
});

ApiInstanceWithJWT.interceptors.request.use(
  function (config) {
    const token = store.getState()?.user?.user?.accessToken;
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
    const originalRequest = error.config;
    console.log("🚀 ~ originalRequest:", originalRequest)
    const {accessToken, refreshToken} = store.getState()?.user?.user;
    if (error.status == 403) {
      console.log('refreshing')
      return ApiInstance.post('/auth/refresh-token', undefined, {
        headers: {
          'auth-token': accessToken,
          'refresh-token': refreshToken,
        },
      })
        .then(({data}) => {
          console.log("🚀 ~ .then ~ data:", data)
          store.dispatch(getUser(data, false));
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return ApiInstance.request(originalRequest);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    } else {
      if (
        (error?.request?.responseURL?.includes('profiles/') ||
          error?.request?.responseURL?.includes('invites/') ||
          error?.request?.responseURL?.includes('contacts/') ||
          error?.request?.responseURL?.includes('chat/')) &&
        error?.request?._method === 'GET'
      ) {
      } else {
        errorToast(error);
      }
      return Promise.reject(error);
    }
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
