import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Text, ListItem } from 'react-native-elements';
import CustomSearch from '../../components/CustomSearch/CustomSearch';
import { container, header } from '../../styles/layoutStyle';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { socket } from '../../config/socketIO';
import { getAvatarFromUri, getAvatarFromUser } from '../../utils/avatarUltis';
import { formatDate } from '../../utils/dateUtils';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Header';
import HeaderAvatar from '../../components/HeaderAvatar';
import { COLORS } from '../../styles';
import { simplifyString } from '../../utils/address';

const ChatScreen = props => {
  const { t, i18n } = useTranslation('common');
  const { userInfo, messenger, navigation, customerInfo } = props;

  const [historyChatList, setHistoryChatList] = React.useState([]);

  React.useEffect(() => {
    const _historyChatList = Object.keys(customerInfo).map(room => {
      const lastMessage = messenger[room] ? messenger[room][0] : {};
      return {
        room: room,
        avatar: customerInfo[room]?.avatar,
        name: customerInfo[room]?.name,
        lastMessage: lastMessage?.text
          ? simplifyString(lastMessage.text, 25)
          : '',
        time: formatDate(lastMessage?.createdAt),
      };
    });
    setHistoryChatList([..._historyChatList]);
  }, [messenger, customerInfo]);

  const onChoose = element => {
    socket.emit('room', {
      senderId: userInfo.user.id,
      receiverId: customerInfo[element.room].id,
      roomId: element.room,
    });
    navigation.navigate('MessageScreen', {
      room: element.room,
    });
  };

  return (
    <View style={chatScreenStyle.container}>
      <Header
        headerText={t('chatScreen.message')}
        rightElement={
          <HeaderAvatar
            url={getAvatarFromUser(userInfo?.user)}
            onPressAction={() => navigation.navigate('EditProfile')}
          />
        }
      />

      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <CustomSearch />
      </View>

      <ScrollView vertical style={chatScreenStyle.chatList}>
        {historyChatList.map((element, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.5}
              onPress={() => onChoose(element)}>
              <ListItem
                underlayColor="#F0F1F5"
                containerStyle={chatScreenStyle.chatItem}>
                <Avatar
                  size="medium"
                  avatarStyle={{ borderRadius: 10 }}
                  source={{
                    uri: getAvatarFromUri(element.avatar),
                  }}
                />
                <ListItem.Content style={{ display: 'flex' }}>
                  <View>
                    <ListItem.Title>{element.name}</ListItem.Title>
                    <ListItem.Subtitle>{element.lastMessage}</ListItem.Subtitle>
                  </View>
                  <Text style={chatScreenStyle.time}>{element.time}</Text>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const chatScreenStyle = StyleSheet.create({
  container: { ...container },
  header: { ...header },
  chatItem: {
    paddingVertical: 23,
    paddingHorizontal: 20,
    marginVertical: 15,
    backgroundColor: COLORS.gray,
    borderRadius: 8,
  },
  chatList: {
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'rgba(0,0,0,0.5)',
  },
});

const mapStateToProps = state => ({
  messenger: state.messenger,
  userInfo: state.userInfo,
  customerInfo: state.customerInfo,
});

export default connect(mapStateToProps)(ChatScreen);
