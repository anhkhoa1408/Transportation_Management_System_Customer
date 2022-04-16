import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import HomeStackScreen from '../StackNavigator/HomeStack';
import ChatStackScreen from '../StackNavigator/ChatStack';
import SettingStackScreen from '../StackNavigator/SettingStack';
import VoucherScreen from '../../views/VoucherScreen/VoucherScreen';
import OrderStackScreen from '../StackNavigator/OrderStack';

import { COLORS } from '../../styles';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const TabNavigatior = () => {
  const { t } = useTranslation('common');
  const CustomTabBarButton = props => {
    let { iconName, name, accessibilityState } = props;
    let focused = accessibilityState.selected;
    const viewRef = useRef(null);
    useEffect(() => {
      if (focused) {
        viewRef.current.animate({
          from: {
            scale: 0.5,
            rotate: '0deg',
          },
          to: {
            scale: 1,
            rotate: '360deg',
          },
        });
      } else {
        viewRef.current.animate({
          from: {
            scale: 1.1,
            rotate: '360deg',
          },
          to: {
            scale: 1,
            rotate: '0deg',
          },
        });
      }
    });
    return (
      <TouchableOpacity {...props}>
        <Animatable.View ref={viewRef} duration={300} easing="linear">
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <Icon
              reverse={focused}
              name={iconName}
              size={25}
              type="material"
              color={focused ? COLORS.header : '#CCC'}
              reverseColor={COLORS.white}
            />
          </View>
        </Animatable.View>
        {focused ? (
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: COLORS.header,
              marginBottom: 10,
            }}>
            {name}
          </Text>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="HomeStack"
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            ...style.container,
            display: getTabBarVisibility(route),
          },
          tabBarButton: props => {
            let iconName, name;
            switch (route.name) {
              case 'Voucher':
                iconName = 'local-offer';
                name = t("navigation.voucher");
                break;
              case 'ChatStack':
                iconName = 'chat';
                name = t("navigation.chat");
                break;
              case 'HomeStack':
                iconName = 'dashboard';
                name = t("navigation.home");
                break;
              case 'OrderStack':
                iconName = 'history';
                name = t("navigation.order");
                break;
              case 'SettingStack':
                iconName = 'account-circle';
                name = t("navigation.account");
                break;
            }
            return (
              <CustomTabBarButton iconName={iconName} name={name} {...props} />
            );
          },
        };
      }}>
      <Tab.Screen name="Voucher" component={VoucherScreen} />
      <Tab.Screen name="ChatStack" component={ChatStackScreen} />
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="OrderStack" component={OrderStackScreen} />
      <Tab.Screen name="SettingStack" component={SettingStackScreen} />
    </Tab.Navigator>
  );
};

const visibleTabBarScreen = [
  'Voucher',
  'ChatScreen',
  'HomeScreen',
  'OrderHistory',
  'Account',
];

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';
  return visibleTabBarScreen.includes(routeName) ? 'flex' : 'none';
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: COLORS.white,
    height: 90,
    marginHorizontal: 15,
    bottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    elevation: 25,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabNavigatior;
