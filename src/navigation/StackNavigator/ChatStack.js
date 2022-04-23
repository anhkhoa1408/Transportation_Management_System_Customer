import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../../views/ChatScreen/ChatScreen';
import MessageScreen from '../../views/ChatScreen/MessageScreen';
import EditProfile from '../../views/SettingScreen/EditProfile';

const ChatStack = createStackNavigator();

const ChatStackScreen = () => {
  return (
    <ChatStack.Navigator
      screenOptions={routes => ({
        headerShown: false,
      })}
      initialRouteName="ChatScreen">
      <ChatStack.Screen name="ChatScreen" component={ChatScreen} />
      <ChatStack.Screen name="MessageScreen" component={MessageScreen} />
      <ChatStack.Screen name="EditProfile" component={EditProfile} />
    </ChatStack.Navigator>
  );
};

export default ChatStackScreen;
