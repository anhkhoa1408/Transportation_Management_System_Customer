import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CLEAN_STORE } from '../constants/types';
import userInfo from './userInfo';
import messenger from './messenger';
import customerInfo from './customerInfo';
import notification from './notification';

const appReducer = combineReducers({
  userInfo,
  customerInfo,
  messenger,
  notification,
});

const rootReducer = (state, action) => {
  if (action.type === CLEAN_STORE) {
    state = undefined;
    AsyncStorage.removeItem('persist:root');
  }
  return appReducer(state, action);
};

export default rootReducer;
