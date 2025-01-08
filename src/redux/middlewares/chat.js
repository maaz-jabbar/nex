import {ApiInstanceWithJWT, successToast} from '../../config/api';
import {loaderFalse, loaderTrue} from '../actions/UserActions';
import {navigate} from '../../navigation/navigationService';

export const getChats = onSuccess => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('/chat/conversation')
      .then(({data}) => {
        console.log('🚀 ~ .then ~ data:', data);
        onSuccess(data);
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
        console.log('🚀 ~ .then ~ data:', data);
        onSuccess(data?.messages);
      })
      .catch(err => {
        console.log('🚀 ~ .catch ~ err:', err);
      })

      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
export const sendMessageAsync = (messageObj, onSuccess) => {
  return dispatch => {
    // dispatch(loaderTrue());
    ApiInstanceWithJWT.post('/chat/message',messageObj)
      .then(({data}) => {
        console.log('🚀 ~ .then ~ data:', data);
        onSuccess()
      })
      .catch(err => {
        console.log('🚀 ~ .catch ~ err:', err);
      })

      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
