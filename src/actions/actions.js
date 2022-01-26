import * as types from './../constants/types';

export const saveInfo = (payload) => {
  return {
    type: types.SAVE_USER_INFO,
		payload: payload
  };
};

export const saveInfoSuccess = payload => {
  return {
    type: types.SAVE_USER_INFO_SUCCESS,
    payload: payload,
  };
};

export const saveInfoError = payload => {
  return {
    type: types.SAVE_USER_INFO_ERROR,
    payload: payload,
  };
};



