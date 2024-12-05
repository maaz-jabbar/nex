import axios from 'axios';
import {ApiInstanceWithJWT, successToast} from '../../config/api';
import {loaderFalse, loaderTrue} from '../actions/UserActions';
import {navigate} from '../../navigation/navigationService';

export const getPositions = onSuccess => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('listing/position')
      .then(({data}) => {
        console.log('🚀 ~ .then ~ data:', data);
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
    console.log('🚀 ~ getPlacesAutoComplete ~ response:', response);
    return response.data?.geonames;
  } catch (error) {
    console.log('🚀 ~ getPlacesAutoComplete ~ error:', error);
    return [];
  }
};

export const createAgentProfile = (id, body) => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.post('profiles/agent/' + id, body)
      .then(({data}) => {
        successToast('Profile created successfully');
        if (data?.status == 201) navigate('Congratulations');
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
