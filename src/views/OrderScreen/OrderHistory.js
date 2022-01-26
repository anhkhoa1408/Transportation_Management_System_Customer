import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {
  Text,
  Icon,
  CheckBox,
  Tab,
  TabView,
  ListItem,
  Rating,
} from 'react-native-elements';
import { container, header } from '../../styles/layoutStyle';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import { danger, primary, success, warning } from '../../styles/color';
import { FONTS } from '../../styles';

export default function OrderHistory({ navigation }) {
  const [data, setData] = useState([
    {
      carId: '#afoqijfoasdada'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
    {
      carId: '#bmiweopkrejgoi'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
    {
      carId: '#opkopjqwoiasdd'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
  ]);
  const [index, setIndex] = useState(0);

  const renderDeliveredItem = ({ item, index }) => (
    <TouchableOpacity>
      <ListItem
        containerStyle={{
          padding: 20,
          marginHorizontal: 20,
          borderRadius: 12,
          borderColor: 'rgba(0,0,0,0.5)',
          backgroundColor: '#F0F1F5',
          marginVertical: 15,
          display: 'flex',
        }}>
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
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.6)',
              padding: 10,
              borderRadius: 15,
              marginBottom: 5,
            }}>
            <Icon
              size={30}
              name="inventory"
              iconStyle={{
                color: '#FFF',
              }}
              containerStyle={{
                backgroundColor: primary,
                padding: 10,
                borderRadius: 25,
              }}
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
            <Rating type="custom" imageSize={18} tintColor="#F0F1F5" />
          </View>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
          // icon={{
          //   name: 'vertical-align-bottom',
          //   color: primary,
          // }}
          containerStyle={{
            backgroundColor: '#FFF',
          }}
        />
        <Tab.Item
          title="Đã vận chuyển"
          titleStyle={{ fontSize: 12, color: primary }}
          // icon={{ name: 'vertical-align-top', color: primary }}
          containerStyle={{
            backgroundColor: '#FFF',
          }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            data={[]}
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
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            data={data}
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

      {data.length == 0 && <Loading />}
    </View>
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
});
