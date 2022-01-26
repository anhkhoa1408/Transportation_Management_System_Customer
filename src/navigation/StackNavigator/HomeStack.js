import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../views/HomeScreen/HomeScreen';
import NotificationScreen from '../../views/NotificationScreen/NotificationScreen';
import VehicleList from '../../views/StorageScreen/VehicleList';
import PackageTemplateList from '../../views/TemplateScreen/PackageScreen/PackageTemplateList';
import EditPackage from '../../views/TemplateScreen/PackageScreen/EditPackage';

import OrderTemplateList from '../../views/TemplateScreen/OrderScreen/OrderTemplateList';
import EditOrderInfo from '../../views/TemplateScreen/OrderScreen/EditOrderInfo';
import EditOrderAddress from '../../views/TemplateScreen/OrderScreen/EditOrderAddress';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="HomeScreen">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="VehicleList" component={VehicleList} />
      <HomeStack.Screen name="Notification" component={NotificationScreen} />
      <HomeStack.Screen
        name="PackageTemplateList"
        component={PackageTemplateList}
      />
      <HomeStack.Screen name="EditPackage" component={EditPackage} />
      <HomeStack.Screen
        name="OrderTemplateList"
        component={OrderTemplateList}
      />
      <HomeStack.Screen name="EditOrderInfo" component={EditOrderInfo} />
      <HomeStack.Screen name="EditOrderAddress" component={EditOrderAddress} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
