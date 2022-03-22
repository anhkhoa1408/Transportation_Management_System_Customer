/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-get-random-values';
import { initBackgroudMessage } from './src/config/cloudMessage';
import { startSocketIO } from './src/config/socketIO';
import { Settings } from 'react-native-fbsdk-next';

Settings.initializeSDK();
startSocketIO();
initBackgroudMessage();
AppRegistry.registerComponent(appName, () => App);
