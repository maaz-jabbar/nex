import {ApiInstanceWithJWT} from '../../config/api';
import {
  loaderFalse,
  loaderTrue,
  saveUserBroadcasts,
  saveUserChats,
} from '../actions/UserActions';

export const getChats = (loaderStop = () => {}) => {
  return (dispatch, getState) => {
    const chatsLength = getState().user?.chats?.length;
    const user = getState().user?.user;
    const userType = getState().user?.userType;
    const isCustomer = userType === 'CUSTOMER';
    console.log('🚀 ~ getChats ~ loaderStop:');

    if (!chatsLength) dispatch(loaderTrue());
    ApiInstanceWithJWT.get('/chat/conversations/' + user?.userId)
      .then(({data}) => {
        console.log('🚀 ~ .then ~ data: chats', data);
        const filteredData = data?.filter(chat => {
          if (isCustomer) {
            return true;
          } else {
            return !chat?.broadcasted;
          }
        });

        dispatch(saveUserChats(filteredData));
      })
      .catch(err => {
        dispatch(saveUserChats([]));
      })
      .finally(() => {
        loaderStop();
        dispatch(loaderFalse());
      });
  };
};

export const getBroadcasts = (loaderStop = () => {}) => {
  return (dispatch, getState) => {
    const userId = getState().user?.user?.userId;
    const chatsLength = getState().user?.broadcasts?.length;
    if (!chatsLength) dispatch(loaderTrue());
    ApiInstanceWithJWT.get('/chat/broadcast/sender/' + userId)
      .then(({data}) => {
        console.log('🚀 ~ .then ~ data:', data);
        dispatch(saveUserBroadcasts(data));
      })
      .catch(err => {
        dispatch(saveUserBroadcasts([]));
      })
      .finally(() => {
        loaderStop();
        dispatch(loaderFalse());
      });
  };
};

export const getMessages = (conversationId, offset, onSuccess) => {
  return dispatch => {
    ApiInstanceWithJWT.get('/chat/conversation/' + conversationId)
      .then(({data}) => {
        console.log("🚀 ~ .then ~ data:", data)
        onSuccess(data?.messages);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
export const sendMessageAsync = (messageObj, onSuccess) => {
  return dispatch => {
    ApiInstanceWithJWT.post('/chat/message', messageObj).then(() => {
      onSuccess();
    });
  };
};
export const createChat = (userId, onSuccess) => {
  return (dispatch, getState) => {
    const myId = getState().user?.user?.userId;
    const allChats = getState().user?.chats;
    const alreadyPresent = allChats?.find(chat => {
      return chat?.user?.find(user => user?.userId === userId);
    });
    if (alreadyPresent) {
      onSuccess(alreadyPresent);
      return;
    }
    dispatch(loaderTrue());
    ApiInstanceWithJWT.post('/chat/conversation', [userId, myId])
      .then(({data}) => {
        onSuccess(data);
        dispatch(getChats());
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const uploadMedia = (file, onSuccess = () => null, specialId) => {
  console.log('🚀 ~ file:', file);
  return dispatch => {
    const imageId = specialId ? specialId : Date.now();
    const formdata = new FormData();
    formdata.append('file', file);
    console.log('/images/upload/' + imageId);

    dispatch(loaderTrue());
    ApiInstanceWithJWT.post('/images/upload/' + imageId, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(({data}) => {
        console.log('🚀 ~ .then ~ data:', data);
        onSuccess(imageId);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
export const uploadMediaAsync = async (file, specialId) => {
  const imageId = specialId ? specialId : Date.now();
  const formdata = new FormData();
  formdata.append('file', file);
  return ApiInstanceWithJWT.post('/images/upload/' + imageId, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(({data}) => {
    return imageId;
  });
};

export const sendBroadcast = (body, onSuccess) => {
  console.log("🚀 ~ sendBroadcast ~ body, onSuccess:", body, onSuccess)
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.post('/chat/broadcast', body)
      .then(({data}) => {
        console.log("🚀 ~ .then ~ data:", data)
        onSuccess(data);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
