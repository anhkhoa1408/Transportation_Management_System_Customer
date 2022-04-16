// Import Component
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, Text, withBadge } from 'react-native-elements';
// Import Function
import { connect } from 'react-redux';
import Header from '../../components/Header';
import HeaderAvatar from '../../components/HeaderAvatar';
// Import Asset
import { COLORS, STYLES } from '../../styles';
import { container, shadowCard } from '../../styles/layoutStyle';
import { getAvatarFromUser, getNameFromUser } from '../../utils/avatarUltis';
import banner from './../../assets/images/customer_home.png';
import nothing_img from './../../assets/images/nothing.png';
import InfoCard from './components/InfoCard';
import { useTranslation } from 'react-i18next';
import orderApi from '../../api/orderApi';
import { convertOrderState } from '../../utils/order';
import { joinAddress, simplifyString } from '../../utils/address';
import moment from 'moment';
import BenefitSection from './components/BenefitSection';

function HomeScreen({ navigation, userInfo, noties, ...props }) {
  const [badge, setBadge] = useState(null);
  const { t, i18n } = useTranslation('common');
  const [orders, setOrders] = useState([]);
  const [awaitFeedback, setFeedbacks] = useState([]);

  const mapStateToStyle = state => {
    switch (state) {
      case 0:
        return {
          icon: 'shopping-cart',
          color: COLORS.warning,
          neutralColor: COLORS.neutralWarning,
        };
      case 1:
        return {
          icon: 'inventory',
          color: COLORS.primary,
          neutralColor: COLORS.neutralPrimary,
        };
      case 2:
        return {
          icon: 'local-shipping',
          color: COLORS.success,
          neutralColor: COLORS.neutralSuccess,
        };
      case 3:
        return {
          icon: 'storefront',
          color: COLORS.bolderGray,
          neutralColor: COLORS.gray,
        };
      case 4:
        return {
          icon: 'thumb-up-alt',
          color: COLORS.warning,
          neutralColor: COLORS.neutralWarning,
        };
      default:
        return {
          icon: 'storefront',
          color: COLORS.bolderGray,
          neutralColor: COLORS.gray,
        };
    }
  };

  useEffect(() => {
    setBadge(Badge(Object.keys(noties).length));
  }, [noties]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      let date = new Date();
      Promise.all([
        orderApi.getList({
          state_in: [0, 1, 2, 3],
        }),
        orderApi.getList({
          state: 4,
          rating_note_null: true,
          rating_point_null: true,
          updatedAt_gte: moment(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7),
          ).format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
        }),
      ])
        .then(response => {
          setOrders(
            response[0].map(item => {
              return {
                ...item,
                style: mapStateToStyle(item.state),
              };
            }),
          );
          setFeedbacks(response[1]);
        })
        .catch(error => console.log(error));
    });

    return unsubscribe;
  }, []);

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
      title: 'homeScreen.order',
      navigate: 'InputInfo',
    },
    {
      icon: 'event-available',
      title: 'homeScreen.useOrderForm',
      navigate: 'OrderTemplateList',
      useTemplate: true,
    },
    {
      icon: 'assignment',
      title: 'homeScreen.manageOrderForm',
      navigate: 'OrderTemplateList',
    },
    {
      icon: 'inventory',
      title: 'homeScreen.manageParcelSamples',
      navigate: 'PackageTemplateList',
    },
  ]);

  return (
    <>
      {/* {!listData.length && <Loading />} */}
      <SafeAreaView style={homeStyle.container}>
        <Header
          leftElement={badge}
          headerText={t('homeScreen.hello') + getNameFromUser(userInfo?.user)}
          rightElement={
            <HeaderAvatar
              url={getAvatarFromUser(userInfo?.user)}
              onPressAction={() => navigation.navigate('Account')}
            />
          }
        />

        <ScrollView
          style={{ paddingBottom: 20 }}
          contentContainerStyle={{ width: '100%', paddingBottom: 30 }}>
          {/* Banner Section */}
          <View
            style={{
              height: 250,
              paddingHorizontal: 10,
              marginVertical: 10,
            }}>
            <Image style={homeStyle.banner} source={banner} />
          </View>

          <BenefitSection />

          {/* Info Cards Section */}
          <View style={{ paddingLeft: 15 }}>
            <Text
              style={{
                marginBottom: 15,
                fontSize: 19,
                fontWeight: '800',
                letterSpacing: 1,
              }}>
              Tùy chọn
            </Text>
            <View style={homeStyle.listInfo}>
              <FlatList
                contentContainerStyle={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={listData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <InfoCard key={index} item={item} navigation={navigation} />
                )}
              />
            </View>
          </View>

          {/* Tracing section */}
          <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: '800',
                  letterSpacing: 1,
                }}>
                {t('homeScreen.tracing')}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeOrderHistory')}>
                <View
                  style={{
                    padding: 6,
                    backgroundColor: COLORS.gray,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    borderRadius: 10,
                  }}>
                  <Text style={{ fontWeight: '800' }}>
                    {t('homeScreen.detail')}
                  </Text>
                  <Icon name="chevron-right" />
                </View>
              </TouchableOpacity>
            </View>
            {orders.length ? (
              orders.map(item => {
                let { icon, neutralColor, color } = item.style;
                return (
                  <View key={item.id} style={homeStyle.trackItem}>
                    <View
                      style={[
                        homeStyle.trackItemIcon,
                        { backgroundColor: neutralColor },
                      ]}>
                      <Icon name={icon} color={color} />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        paddingLeft: 15,
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: 'bold',
                          letterSpacing: 1,
                        }}>
                        {item.name || 'Chưa đặt tên'}
                      </Text>
                      <Text
                        style={{
                          opacity: 0.5,
                        }}>
                        {t('homeScreen.to')}:{' '}
                        {simplifyString(joinAddress(item.to_address), 22)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            borderRadius: 5,
                            padding: 3,
                            marginRight: 6,
                            backgroundColor: neutralColor,
                          }}></View>
                        <Text
                          style={{
                            textAlign: 'right',
                            fontWeight: 'bold',
                            color: color,
                          }}>
                          {t(convertOrderState(item.state))}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={homeStyle.nothing}>
                <Image source={nothing_img} style={homeStyle.nothingImg} />
                <Text style={{ opacity: 0.5 }}>{t('homeScreen.noOrder')}</Text>
              </View>
            )}
          </View>

          {/* Await feedback section */}
          <View style={{ paddingHorizontal: 15, marginTop: 25 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: '800',
                  letterSpacing: 1,
                }}>
                {t('homeScreen.feedback')}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeOrderHistory')}>
                <View
                  style={{
                    padding: 6,
                    backgroundColor: COLORS.gray,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    borderRadius: 10,
                  }}>
                  <Text style={{ fontWeight: '800' }}>
                    {t('homeScreen.detail')}
                  </Text>
                  <Icon name="chevron-right" />
                </View>
              </TouchableOpacity>
            </View>

            {awaitFeedback.length ? (
              awaitFeedback.map(item => {
                let { icon, neutralColor, color } = mapStateToStyle(item.state);
                return (
                  <View key={item.id} style={homeStyle.trackItem}>
                    <View
                      style={[
                        homeStyle.trackItemIcon,
                        { backgroundColor: neutralColor },
                      ]}>
                      <Icon name={icon} color={color} />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        paddingLeft: 15,
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: 'bold',
                          letterSpacing: 1,
                        }}>
                        {item.name || 'Chưa đặt tên'}
                      </Text>
                      <Text
                        style={{
                          opacity: 0.5,
                        }}>
                        Đến: {simplifyString(joinAddress(item.to_address), 22)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            borderRadius: 5,
                            padding: 3,
                            marginRight: 6,
                            backgroundColor: neutralColor,
                          }}></View>
                        <Text
                          style={{
                            textAlign: 'right',
                            fontWeight: 'bold',
                            color: color,
                          }}>
                          {t('homeScreen.await')}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={homeStyle.nothing}>
                <Image source={nothing_img} style={homeStyle.nothingImg} />
                <Text style={{ opacity: 0.5 }}>
                  {t('homeScreen.noFeedback')}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    ...container,
  },
  listInfo: {
    width: '100%',
    height: 108,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.gray,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    zIndex: 99,
    paddingLeft: 12,
    marginBottom: 25,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    flex: 1,
    borderRadius: 20,
    marginTop: 0,
  },
  trackItem: {
    backgroundColor: '#FFF',
    elevation: 4,
    shadowColor: COLORS.primary,
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  trackItemIcon: {
    padding: 20,
    borderRadius: 15,
  },
  nothing: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nothingImg: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  noties: state.notification,
});

export default connect(mapStateToProps)(HomeScreen);
