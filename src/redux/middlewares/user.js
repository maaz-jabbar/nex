import {
  ApiInstance,
  ApiInstanceWithJWT,
  errorToast,
  successToast,
} from '../../config/api';
import {navigate} from '../../navigation/navigationService';
import {
  loaderFalse,
  loaderTrue,
  saveUser,
  saveUserContacts,
  saveUserProfile,
  saveUserType,
} from '../actions/UserActions';

export const login = (email, password) => {
  return dispatch => {
    const body = {
      email,
      password,
    };
    dispatch(loaderTrue());
    ApiInstance.post('auth/login', body)
      .then(({data}) => {
        if (data?.userId) dispatch(getUser(data));
        else errorToast({message: data?.jwt});
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
      },
    })
      .then(({data}) => {
        const user = {...data?.body, ...loginResponse};
        dispatch(saveUser(user));
        dispatch(saveUserType(data?.body?.userType));
        dispatch(getProfile(user));
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const getUserWithId = (userId, onSuccess) => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('users/' + userId)
      .then(({data}) => {
        onSuccess(data);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const getProfile = user => {
  return dispatch => {
    const isCustomer = user?.userType === 'CUSTOMER';
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get(
      (isCustomer ? 'profiles/customer/user/' : 'profiles/agent/user/') +
        user?.userId,
    )
      .then(({data}) => {
        navigate('AppStack');
        dispatch(saveUserProfile(data?.body));
        dispatch(getUserContacts(data?.body?.profileId));
      })
      .catch(err => {
        if (isCustomer) navigate('CustomerProfileCreation');
        else navigate('ProfileCreation');
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const getUserContacts = id => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('profiles/contacts/' + id)
      .then(({data}) => {
        console.log('🚀 ~ .then ~ data:', data);
        dispatch(saveUserContacts(data));
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const saveContact = (data, closeModal) => {
  return (dispatch, getState) => {
    const profileId = getState().user?.profile?.profileId;
    dispatch(loaderTrue());
    ApiInstanceWithJWT.patch('profiles/contacts/' + profileId, data)
      .then(() => {
        dispatch(getUserContacts(profileId));
      })
      .finally(() => {
        dispatch(loaderFalse());
        closeModal();
      });
  };
};

export const updateCustomer = (data, onSuccess) => {
  return (dispatch, getState) => {
    const userId = getState().user?.user?.userId;
    dispatch(loaderTrue());
    ApiInstanceWithJWT.patch('users/' + userId, data)
      .then(() => {
        dispatch(
          saveUser({
            ...getState().user?.user,
            ...data,
          }),
        );
        onSuccess();
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
export const updateSeller = (data, goBack) => {
  return (dispatch, getState) => {
    const userId = getState().user?.user?.userId;
    dispatch(loaderTrue());
    ApiInstanceWithJWT.patch('users/' + userId, data)
      .then(() => {
        dispatch(
          saveUser({
            ...getState().user?.user,
            ...data,
          }),
        );
      })
      .catch(err => {
        console.log('🚀 ~ .catch ~ err:', err.response);
      })
      .finally(() => {
        dispatch(loaderFalse());
        goBack();
      });
  };
};

export const updateCustomerProfile = (preferences, goBack) => {
  console.log('🚀 ~ updateCustomerProfile ~ preferences:', preferences);
  return (dispatch, getState) => {
    const profileId = getState().user?.profile?.profileId;
    console.log('🚀 ~ return ~ profileId:', profileId);
    dispatch(loaderTrue());
    ApiInstanceWithJWT.patch('profiles/customer/' + profileId, {
      preferences,
    })
      .then(() => {
        dispatch(
          saveUserProfile({
            ...getState().user?.profile,
            preferences,
          }),
        );
      })
      .finally(() => {
        dispatch(loaderFalse());
        goBack();
      });
  };
};
export const updateSellerProfile = (links, goBack) => {
  console.log('🚀 ~ updateSellerProfile ~ links:', links);
  return (dispatch, getState) => {
    const profileId = getState().user?.profile?.profileId;
    console.log('🚀 ~ return ~ profileId:', 'profiles/agent/' + profileId);
    dispatch(loaderTrue());
    ApiInstanceWithJWT.patch('profiles/agent/' + profileId, {
      links,
    })
      .then(() => {
        dispatch(
          saveUserProfile({
            ...getState().user?.profile,
            links,
          }),
        );
      })
      .finally(() => {
        dispatch(loaderFalse());
        goBack();
      });
  };
};
