import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Touchable } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import { container, header } from '../../styles/layoutStyle';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import img from './../../assets/images/download.jpg';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SendMessageScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <View style={messagesScreenStyle.container}>
      <View style={messagesScreenStyle.header}>
        <TouchableOpacity>
          <MaterialIcon
            name="west"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text h4>Uchiha papasuker</Text>
        <Avatar
          rounded
          size="small"
          source={img}
          onPress={() => navigation.navigate('CustomerInfo')}
        />
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        placeholder="Nhập"
        textInputStyle={messagesScreenStyle.input}
      />
    </View>
  );
};

const messagesScreenStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  header: { ...header },
  input: {
    padding: 15,
    backgroundColor: '#FFF',
  },
});

export default SendMessageScreen;
