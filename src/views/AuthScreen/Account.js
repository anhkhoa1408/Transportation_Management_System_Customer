import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Icon, ListItem, Slider, Switch } from 'react-native-elements';
import { connect, useDispatch } from 'react-redux';
import { COLORS, FONTS } from '../../styles';
import { danger, success } from '../../styles/color';
import { container } from '../../styles/layoutStyle';
import { getAvatarFromUser } from '../../utils/avatarUltis';

const Account = ({ navigation, userInfo }) => {
  const { t, i18n } = useTranslation('common');
  const [progress, setProgress] = useState(
    userInfo?.user?.point ? userInfo?.user?.point : 0,
  );
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState({
    language: i18n.language && i18n.language === 'en',
    nightMode: false,
  });

  const toggleSwitch = (e, item) => {
    setToggle({ ...toggle, [item.name]: e });
    if (item.name === 'language') {
      i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
    }
  };

  const accountList = [
    {
      title: t('authScreen.editInformation'),
      icon: 'edit',
      navigate: 'EditProfile',
      color: COLORS.primary,
      neutral: COLORS.neutralPrimary,
    },
    {
      title: t('authScreen.changePassword'),
      icon: 'lock',
      navigate: 'ChangePass',
      color: COLORS.warning,
      neutral: COLORS.neutralWarning,
    },
    {
      title: t('authScreen.logOut'),
      icon: 'logout',
      navigate: '',
      color: COLORS.danger,
      neutral: COLORS.neutralDanger,
    },
  ];

  const appList = [
    {
      title: t('authScreen.engLish'),
      icon: 'language',
      name: 'language',
      state: toggle.language,
      color: COLORS.purple,
      neutral: COLORS.neutralPurple
    },
    // {
    //   title: t('authScreen.darkMode'),
    //   icon: 'nightlight-round',
    //   name: 'nightMode',
    //   state: toggle.nightMode,
    //   color: '#000',
    // },
    // {
    //   title: 'Thông báo',
    //   icon: 'notifications',
    //   name: 'notification',
    //   state: toggle.notification,
    //   color: COLORS.primary,
    // },
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
            paddingVertical: 15,
          }}
          bottomDivider>
          <View
            style={{
              backgroundColor: item.neutral,
              padding: 10,
              borderRadius: 12,
            }}>
            <Icon name={item.icon} color={item.color} size={22} />
          </View>
          <ListItem.Title
            style={[
              FONTS.Medium,
              {
                flex: 1,
                marginLeft: 10,
              },
            ]}>
            {item.title}
          </ListItem.Title>

          <View style={{
            padding: 10,
            backgroundColor: COLORS.gray,
            borderRadius: 12
          }}>
            <ListItem.Chevron size={22} />
          </View>
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
            paddingVertical: 15,
          }}
          bottomDivider>
          <View
            style={{
              backgroundColor: item.neutral,
              padding: 10,
              borderRadius: 12,
            }}>
            <Icon name={item.icon} color={item.color} size={22} />
          </View>
          <ListItem.Title
            style={[
              FONTS.Medium,
              {
                flex: 1,
                marginLeft: 10,
              },
            ]}>
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
              trackColor={{ false: COLORS.gray, true: success }}
              value={item.state}
            />
          </View>
        </ListItem>
      </View>
    );
  };

  const currentState = () => {
    switch (userInfo?.user.type) {
      case 'User':
        return t('authScreen.copper');
      case 'Iron':
        return t('authScreen.silver');
      case 'Gold':
        return t('authScreen.gold');
      case 'Diamond':
        return t('authScreen.diamond');
      default:
        return t('authScreen.copper');
    }
  };

  const nextState = () => {
    switch (userInfo?.user.type) {
      case 'User':
        return t('authScreen.silver');
      case 'Iron':
        return t('authScreen.gold');
      case 'Gold':
        return t('authScreen.diamond');
      default:
        return t('authScreen.copper');
    }
  };

  const footerComponent = (
    <>
      <View style={{ padding: 25 }}>
        <Text style={[styles.smallText, { marginBottom: 5 }]}>
          {t('authScreen.yourMembershipPoints')}
        </Text>
        <Text style={[FONTS.Big, { marginBottom: 35, fontSize: 16 }]}>
          {t('authScreen.youOnlyHave')}{' '}
          <Text style={[{ color: COLORS.primary, fontSize: 25 }]}>
            {100 - progress}
          </Text>{' '}
          {t('authScreen.morePointsToIncreaseToMemberPosition')} {nextState()}
        </Text>
        <View
          style={{
            padding: 10,
            paddingHorizontal: 20,
            elevation: 10,
            shadowColor: COLORS.primary,
            backgroundColor: '#FFF',
            borderRadius: 8,
          }}>
          <Slider
            maximumValue={100}
            minimumValue={0}
            minimumTrackTintColor={COLORS.header}
            maximumTrackTintColor="#F0F0F0"
            step={1}
            value={progress}
            onValueChange={setProgress}
            disabled
            allowTouchTrack
            trackStyle={{
              height: 7,
              backgroundColor: 'transparent',
              borderRadius: 20,
            }}
            thumbStyle={{
              height: 50,
              width: 0,
              backgroundColor: 'transparent',
            }}
            thumbProps={{
              children: (
                <View style={{ position: 'relative', alignItems: 'center' }}>
                  <View
                    style={{
                      backgroundColor: COLORS.header,
                      borderRadius: 18,
                      width: 36,
                      height: 35,
                      bottom: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      {progress}
                    </Text>
                  </View>
                </View>
              ),
            }}
          />
          <Text style={{ alignSelf: 'flex-end', ...FONTS.Big }}>{100}</Text>
        </View>
      </View>
      <Text style={styles.sectionText}>{t('authScreen.account')}</Text>
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
      <Text style={styles.sectionText}>{t('authScreen.application')}</Text>
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
          avatarStyle={{
            borderRadius: 25,
          }}
          containerStyle={{
            width: 50,
            height: 50,
          }}
          source={{
            uri: getAvatarFromUser(userInfo?.user),
          }}
        />
        <View style={{ marginLeft: 20, flex: 1 }}>
          <Text style={styles.smallText}>{t('authScreen.hello')}</Text>
          <Text style={styles.bigText}>{userInfo?.user?.name}</Text>
          <Text style={[styles.statusText, { color: COLORS.warning }]}>
            {t('authScreen.member')} {currentState()}
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
    fontSize: 18,
    color: '#000',
  },
  smallText: {
    fontSize: 13,
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
    fontSize: 16,
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
    backgroundColor: COLORS.gray,
  },
});
