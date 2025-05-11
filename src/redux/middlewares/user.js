import {
  ApiInstance,
  ApiInstanceWithJWT,
  errorToast,
  successToast,
} from '../../config/api';
import {navigate, resetStack} from '../../navigation/navigationService';
import {
  loaderFalse,
  loaderTrue,
  saveUser,
  saveUserContacts,
  saveUserProfile,
  saveUserType,
} from '../actions/UserActions';

export const unmaskPhoneNumber = phone => {
  let unmaskedPhone = phone
    ?.replace(/\s/g, '')
    .replace(/[()]/g, '')
    .replace(/-/g, '');
  return unmaskedPhone?.includes('+1') ? unmaskedPhone : '+1' + unmaskedPhone;
};

export const sendOTP = (phone, email, onSuccess) => {
  return dispatch => {
    let unmaskedPhone = unmaskPhoneNumber(phone);
    dispatch(loaderTrue());
    const url =
      '/auth/send-otp?mobileNumber=' + unmaskedPhone + '&email=' + email;
    console.log('🚀 ~ sendOTP ~ url:', url);
    ApiInstance.post(url)
      .then(({data}) => {
        onSuccess(data);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
export const sendInvite = (phone, link = 'https://google.com/') => {
  return dispatch => {
    dispatch(loaderTrue());
    let unmaskedPhone = unmaskPhoneNumber(phone);
    ApiInstanceWithJWT.post(`/twilio/send-invites?inviteLink=${link}`, [
      unmaskedPhone,
    ])
      .then(({data}) => {
        successToast('Invite sent successfully');
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const verifyOTP = (phone, otp, onSuccess) => {
  console.log('🚀 ~ verifyOTP ~ phone, otp, onSuccess:', phone, otp, onSuccess);
  let unmaskedPhone = unmaskPhoneNumber(phone);
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstance.post(
      '/auth/verify-otp?phoneNumber=' + unmaskedPhone + '&otp=' + otp,
    )
      .then(({data}) => {
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
        else errorToast({message: data?.message});
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const forgotPassSendOtp = (phone, onSuccess) => {
  return dispatch => {
    let unmaskedPhone = unmaskPhoneNumber(phone);
    dispatch(loaderTrue());
    ApiInstance.post(`auth/forgot-password/${unmaskedPhone}`)
      .then(({data}) => {
        onSuccess(true);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const resetPassword = (phone, otp, newPassword, onSuccess) => {
  return dispatch => {
    let unmaskedPhone = unmaskPhoneNumber(phone);
    console.log("🚀 ~ resetPassword ~ unmaskedPhone:", unmaskedPhone)
    dispatch(loaderTrue());
    ApiInstance.post(
      `auth/reset-password?mobileNumber=${unmaskedPhone}&otp=${otp}&newPassword=${newPassword}`,
    )
      .then(({data}) => {
        successToast(data?.message || 'Password reset successfully');
        onSuccess(true);
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
    let unmaskedPhone = unmaskPhoneNumber(mobileNumber);
    const body = {
      fullName,
      email,
      mobileNumber: unmaskedPhone,
      password,
      userType,
    };
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

export const getUser = (loginResponse, isLogin = true) => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstance.get('users/' + loginResponse?.userId, {
      headers: {
        Authorization: `Bearer ${loginResponse?.accessToken}`,
      },
    })
      .then(({data}) => {
        const user = {...data?.body, ...loginResponse};
        dispatch(saveUser(user));
        dispatch(saveUserType(data?.body?.userType));
        if (isLogin) dispatch(getProfile(user, isLogin));
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
        if (isLogin) navigate('AppStack');
        dispatch(saveUserProfile(data?.body));
        dispatch(getUserContacts(data?.body?.profileId));
      })
      .catch(err => {
        if (isCustomer) resetStack('CustomerProfileCreation');
        else resetStack('ProfileCreation');
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const getProfileExplicitly = (
  user,
  onSuccess,
  setLoader = () => {},
  loaderNeeded = true,
) => {
  return dispatch => {
    const isCustomer = user?.userType === 'CUSTOMER';
    if (loaderNeeded) dispatch(loaderTrue());
    ApiInstanceWithJWT.get(
      (isCustomer ? 'profiles/customer/user/' : 'profiles/agent/user/') +
        user?.userId,
    )
      .then(({data}) => {
        onSuccess(data?.body);
      })
      .finally(() => {
        dispatch(loaderFalse());
        setLoader(false);
      });
  };
};

export const getUserContacts = id => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('profiles/contacts/' + id)
      .then(({data}) => {
        console.log('new contacts', data);
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
        onSuccess(data.filter(i => i.inviteStatus !== 'ACCEPTED'));
        // dispatch(saveUserContacts(data));
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const deleteInvitePerm = (senderId, receiverId, onSuccess) => {
  console.log(
    '🚀 ~ deleteInvitePerm ~ senderId, receiverId:',
    senderId,
    receiverId,
  );
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
    const url = 'invites/delete/' + invitationId
    console.log("🚀 ~ return ~ url:", url)
    ApiInstanceWithJWT.delete(url)
      .then(({data}) => {
        onSuccess()
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
        onSuccess(data);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const saveContact = (data, closeModal) => {
  console.log('🚀 ~ saveContact ~ data:', data);
  return (dispatch, getState) => {
    const profileId = getState().user?.profile?.profileId;
    const userType = getState().user?.userType;
    const isCustomer = userType === 'CUSTOMER';

    const url = !isCustomer
      ? 'profiles/contacts-customer/'
      : 'profiles/contacts-agent/';

    console.log('🚀 ~ return ~ url:', url + profileId, data);
    dispatch(loaderTrue());
    ApiInstanceWithJWT.patch(url + profileId, data)
      .then(({data}) => {
        console.log('🚀 ~ add contact .then ~ data:', data);
        successToast('Contact invited successfully');
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
      .then(don => {
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

export const getCustomerBasedOnSearch = (query, onSuccess) => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('profiles/customer/search?term=' + query)
      .then(({data}) => {
        onSuccess(data);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        dispatch(loaderFalse());
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
            bio,
          }),
        );
      })
      .finally(() => {
        dispatch(loaderFalse());
        goBack();
      });
  };
};
