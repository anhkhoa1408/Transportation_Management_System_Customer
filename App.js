import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './src/config/configureStore';
import Routes from './src/navigation/Routes';
import { StatusBar } from 'react-native';
import linking from './src/navigation/linking';
import {
  initDeviceTokenSync,
  initForegroundMessage,
} from './src/config/cloudMessage';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['EventEmitter.removeListener']);

export default function App(props) {
  useEffect(() => {
    return initForegroundMessage();
  }, []);

  useEffect(() => {
    return initDeviceTokenSync();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer linking={linking}>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
