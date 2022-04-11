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

// For language
import { config as i18nextConfig } from './src/translation/index.js';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['EventEmitter.removeListener']);

export default function App(props) {
  //init i18next
  i18next.init(i18nextConfig);

  useEffect(() => {
    return initForegroundMessage();
  }, []);

  useEffect(() => {
    return initDeviceTokenSync();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <I18nextProvider i18n={i18next}>
          <NavigationContainer linking={linking}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Routes />
          </NavigationContainer>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}
