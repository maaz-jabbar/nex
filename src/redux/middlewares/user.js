import {ApiInstance, ApiInstanceWithJWT, errorToast} from '../../config/api';
import {navigate} from '../../navigation/navigationService';
import {
  loaderFalse,
  loaderTrue,
  saveUser,
  saveUserContacts,
  saveUserProfile,
  saveUserType,
} from '../actions/UserActions';

export const sendOTP = (phone, onSuccess) => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.post('/twilio/send-otp?phoneNumber=' + phone)
      .then(({data}) => {
        console.log("🚀 ~ .then ~ data:", data)
        onSuccess(true);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const verifyOTP = (phone, otp, onSuccess) => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.post('/twilio/verify-otp?phoneNumber=' + phone + '&otp=' + otp)
      .then(({data}) => {
        console.log("🚀 ~ .then ~sss data:", data)
        onSuccess(data);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

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
    console.log("🚀 ~ body:", body)
    dispatch(loaderTrue());
    ApiInstance.post('auth/signup', body)
      .then(({data}) => {
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
        dispatch(getProfile(user, true));
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

export const getProfile = (user, isLogin = false) => {
  return dispatch => {
    const isCustomer = user?.userType === 'CUSTOMER';
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get(
      (isCustomer ? 'profiles/customer/user/' : 'profiles/agent/user/') +
        user?.userId,
    )
      .then(({data}) => {
        if(isLogin) navigate('AppStack');
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

export const getProfileExplicitly = (user, onSuccess) => {
  return dispatch => {
    const isCustomer = user?.userType === 'CUSTOMER';
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get(
      (isCustomer ? 'profiles/customer/user/' : 'profiles/agent/user/') +
        user?.userId,
    )
      .then(({data}) => {
        onSuccess(data?.body);
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
        console.log(data);
        dispatch(saveUserContacts(data));
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const getUserInvites = onSuccess => {
  return (dispatch, getState) => {
    const id = getState().user?.profile?.profileId;
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('invites/receiver/' + id)
      .then(({data}) => {
        console.log('🚀 ~ .then ~ data:', data);
        onSuccess(data.filter(i=>i.inviteStatus !== 'ACCEPTED'));
        // dispatch(saveUserContacts(data));
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const deleteInvitePerm = (senderId, receiverId, onSuccess) => {
  console.log("🚀 ~ deleteInvitePerm ~ senderId, receiverId:", senderId, receiverId)
  return (dispatch, getState) => {
    const id = getState().user?.profile?.profileId;
    const url =
      'invites/delete?senderId=' + senderId + '&receiverId=' + receiverId;
    console.log('🚀 ~ return ~ url:', url);
    dispatch(loaderTrue());
    ApiInstanceWithJWT.delete(url)
      .then(({data}) => {
        onSuccess(true);
      })
      .finally(() => {
        dispatch(getUserContacts(id));
        dispatch(loaderFalse());
      });
  };
};

export const acceptInvite = (invitationId, onSuccess) => {
  return (dispatch, getState) => {
    const id = getState().user?.profile?.profileId;
    dispatch(loaderTrue());
    ApiInstanceWithJWT.put('invites/accept/' + invitationId)
      .then(({data}) => {
        dispatch(getUserInvites(onSuccess));
        dispatch(getUserContacts(id));
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const rejectInvite = (invitationId, onSuccess) => {
  return (dispatch, getState) => {
    const id = getState().user?.profile?.profileId;
    dispatch(loaderTrue());
    ApiInstanceWithJWT.put('invites/reject/' + invitationId)
      .then(({data}) => {
        dispatch(getUserInvites(onSuccess));
        dispatch(getUserContacts(id));
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const getUserSentInvites = onSuccess => {
  return (dispatch, getState) => {
    const id = getState().user?.profile?.profileId;
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('invites/sender/' + id)
      .then(({data}) => {
        console.log('🚀 ~ .then ~ data:', data);
        onSuccess(data);
        // dispatch(saveUserContacts(data));
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const saveContact = (data, closeModal) => {
  return (dispatch, getState) => {
    const profileId = getState().user?.profile?.profileId;
    const userType = getState().user?.userType;
    const isCustomer = userType === 'CUSTOMER';
    console.log('🚀 ~ return ~ isCustomer:', isCustomer);

    const url = !isCustomer
      ? 'profiles/contacts-customer/'
      : 'profiles/contacts-agent/';

    console.log('🚀 ~ return ~ url:', url + profileId);
    dispatch(loaderTrue());
    ApiInstanceWithJWT.patch(url + profileId, data)
      .then(() => {
        dispatch(getUserContacts(profileId));
      })
      .catch(err => {
        console.log('🚀 ~ .catch ~ err:', err.response);
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

export const updateCustomerProfile = (favDesigner, goBack) => {
  return (dispatch, getState) => {
    const profileId = getState().user?.profile?.profileId;
    console.log('🚀 ~ return ~ profileId:', profileId);
    dispatch(loaderTrue());
    ApiInstanceWithJWT.patch('profiles/customer/' + profileId, {
      favDesigner,
    })
      .then(data => {
        dispatch(
          saveUserProfile({
            ...getState().user?.profile,
            favDesigner,
          }),
        );
      })
      .finally(() => {
        dispatch(loaderFalse());
        goBack();
      });
  };
};
export const updateSellerProfile = (links, bio, goBack) => {
  return (dispatch, getState) => {
    const profileId = getState().user?.profile?.profileId;

    dispatch(loaderTrue());
    ApiInstanceWithJWT.patch('profiles/agent/' + profileId, {
      bio,
      links,
    })
      .then(() => {
        dispatch(
          saveUserProfile({
            ...getState().user?.profile,
            links,
            bio
          }),
        );
      })
      .finally(() => {
        dispatch(loaderFalse());
        goBack();
      });
  };
};
