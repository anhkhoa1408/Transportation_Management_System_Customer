import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Text, Tab, TabView } from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import { COLORS, FONTS } from '../../styles';
import orderApi from './../../api/orderApi';
import Delivered from './Delivery/Delivered';
import Delivering from './Delivery/Delivering';

export default function OrderHistory({ navigation }) {
  const [deliveredList, setDelivered] = useState([]);
  const [deliveringList, setDelivering] = useState([]);
  const [index, setIndex] = useState(0);
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
      <Header headerText="Lịch sử gửi hàng"></Header>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: COLORS.primary,
          height: 3,
        }}>
        <Tab.Item
          title="Đang vận chuyển"
          titleStyle={{ fontSize: 12, color: COLORS.primary }}
          containerStyle={{
            backgroundColor: '#FFF',
          }}
        />
        <Tab.Item
          title="Đã vận chuyển"
          titleStyle={{ fontSize: 12, color: COLORS.primary }}
          containerStyle={{
            backgroundColor: '#FFF',
          }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            contentContainerStyle={styles.flatContent}
            data={deliveringList}
            renderItem={renderDeliveringItem}
            keyExtractor={item => `${item.id}`}
            ListEmptyComponent={
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: '50%',
                }}>
                <Text>Chưa có lịch sử vận chuyển</Text>
              </View>
            }
          />
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            contentContainerStyle={styles.flatContent}
            data={deliveredList}
            renderItem={renderDeliveredItem}
            keyExtractor={item => `${item.id}`}
            ListEmptyComponent={
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: '50%',
                }}>
                <Text>Chưa có lịch sử vận chuyển</Text>
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
    paddingVertical: 20,
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
});
