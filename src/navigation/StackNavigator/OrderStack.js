import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../views/HomeScreen/HomeScreen';
import NotificationScreen from '../../views/NotificationScreen/NotificationScreen';
import PackageTemplateList from '../../views/TemplateScreen/PackageScreen/PackageTemplateList';
import EditPackage from '../../views/TemplateScreen/PackageScreen/EditPackage';

import OrderTemplateList from '../../views/TemplateScreen/OrderScreen/OrderTemplateList';
import EditOrderInfo from '../../views/TemplateScreen/OrderScreen/EditOrderInfo';
import EditOrderAddress from '../../views/TemplateScreen/OrderScreen/EditOrderAddress';
import OrderHistory from '../../views/OrderScreen/OrderHistory';
import OrderDetail from '../../views/OrderScreen/OrderDetail';

const OrderStack = createStackNavigator();

const OrderStackScreen = () => {
  return (
    <OrderStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="OrderHistory">
      <OrderStack.Screen name="OrderHistory" component={OrderHistory} />
      <OrderStack.Screen name="OrderDetail" component={OrderDetail} />
    </OrderStack.Navigator>
  );
};

export default OrderStackScreen;
