import {ApiInstance, ApiInstanceWithJWT, errorToast, successToast} from '../../config/api';
import {navigate} from '../../navigation/navigationService';
import {
  loaderFalse,
  loaderTrue,
  saveUser,
  saveUserType,
} from '../actions/UserActions';

export const login = (email, password) => {
  return dispatch => {
    const body = {
      email,
      password,
    };
    console.log('🚀 ~ login ~ body:', body);
    dispatch(loaderTrue());
    ApiInstance.post('auth/login', body)
      .then(({data}) => {
        dispatch(getUser(data));
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const signup = (
  fullName,
  mobileNumber,
  email,
  password,
  userType,
  onSuccess,
) => {
  return dispatch => {
    const body = {
      fullName,
      email,
      mobileNumber,
      password,
      userType,
    };
    dispatch(loaderTrue());
    ApiInstance.post('auth/signup', body)
      .then(({data}) => {
        successToast('Registered Successfully, Please login now.');
        onSuccess();
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

const getUser = loginResponse => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstance.get('users/' + loginResponse?.userId, {
      headers: {
        Authorization: `Bearer ${loginResponse?.jwt}`,
      }
    })
      .then(({data}) => {
        dispatch(saveUser({...data?.body, ...loginResponse}));
        dispatch(saveUserType(data?.body?.userType));
        if (data?.body?.userType === 'CUSTOMER') navigate('CustomerProfileCreation');
        else navigate('ProfileCreation');
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
