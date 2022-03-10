import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../views/HomeScreen/HomeScreen';
import NotificationScreen from '../../views/NotificationScreen/NotificationScreen';
import PackageTemplateList from '../../views/TemplateScreen/PackageScreen/PackageTemplateList';
import EditPackage from '../../views/TemplateScreen/PackageScreen/EditPackage';

import OrderTemplateList from '../../views/TemplateScreen/OrderScreen/OrderTemplateList';
import EditOrderInfo from '../../views/TemplateScreen/OrderScreen/EditOrderInfo';
import EditOrderAddress from '../../views/TemplateScreen/OrderScreen/EditOrderAddress';
import InputInfo from '../../views/OrderScreen/Input/InputInfo';
import InputReceiver from '../../views/OrderScreen/Input/InputReceiver';
import InputAddress from '../../views/OrderScreen/Input/InputAddress';
import OrderSummary from '../../views/OrderScreen/OrderSummary';
import Payment from '../../views/OrderScreen/Payment';
import VoucherScreen from '../../views/VoucherScreen/VoucherScreen';
import InputPackage from '../../views/OrderScreen/Input/InputPackage';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="HomeScreen">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
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
      <HomeStack.Screen name="InputInfo" component={InputInfo} />
      <HomeStack.Screen name="InputReceiver" component={InputReceiver} />
      <HomeStack.Screen name="InputAddress" component={InputAddress} />
      <HomeStack.Screen name="OrderSummary" component={OrderSummary} />
      <HomeStack.Screen name="Payment" component={Payment} />
      <HomeStack.Screen name="VoucherScreen" component={VoucherScreen} />
      <HomeStack.Screen name="InputPackage" component={InputPackage} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
