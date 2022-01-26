import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { Avatar, Icon, ListItem, Switch } from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import { COLORS } from '../../styles';
import { useDispatch } from 'react-redux';
import { success, danger } from '../../styles/color';
import { connect } from 'react-redux';

const Account = ({ navigation, userInfo }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState({
    language: true,
    nightMode: false,
    notification: false,
  });

  const toggleSwitch = (e, item) => {
    setToggle({ ...toggle, [item.name]: e });
  };

  const accountList = [
    {
      title: 'Chỉnh sửa thông tin',
      icon: 'edit',
      navigate: 'EditProfile',
      color: '#CCC',
    },
    {
      title: 'Đổi mật khẩu',
      icon: 'lock',
      navigate: 'ChangePass',
      color: '#fc6603',
    },
    {
      title: 'Đăng xuất',
      icon: 'logout',
      navigate: '',
      color: danger,
    },
  ];

  const appList = [
    {
      title: 'English',
      icon: 'language',
      name: 'language',
      state: toggle.language,
      color: '#ac4ff7',
    },
    {
      title: 'Chế độ tối',
      icon: 'nightlight-round',
      name: 'nightMode',
      state: toggle.nightMode,
      color: '#000',
    },
    {
      title: 'Thông báo',
      icon: 'notifications',
      name: 'notification',
      state: toggle.notification,
      color: COLORS.primary,
    },
  ];

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          item.navigate
            ? navigation.navigate(item.navigate)
            : dispatch({ type: 'CLEAN_STORE' });
        }}
        style={{ width: '100%' }}>
        <ListItem
          containerStyle={{
            width: '100%',
            display: 'flex',
            paddingVertical: 20,
          }}
          bottomDivider>
          <View
            style={{
              backgroundColor: item.color,
              padding: 12,
              borderRadius: 20,
            }}>
            <Icon name={item.icon} color="#FFF" size={22} />
          </View>
          <ListItem.Title
            style={{
              flex: 1,
              fontSize: 18,
              marginLeft: 10,
            }}>
            {item.title}
          </ListItem.Title>

          <ListItem.Chevron size={30} />
        </ListItem>
      </TouchableOpacity>
    );
  };

  const renderAppItem = ({ item }) => {
    return (
      <View style={{ width: '100%' }}>
        <ListItem
          containerStyle={{
            width: '100%',
            display: 'flex',
            paddingVertical: 20,
          }}
          bottomDivider>
          <View
            style={{
              backgroundColor: item.color,
              padding: 12,
              borderRadius: 20,
            }}>
            <Icon name={item.icon} color="#FFF" size={22} />
          </View>
          <ListItem.Title
            style={{
              flex: 1,
              fontSize: 18,
              marginLeft: 10,
            }}>
            {item.title}
          </ListItem.Title>

          <View
            style={
              item.state
                ? [styles.switchContainer, styles.switchOn]
                : [styles.switchContainer, styles.switchOff]
            }>
            <Switch
              onValueChange={e => toggleSwitch(e, item)}
              thumbColor="#FFF"
              trackColor={{ false: '#CCC', true: success }}
              value={item.state}
            />
          </View>
        </ListItem>
      </View>
    );
  };

  const footerComponent = (
    <>
      <Text style={styles.sectionText}>Tài khoản</Text>
      <FlatList
        listKey="A"
        nestedScrollEnabled
        style={{
          width: '100%',
          paddingHorizontal: 20,
          flexGrow: 0,
          marginBottom: 20,
        }}
        keyExtractor={keyExtractor}
        data={accountList}
        renderItem={renderItem}
      />
      <Text style={styles.sectionText}>Ứng dụng</Text>
      <FlatList
        listKey="B"
        nestedScrollEnabled
        style={{
          width: '100%',
          paddingHorizontal: 20,
          flexGrow: 0,
          marginBottom: 20,
        }}
        keyExtractor={keyExtractor}
        data={appList}
        renderItem={renderAppItem}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View nestedScrollEnabled style={styles.header}>
        <Avatar
          rounded
          size="large"
          source={{
            uri: userInfo?.user?.avatar?.url,
          }}
        />
        <View style={{ marginLeft: 20, flex: 1 }}>
          <Text style={styles.smallText}>Nhân viên</Text>
          <Text style={styles.bigText}>{userInfo?.user?.name}</Text>
          <Text style={styles.statusText}>Đang làm việc</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="edit" size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.scrollContainer}
        data={[]}
        renderItem={() => null}
        ListEmptyComponent={footerComponent}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, null)(Account);

const styles = StyleSheet.create({
  container: {
    ...container,
  },
  scrollContainer: {
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 45,
    marginTop: 30,
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#000',
  },
  smallText: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  editBtn: {
    marginVertical: 20,
    marginRight: 20,
    fontSize: 20,
    color: COLORS.primary,
  },
  statusText: {
    color: success,
    fontWeight: 'bold',
    fontSize: 17,
  },
  sectionText: {
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  switchOn: {
    backgroundColor: success,
  },
  switchOff: {
    backgroundColor: '#CCC',
  },
});
