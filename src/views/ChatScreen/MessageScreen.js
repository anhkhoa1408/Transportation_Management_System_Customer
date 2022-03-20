import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Touchable } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import { header } from '../../styles/layoutStyle';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { socket } from '../../config/socketIO';
import { addMessage } from '../../actions/actions';
import { connect } from 'react-redux';
import { getAvatarFromUri } from '../../utils/avatarUltis';

const MessageScreen = props => {
  const { navigation, route, messenger, user, customerInfo } = props;
  const { room } = route.params;

  const [messages, setMessages] = useState();
  const [customer, setCustomer] = useState(customerInfo[room]);

  useEffect(() => {
    setMessages(messenger[room]);
  }, [messenger]);

  const onSend = useCallback((newMessages = []) => {
    socket.emit('chat', newMessages[0], room);

    setMessages(previousMessages => {
      props.addMessage(newMessages[0], room);
      // return GiftedChat.append(previousMessages, newMessages);
    });
  }, []);

  return (
    <View style={messagesScreenStyle.container}>
      <View style={header}>
        <TouchableOpacity>
          <MaterialIcon
            name="west"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text h4>{customer?.name}</Text>
        <Avatar
          rounded
          size="small"
          source={{ uri: getAvatarFromUri(customer?.avatar) }}
          onPress={() =>
            navigation.navigate('CustomerInfo', {
              avatar: getAvatarFromUri(customer?.avatar),
              name: customer?.name,
              phone: customer?.phone,
            })
          }
        />
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user.id,
          name: user.name,
          avatar: user.avatar?.url,
        }}
        placeholder="Nhập"
        textInputStyle={messagesScreenStyle.input}
        renderAvatar={null}
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
  input: {
    padding: 15,
    backgroundColor: '#FFF',
  },
});

const mapStateToProps = state => ({
  messenger: state.messenger,
  user: state.userInfo.user,
  customerInfo: state.customerInfo,
});

const mapDispatchToProps = dispatch => ({
  addMessage: (message, room) => dispatch(addMessage(message, room)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);
