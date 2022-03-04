import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  ListItem,
  Text,
  Icon,
  Avatar,
  Divider,
  Button,
  Overlay,
  Tab,
  TabView,
} from 'react-native-elements';
import { container, header, shadowCard } from '../../styles/layoutStyle';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import { COLORS, FONTS } from '../../styles';
import OrderIndicator from '../../components/StepIndicator/OrderIndicator';
import { InfoField } from '../../components/InfoField';
import OrderRating from './Order/OrderRating';
import Detail from './Order/Detail';
import PackageList from './Order/PakageList';
import OrderTracing from './Order/OrderTracing';
import orderApi from '../../api/orderApi';

export default function OrderDetail({ navigation, route }) {
  const [index, setIndex] = useState(0);
  const [option, setOption] = useState(false);
  const [rating, setRating] = useState(false);
  const [trace, setTrace] = useState(null);
  const [data, setData] = useState([
    {
      id: '#FOIJOJOF123',
      quantity: 10,
      current_address: 'kho Hà Nội',
    },
    {
      id: '#FOIJOJOF121',
      quantity: 10,
      current_address: 'kho Hà Nội',
    },
  ]);

  const { orderId } = route?.params || '61a982b712c1a7001641524f';

  useEffect(() => {
    // if (orderId) {
    orderApi
      .tracing('61a982b712c1a7001641524f')
      .then(response => setTrace(response))
      .catch(err => console.log(err));
    // }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText="Chi tiết"
      />

      {/* Customer info and option */}
      <View
        style={[
          styles.rowContainer,
          { paddingHorizontal: 25, position: 'relative' },
        ]}>
        <Avatar
          size="medium"
          rounded
          source={{
            uri: 'https://res.cloudinary.com/dfnoohdaw/image/upload/v1638692549/avatar_default_de42ce8b3d.png',
          }}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={[FONTS.BigBold]}>Nguyễn Anh Khoa</Text>
          <Text style={[FONTS.Smol]}>SDT: 0909145830</Text>
        </View>
        <Icon
          name="chat"
          color={COLORS.primary}
          size={30}
          containerStyle={{
            padding: 10,
            backgroundColor: '#FFF',
            elevation: 5,
            borderRadius: 15,
            marginRight: 10,
          }}
        />
        <Icon
          size={30}
          name="more-horiz"
          color={COLORS.primary}
          containerStyle={{
            padding: 10,
            backgroundColor: '#FFF',
            elevation: 5,
            borderRadius: 15,
          }}
          onPress={() => setOption(!option)}
        />
        <Overlay
          overlayStyle={{
            position: 'absolute',
            right: 25,
            top: 150,
            zIndex: 9999,
            backgroundColor: COLORS.white,
            elevation: 8,
            paddingHorizontal: 20,
            paddingVertical: 10,
            width: 220,
          }}
          backdropStyle={{
            backgroundColor: COLORS.backdropColor,
            opacity: 0.4,
          }}
          visible={option}
          onBackdropPress={() => setOption(!option)}>
          <Button
            title="Đánh giá"
            onPress={() => {
              setRating(true);
              setOption(false);
            }}
            containerStyle={[styles.btnOption]}
            buttonStyle={[{ backgroundColor: COLORS.success }]}
          />
          <Button
            title="Chỉnh sửa"
            containerStyle={[styles.btnOption]}
            buttonStyle={[{ backgroundColor: COLORS.warning }]}
          />
          <Button
            title="Huỷ đơn hàng"
            type="outline"
            containerStyle={[styles.btnOption]}
            titleStyle={[{ color: COLORS.danger }]}
            buttonStyle={[{ borderColor: COLORS.danger, borderWidth: 2 }]}
          />
        </Overlay>
      </View>

      <View style={{ padding: 20 }}>
        <Tab
          value={index}
          onChange={e => {
            setIndex(e);
          }}
          indicatorStyle={{
            height: 0,
          }}
          variant="default">
          <Tab.Item
            title=" Theo dõi"
            titleStyle={{
              fontSize: 12,
              color: COLORS.primary,
              fontWeight: 'bold',
            }}
            containerStyle={{
              backgroundColor: '#F3F3FA',
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
            buttonStyle={
              index === 0 ? [styles.activeTab] : [styles.inactiveTab]
            }
          />
          <Tab.Item
            title="Chi tiết"
            titleStyle={{
              fontSize: 12,
              color: COLORS.primary,
              fontWeight: 'bold',
            }}
            containerStyle={[
              {
                backgroundColor: '#F3F3FA',
              },
            ]}
            buttonStyle={
              index === 1 ? [styles.activeTab] : [styles.inactiveTab]
            }
          />
          <Tab.Item
            title="Kiện hàng"
            titleStyle={{
              fontSize: 12,
              color: COLORS.primary,
              fontWeight: 'bold',
            }}
            containerStyle={[
              {
                backgroundColor: '#F3F3FA',
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              },
            ]}
            buttonStyle={
              index === 2 ? [styles.activeTab] : [styles.inactiveTab]
            }
          />
        </Tab>
      </View>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item
          style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 10 }}>
          <OrderTracing current={4} trace={trace} />
        </TabView.Item>
        <TabView.Item style={{ width: '100%', paddingHorizontal: 20 }}>
          <Detail />
        </TabView.Item>
        <TabView.Item style={{ width: '100%', paddingHorizontal: 20 }}>
          <PackageList />
        </TabView.Item>
      </TabView>

      {/* Rating */}
      <OrderRating visible={rating} onSwipeComplete={() => setRating(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
    flex: 1,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 8,
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  vehicle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  btnOption: {
    marginVertical: 5,
  },
  activeTab: {
    backgroundColor: COLORS.white,
    margin: 8,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  inactiveTab: {
    backgroundColor: '#F1F1FA',
    margin: 8,
    marginHorizontal: 5,
    borderRadius: 20,
  },
});
