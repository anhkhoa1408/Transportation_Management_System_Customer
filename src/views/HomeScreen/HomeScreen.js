// Import Component
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Icon, withBadge } from 'react-native-elements';
// Import Function
import { connect } from 'react-redux';
import Header from '../../components/Header';
import HeaderAvatar from '../../components/HeaderAvatar';
// Import Asset
import { COLORS, STYLES } from '../../styles';
import { container, shadowCard } from '../../styles/layoutStyle';
import { getAvatarFromUser, getNameFromUser } from '../../utils/avatarUltis';
import banner from './../../assets/images/delivery.jpg';
import InfoCard from './InfoCard';
import { useTranslation } from 'react-i18next';


function HomeScreen({ navigation, userInfo, noties, ...props }) {
  const [badge, setBadge] = useState(null);
  const { t, i18n } = useTranslation("common")

  useEffect(() => {
    setBadge(Badge(Object.keys(noties).length));
  }, [noties]);

  const Badge = totalNoties => {
    const BadgedIcon = withBadge(totalNoties)(Icon);
    return (
      <BadgedIcon
        name="notifications"
        color={COLORS.primary}
        size={30}
        onPress={() => navigation.navigate('Notification')}
      />
    );
  };

  const [listData, setListData] = useState([
    {
      icon: 'add',
      title: "homeScreen.order",
      navigate: 'InputInfo',
    },
    {
      icon: 'event-available',
      title: "homeScreen.useOrderForm",
      navigate: 'OrderTemplateList',
      useTemplate: true,
    },
    {
      icon: 'assignment',
      title: "homeScreen.manageOrderForm",
      navigate: 'OrderTemplateList',
    },
    {
      icon: 'inventory',
      title: "homeScreen.manageParcelSamples",
      navigate: 'PackageTemplateList',
    },
  ]);

  return (
    <>
      {/* {!listData.length && <Loading />} */}
      <View style={homeStyle.container}>
        <Header
          leftElement={badge}
          headerText={t("homeScreen.hello") + getNameFromUser(userInfo?.user)}
          rightElement={
            <HeaderAvatar
              url={getAvatarFromUser(userInfo?.user)}
              onPressAction={() => navigation.navigate('Account')}
            />
          }
        />

        {/* Banner Section */}
        <View
          style={{
            ...STYLES.container,
            height: '35%',
            paddingHorizontal: 10,
          }}>
          <Image style={homeStyle.banner} source={banner} />
        </View>

        {/* Info Cards Section */}
        <View style={homeStyle.listInfo}>
          {listData.map((item, index) => (
            <InfoCard key={index} item={item} navigation={navigation} />
          ))}
        </View>
      </View>
    </>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    ...container,
  },
  listInfo: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    flex: 1,
    borderRadius: 20,
    marginTop: 0,
    ...shadowCard,
  },
});

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  noties: state.notification,
});

export default connect(mapStateToProps)(HomeScreen);
