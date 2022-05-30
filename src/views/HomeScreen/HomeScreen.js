// Import Component
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour';
import { Icon, Text, withBadge } from 'react-native-elements';
// Import Function
import { connect } from 'react-redux';
import orderApi from '../../api/orderApi';
import Confirm from '../../components/Confirm';
import { FocusStatusBar } from '../../components/FocusStatusBar';
import Header from '../../components/Header';
import HeaderAvatar from '../../components/HeaderAvatar';
// Import Asset
import { COLORS } from '../../styles';
import { container } from '../../styles/layoutStyle';
import { getAvatarFromUser, getNameFromUser } from '../../utils/avatarUltis';
import banner from './../../assets/images/customer_home.jpg';
import BenefitSection from './components/BenefitSection';
import Feedback from './components/Feedback';
import InfoCard from './components/InfoCard';
import TracingOrder from './components/TracingOrder';

function HomeScreen({ navigation, userInfo, noties, ...props }) {
  const [badge, setBadge] = useState(null);
  const { t, i18n } = useTranslation('common');
  const [orders, setOrders] = useState([]);
  const [awaitFeedback, setFeedbacks] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [scroll, setScroll] = useState(0);
  let tourList = [];

  // Main scroll view ref
  const scrollViewRef = useRef(null);

  // Section ref
  const optionRef = useRef(null);
  const traceRef = useRef(null);
  const feedbackRef = useRef(null);

  const handleTourTarget = (ref, props) => {
    let appTourView = AppTourView.for(ref, props);
    tourList.push(appTourView);
  };

  const handleStartTour = async () => {
    setConfirm(false);
    let appTourSequence = new AppTourSequence();
    tourList.forEach((appTourTarget, index) => {
      appTourSequence.add({
        ...appTourTarget,
        key: index,
      });
    });
    AppTour.ShowSequence(appTourSequence);
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
          _limit: 5,
          _sort: 'createdAt:DESC',
        }),
        orderApi.getList({
          remain_fee: 0,
          state: 4,
          rating_note_null: true,
          rating_point_null: true,
          updatedAt_gte: moment(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7),
          ).format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
        }),
      ])
        .then(response => {
          setOrders(response[0]);
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
      tourTitle: "tour.order",
      tourSubtitle: "tour.startOrder",
    },
    {
      icon: 'event-available',
      title: 'homeScreen.useOrderForm',
      navigate: 'OrderTemplateList',
      useTemplate: true,
      tourTitle: "tour.useOrderTemplate",
      tourSubtitle:
        "tour.orderTemplateSub",
    },
    {
      icon: 'assignment',
      title: 'homeScreen.manageOrderForm',
      navigate: 'OrderTemplateList',
      tourTitle: "tour.orderTemp",
      tourSubtitle: "tour.orderTempSub",
    },
    {
      icon: 'inventory',
      title: 'homeScreen.manageParcelSamples',
      navigate: 'PackageTemplateList',
      tourTitle: "tour.packageTemp",
      tourSubtitle: "tour.packageTempSub",
    },
  ]);

  return (
    <>
      <SafeAreaView style={homeStyle.container}>
        {confirm && (
          <Confirm
            type="question"
            message={t("tour.quest")}
            onConfirm={handleStartTour}
            onCancel={() => setConfirm(null)}
          />
        )}
        <Header
          leftElement={badge}
          headerText={t('homeScreen.hello') + getNameFromUser(userInfo?.user)}
          rightElement={
            <HeaderAvatar
              url={getAvatarFromUser(userInfo?.user)}
              onPressAction={() => navigation.navigate('EditProfile')}
            />
          }
        />

        <ScrollView
          ref={scrollViewRef}
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
          <View collapsable={false} style={{ paddingLeft: 15 }} ref={optionRef}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: '800',
                  letterSpacing: 1,
                }}>
                {t('homeScreen.option')}
              </Text>
              <TouchableOpacity onPress={() => setConfirm(true)}>
                <View
                  style={{
                    padding: 6,
                    backgroundColor: COLORS.gray,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    borderRadius: 10,
                    marginRight: 15,
                  }}>
                  <Text style={{ fontWeight: '800' }}>{t('tour.tutorial')}</Text>
                  <Icon
                    type="font-awesome"
                    name="question"
                    iconStyle={{
                      fontWeight: 200,
                      fontSize: 15,
                      opacity: 0.75,
                      marginLeft: 3,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ height: 108, marginBottom: 20 }}>
              <FlatList
                contentContainerStyle={homeStyle.listInfo}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={listData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <InfoCard
                    itemKey={index}
                    item={item}
                    navigation={navigation}
                    onTour={handleTourTarget}
                  />
                )}
              />
            </View>
          </View>

          {/* Tracing section */}
          <View collapsable={false} ref={traceRef}>
            <TracingOrder orders={orders} onTour={handleTourTarget} />
          </View>

          {/* Await feedback section */}
          <View
            collapsable={false}
            ref={feedbackRef}
            onLayout={e => setScroll(e.nativeEvent.layout.y)}>
            <Feedback awaitFeedback={awaitFeedback} onTour={handleTourTarget} />
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
    height: '100%',
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    overflow: 'hidden',
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
