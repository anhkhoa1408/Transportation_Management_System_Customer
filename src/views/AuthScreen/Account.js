import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {
  Avatar,
  Icon,
  LinearProgress,
  Slider,
  ListItem,
  Switch,
} from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import { COLORS, FONTS } from '../../styles';
import { useDispatch } from 'react-redux';
import color, { success, danger } from '../../styles/color';
import { connect } from 'react-redux';

const Account = ({ navigation, userInfo }) => {
  const [progress, setProgress] = useState(50);
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
      <View style={{ padding: 25 }}>
        <Text style={[styles.smallText, { marginBottom: 5 }]}>
          Điểm thành viên của bạn
        </Text>
        <Text style={[FONTS.Big, { marginBottom: 35, fontSize: 19 }]}>
          Bạn chỉ còn{' '}
          <Text style={[{ color: COLORS.primary, fontSize: 30 }]}>
            {100 - progress}
          </Text>{' '}
          điểm nữa để tăng lên vị trí thành viên bạc
        </Text>
        <View
          style={{
            padding: 10,
            paddingHorizontal: 20,
            elevation: 10,
            shadowColor: COLORS.primary,
            backgroundColor: '#FFF',
            borderRadius: 12,
          }}>
          <Slider
            maximumValue={100}
            minimumValue={0}
            minimumTrackTintColor={COLORS.header}
            maximumTrackTintColor="#F0F0F0"
            step={1}
            value={progress}
            onValueChange={setProgress}
            allowTouchTrack
            trackStyle={{
              height: 10,
              backgroundColor: 'transparent',
              borderRadius: 20,
            }}
            thumbStyle={{
              height: 50,
              backgroundColor: 'transparent',
            }}
            thumbProps={{
              children: (
                <View style={{ position: 'relative', alignItems: 'center' }}>
                  <Icon
                    name="room"
                    size={15}
                    reverse
                    containerStyle={{ bottom: 30 }}
                    color={COLORS.header}
                  />
                  {progress !== 100 && (
                    <Text
                      style={{ position: 'absolute', top: 45, ...FONTS.Big }}>
                      {progress}
                    </Text>
                  )}
                </View>
              ),
            }}
          />
          <Text style={{ alignSelf: 'flex-end', ...FONTS.Big }}>{100}</Text>
        </View>
      </View>
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
          <Text style={styles.smallText}>Xin chào</Text>
          <Text style={styles.bigText}>{userInfo?.user?.name}</Text>
          <Text style={[styles.statusText, { color: COLORS.warning }]}>
            Thành viên đồng
          </Text>
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
    alignItems: 'stretch',
  },
  scrollContainer: {
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginTop: 30,
    marginHorizontal: 15,
    elevation: 15,
    shadowColor: COLORS.primary,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: 20,
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
