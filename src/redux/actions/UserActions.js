export const saveUserType = userType => {
  return {
    type: 'SAVE_USER_TYPE',
    payload: userType,
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
