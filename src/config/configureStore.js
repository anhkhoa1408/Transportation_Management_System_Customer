import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
// import createSagaMiddleware from 'redux-saga';
import reducer from './../reducers/index';
// import rootSaga from '../saga/index.js';
import { createStore } from 'redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const pReducer = persistReducer(persistConfig, reducer);

// const sagaMiddleware = createSagaMiddleware({
//   onError: () => {
//     console.log('error');
//   },
// });

const store = createStore(pReducer);
const persistor = persistStore(store);

// sagaMiddleware.run(rootSaga);

export { store, persistor };
