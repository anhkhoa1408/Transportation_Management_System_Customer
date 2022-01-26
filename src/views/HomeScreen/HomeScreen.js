// Import Component
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, FlatList } from 'react-native';
import { Card, Icon, withBadge, Text } from 'react-native-elements';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import HeaderAvatar from '../../components/HeaderAvatar';
import InfoCard from './InfoCard';
// Import Function
import { connect } from 'react-redux';
import homeAPI from '../../api/homeAPI';
// Import Asset
import styles, { STYLES, COLORS } from '../../styles';
import banner from './../../assets/images/delivery.jpg';
import { container, shadowCard } from '../../styles/layoutStyle';
import { danger, primary, success } from '../../styles/color';

function HomeScreen({ navigation, ...props }) {
  const BadgedIcon = withBadge(10)(Icon);
  const [listData, setListData] = useState([
    {
      icon: 'add',
      title: 'Đặt hàng',
      navigate: 'VehicleList',
    },
    {
      icon: 'event-available',
      title: 'Dùng mẫu đơn hàng',
      navigate: 'VehicleList',
    },
    {
      icon: 'assignment',
      title: 'Quản lý mẫu đơn hàng',
      navigate: 'OrderTemplateList',
    },
    {
      icon: 'inventory',
      title: 'Quản lý mẫu kiện hàng',
      navigate: 'PackageTemplateList',
    },
  ]);

  const [user, setUser] = useState({
    name: '',
    avatar:
      'https://res.cloudinary.com/dfnoohdaw/image/upload/v1638692549/avatar_default_de42ce8b3d.png',
  });

  const renderItem = ({ item }) => (
    <InfoCard item={item} navigation={navigation} />
  );
  const keyExtractor = (item, index) => index.toString();

  return (
    <>
      {/* {!listData.length && <Loading />} */}
      <View style={homeStyle.container}>
        <Header
          leftElement={
            <BadgedIcon
              name="notifications"
              color={COLORS.primary}
              size={30}
              onPress={() => navigation.navigate('Notification')}
            />
          }
          headerText={'Xin chào ' + user.name}
          rightElement={
            <HeaderAvatar
              url={user.avatar}
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
});

export default connect(mapStateToProps)(HomeScreen);
