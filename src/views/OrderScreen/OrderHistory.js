import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  VirtualizedList,
} from 'react-native';
import { Icon, Tab, TabView, Text } from 'react-native-elements';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { COLORS } from '../../styles';
import { container } from '../../styles/layoutStyle';
import orderApi from './../../api/orderApi';
import Delivered from './Delivery/Delivered';
import Delivering from './Delivery/Delivering';

export default function OrderHistory({ navigation, route }) {
  const { t, i18n } = useTranslation('common');
  const [deliveredList, setDelivered] = useState([]);
  const [deliveringList, setDelivering] = useState([]);
  const [index, setIndex] = useState(route?.params?.tab || 0);
  const [loading, setLoading] = useState(<Loading />);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Promise.all([orderApi.deliveringOrders(), orderApi.deliveredOrders()])
        .then(response => {
          setDelivering(response[0]);
          setDelivered(response[1]);
          setLoading(null);
        })
        .catch(error => {
          setLoading(null);
        });
    });

    return unsubscribe;
  }, []);

  const renderDeliveredItem = ({ item, index }) => (
    <Delivered item={item} navigation={navigation} />
  );

  const renderDeliveringItem = ({ item, index }) => (
    <Delivering item={item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading}
      <Header
        headerText={t('orderScreen.shipmenttHistory')}
        leftElement={
          route?.params?.homeNav ? (
            <Icon name="west" onPress={() => navigation.goBack()} />
          ) : null
        }
      />
      <View style={{ paddingHorizontal: 15, height: 62 }}>
        <Tab
          value={index}
          onChange={e => setIndex(e)}
          indicatorStyle={{
            height: 0,
          }}>
          <Tab.Item
            title={t('orderScreen.shipping')}
            titleStyle={{ fontSize: 12, color: COLORS.primary }}
            containerStyle={{
              backgroundColor: COLORS.gray,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
            buttonStyle={[
              { padding: 3 },
              index === 0 ? [styles.activeTab] : [styles.inactiveTab],
            ]}
          />
          <Tab.Item
            title={t('orderScreen.shipped')}
            titleStyle={{ fontSize: 12, color: COLORS.primary }}
            containerStyle={[
              {
                backgroundColor: COLORS.gray,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              },
            ]}
            buttonStyle={[
              { padding: 3 },
              index === 1 ? [styles.activeTab] : [styles.inactiveTab],
            ]}
          />
        </Tab>
      </View>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: '100%', height: '100%' }}>
          {/* <VirtualizedList
            keyboardShouldPersistTaps="always"
            initialNumToRender={3}
            data={deliveringList}
            contentContainerStyle={styles.flatContent}
            keyExtractor={item => `${item.id}`}
            getItemCount={() => deliveringList.length}
            getItem={(item, index) => {
              return item[index];
            }}
            renderItem={renderDeliveringItem}
            ListEmptyComponent={
              <View style={styles.noData}>
                <Text>{t('orderScreen.noShippingHistoryYet')}</Text>
              </View>
            }
          /> */}
          <FlatList
            keyExtractor={item => `${item.id}`}
            data={deliveringList}
            renderItem={renderDeliveringItem}
          />
        </TabView.Item>
        <TabView.Item style={{ width: '100%', height: '100%' }}>
          <VirtualizedList
            initialNumToRender={3}
            contentContainerStyle={styles.flatContent}
            data={deliveredList}
            renderItem={renderDeliveredItem}
            keyExtractor={item => `${item.id}`}
            getItemCount={() => deliveredList.length}
            getItem={(item, index) => {
              return item[index];
            }}
            ListEmptyComponent={
              <View style={styles.noData}>
                <Text>{t('orderScreen.noShipmentHistoryYet')}</Text>
              </View>
            }
          />
        </TabView.Item>
      </TabView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
    flex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  row: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatContent: {
    paddingVertical: 12,
  },
  wrapperIcon: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 25,
  },
  deliveredContainer: {
    padding: 20,
    height: 120,
    marginHorizontal: 20,
    borderRadius: 12,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: COLORS.gray,
    marginVertical: 15,
    display: 'flex',
  },
  deliveringContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#FFF',
    marginVertical: 15,
    display: 'flex',
    flexDirection: 'column',
    elevation: 10,
    shadowColor: COLORS.primary,
  },
  activeTab: {
    backgroundColor: COLORS.white,
    margin: 8,
    marginHorizontal: 5,
    borderRadius: 16,
  },
  inactiveTab: {
    backgroundColor: '#F1F1FA',
    margin: 8,
    marginHorizontal: 5,
  },
  noData: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '50%',
  },
});
