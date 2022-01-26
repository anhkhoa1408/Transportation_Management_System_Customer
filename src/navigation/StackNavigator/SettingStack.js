import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../../views/AuthScreen/Account';
import EditProfile from '../../views/SettingScreen/EditProfile';
import ChangePass from '../../views/SettingScreen/ChangePass';

const SettingStack = createStackNavigator();

const SettingStackScreen = () => {
  return (
    <SettingStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="Account">
      <SettingStack.Screen name="Account" component={Account} />
      <SettingStack.Screen name="EditProfile" component={EditProfile} />
      <SettingStack.Screen name="ChangePass" component={ChangePass} />
    </SettingStack.Navigator>
  );
};

export default SettingStackScreen;
