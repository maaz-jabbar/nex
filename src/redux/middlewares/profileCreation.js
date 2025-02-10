import axios from 'axios';
import {ApiInstanceWithJWT, successToast} from '../../config/api';
import {loaderFalse, loaderTrue, saveUserProfile} from '../actions/UserActions';
import {navigate} from '../../navigation/navigationService';
import {getProfile} from './user';

export const getPositions = onSuccess => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('listing/position')
      .then(({data}) => {
        onSuccess(data?.body);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
export const getAllProducts = onSuccess => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('listing/product')
      .then(({data}) => {
        onSuccess(data?.body);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
export const getAllBrands = onSuccess => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('listing/designer')
      .then(({data}) => {
        onSuccess(data?.body);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const getPositionDetails = (id, onSuccess) => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('listing/position-details/' + id)
      .then(({data}) => {
        onSuccess(data?.body);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const getPlacesAutoComplete = async text => {
  try {
    const response = await axios.get(
      `http://api.geonames.org/searchJSON?q=${text}&maxRows=10&username=maxnada`,
    );
    return response.data?.geonames;
  } catch (error) {
    console.log('🚀 ~ getPlacesAutoComplete ~ error:', error);
    return [];
  }
};

export const createAgentProfile = (id, body) => {
  return (dispatch, getState) => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.post('profiles/agent/' + id, body)
      .then(({data}) => {
        console.log('🚀 ~ .then ~ data:', data);
        dispatch(getProfile(getState()?.user?.user));

        successToast('Profile created successfully');
        if (data?.status == 201) navigate('Congratulations');
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const createCustomerProfile = (body, success) => {
  return (dispatch, getState) => {
    const userId = getState()?.user?.user?.userId;
    dispatch(loaderTrue());
    ApiInstanceWithJWT.post('profiles/customer/' + userId, body)
      .then(({data}) => {
        console.log('🚀 ~ .then ~ data:', data);
        dispatch(getProfile(getState()?.user?.user));

        successToast('Profile created successfully');
        if (data?.status == 201) navigate('Congratulations');
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
