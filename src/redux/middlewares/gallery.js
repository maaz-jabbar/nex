import axios from 'axios';
import {ApiInstanceWithJWT, successToast} from '../../config/api';
import {loaderFalse, loaderTrue, saveUserProfile} from '../actions/UserActions';
import {navigate} from '../../navigation/navigationService';
import {getProfile} from './user';
import {saveGalleries} from '../actions/GalleryActions';

export const createGallery = gallery => {
  return (dispatch, getState) => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.post('galleries', gallery)
      .then(({data}) => {
        dispatch(getAgentGalleries());
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
export const putGallery = (galleryId, gallery) => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.put('galleries/' + galleryId, gallery)
      .then(({data}) => {
        dispatch(getAgentGalleries());
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
export const deleteItemsFromServerGallery = (itemId, galleryId, onSuccess) => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.delete('items/' + itemId)
      .then(({data}) => {
        dispatch(getGallery(galleryId, onSuccess));
        dispatch(getAgentGalleries());
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
export const deleteGalleryFromServer = galleryId => {
  console.log('🚀 ~ deleteGalleryFromServer ~ galleryId:', galleryId);
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.delete('galleries/' + galleryId)
      .then(({data}) => {
        dispatch(getAgentGalleries());
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
export const editItemsFromServerGallery = (
  itemId,
  galleryId,
  item,
  onSuccess,
) => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.put('items/' + itemId, item)
      .then(({data}) => {
        dispatch(getGallery(galleryId, onSuccess));
        dispatch(getAgentGalleries());
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const getGallery = (galleryId = null, onSuccess) => {
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('galleries/' + galleryId)
      .then(({data}) => {
        onSuccess(data);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const addItemsToServerGallery = (galleriId, items, onSuccess) => {
  console.log(
    '🚀 ~ addItemsToServerGallery ~ galleriId, items, onSuccess:',
    galleriId,
    items,
    onSuccess,
  );
  return dispatch => {
    dispatch(loaderTrue());
    ApiInstanceWithJWT.patch('galleries/' + galleriId + '/items', items)
      .then(({data}) => {
        onSuccess(data);
        dispatch(getAgentGalleries());
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const getAgentGalleries = (profileId = null) => {
  return (dispatch, getState) => {
    const myProfileId = getState().user?.profile?.profileId;
    dispatch(loaderTrue());
    const profileToOrder = profileId ? profileId : myProfileId;
    ApiInstanceWithJWT.get('galleries/agent/' + profileToOrder)
      .then(({data}) => {
        dispatch(saveGalleries(data));
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};

export const getCustomerGalleries = onSuccess => {
  return (dispatch, getState) => {
    const profileId = getState().user?.profile?.profileId;
    dispatch(loaderTrue());
    ApiInstanceWithJWT.get('galleries/customer/' + profileId)
      .then(({data}) => {
        onSuccess(data);
      })
      .finally(() => {
        dispatch(loaderFalse());
      });
  };
};
