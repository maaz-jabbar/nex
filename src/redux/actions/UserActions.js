export const saveUserType = userType => {
  return {
    type: 'SAVE_USER_TYPE',
    payload: userType,
  };
};
export const saveUserProfile = profile => {
  return {
    type: 'SAVE_USER_PROFILE',
    payload: profile,
  };
};

export const saveUser = user => {
  return {
    type: 'SAVE_USER',
    payload: user,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const loaderTrue = () => {
  return {
    type: 'LOADER_TRUE',
  };
};

export const loaderFalse = () => {
  return {
    type: 'LOADER_FALSE',
  };
};

export const saveUserContacts = contacts => {
  return {
    type: 'SAVE_USER_CONTACTS',
    payload: contacts,
  };
};

export const saveUserChats = chats => {
  return {
    type: 'SAVE_USER_CHATS',
    payload: chats,
  };
};