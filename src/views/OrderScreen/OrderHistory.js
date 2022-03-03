import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  Text,
  Icon,
  CheckBox,
  Tab,
  TabView,
  ListItem,
  Rating,
} from 'react-native-elements';
import { container, header, shadowCard } from '../../styles/layoutStyle';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import { danger, primary, success, warning } from '../../styles/color';
import { COLORS, FONTS } from '../../styles';
import OrderIndicator from '../../components/StepIndicator/OrderIndicator';

export default function OrderHistory({ navigation }) {
  const [deliveredList, setDelivered] = useState([
    {
      carId: '#afoqijfoasdada'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
  ]);
  const [deliveringList, setDelivering] = useState([
    {
      carId: '#afoqijfoasdada'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
  ]);
  const [index, setIndex] = useState(0);

  const renderDeliveredItem = ({ item, index }) => (
    <TouchableOpacity>
      <ListItem containerStyle={styles.deliveredContainer}>
        <ListItem.Content style={{ flex: 2 }}>
          <ListItem.Title>{item.carId}</ListItem.Title>
          <ListItem.Subtitle style={{ flex: 1 }}>
            {item.dateTime}
          </ListItem.Subtitle>
          <Text
            style={{
              ...FONTS.SmolBold,
              color: danger,
            }}>
            Đã giao vào 22 tháng 12
          </Text>
        </ListItem.Content>

        <ListItem.Content
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-end',
          }}>
          <View style={{ flex: 1 }}>
            <Icon
              size={30}
              name="inventory"
              iconStyle={{
                color: '#FFF',
              }}
              containerStyle={styles.wrapperIcon}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={[
                FONTS.Smol,
                { marginRight: 10, color: 'rgba(0,0,0,0.5)' },
              ]}>
              Đánh giá
            </Text>
            <Rating type="custom" imageSize={18} tintColor={COLORS.gray} />
          </View>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );

  const renderDeliveringItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('OrderDetail')}>
      <ListItem containerStyle={styles.deliveringContainer}>
        <ListItem.Content
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 20,
            alignItems: 'flex-start',
          }}>
          <View>
            <Icon
              size={30}
              name="inventory"
              iconStyle={{
                color: '#FFF',
              }}
              containerStyle={[
                styles.wrapperIcon,
                {
                  marginRight: 10,
                },
              ]}
            />
          </View>
          <ListItem.Content style={{ flex: 1 }}>
            <Text style={[FONTS.BigBold]}>#CSGO112200</Text>
            <Text style={[FONTS.SmolBold, { color: success }]}>
              Đang vận chuyển
            </Text>
          </ListItem.Content>
          <View>
            <Icon
              size={30}
              name="more-horiz"
              iconStyle={{
                color: '#FFF',
              }}
              containerStyle={[
                styles.wrapperIcon,
                {
                  marginRight: 10,
                  borderRadius: 10,
                },
              ]}
            />
          </View>
        </ListItem.Content>

        <View style={{ width: '110%', alignSelf: 'center' }}>
          <OrderIndicator current={3} name={'Hà Nội'} />
        </View>
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header headerText="Lịch sử gửi hàng"></Header>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: primary,
          height: 3,
        }}>
        <Tab.Item
          title="Đang vận chuyển"
          titleStyle={{ fontSize: 12, color: primary }}
          containerStyle={{
            backgroundColor: '#FFF',
          }}
        />
        <Tab.Item
          title="Đã vận chuyển"
          titleStyle={{ fontSize: 12, color: primary }}
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
            keyExtractor={item => `${item.carId}`}
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
            keyExtractor={item => `${item.carId}`}
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

      {/* {data.length == 0 && <Loading />} */}
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
    backgroundColor: primary,
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
    ...shadowCard,
    elevation: 2,
  },
});
