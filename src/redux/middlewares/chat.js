import {ApiInstanceWithJWT, successToast} from '../../config/api';
import {loaderFalse, loaderTrue, saveUserChats} from '../actions/UserActions';
import {navigate} from '../../navigation/navigationService';

export const getChats = () => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('/chat/conversation')
      .then(({data}) => {
        dispatch(saveUserChats(data));
      })
      .catch(err => {
        console.log('🚀 ~ .catch ~ err:', err);
      })

      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const getMessages = (conversationId, onSuccess) => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('/chat/conversation/' + conversationId)
      .then(({data}) => {
        onSuccess(data?.messages);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
export const sendMessageAsync = (messageObj, onSuccess) => {
  return dispatch => {
    // dispatch(loaderTrue());
    ApiInstanceWithJWT.post('/chat/message', messageObj)
      .then(({data}) => {
        onSuccess();
      })
      .finally(() => {
        dispatch(loaderFalse());
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
        dispatch(getChats())
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
