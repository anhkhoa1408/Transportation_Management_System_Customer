import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import {
  Text,
  Icon,
  Avatar,
  Button,
  Overlay,
  Tab,
  TabView,
} from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import { COLORS, FONTS } from '../../styles';
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
  const { item } = route?.params;

  useEffect(() => {
    if (item.id) {
      orderApi
        .tracing(item.id)
        .then(response => setTrace(response))
        .catch(err => console.log(err));
    }
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
          <Text style={[FONTS.BigBold]}>{item.sender_name}</Text>
          <Text style={[FONTS.Smol]}>{item.sender_phone}</Text>
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
            justifyContent: 'center',
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
            justifyContent: 'center',
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

      {/* Tab view */}
      <View style={{ paddingHorizontal: 20, height: 62, marginVertical: 20 }}>
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
            title="Chi tiết"
            titleStyle={{
              fontSize: 12,
              color: COLORS.primary,
              fontWeight: 'bold',
            }}
            containerStyle={[
              {
                backgroundColor: COLORS.gray,
              },
            ]}
            buttonStyle={[
              { padding: 3 },
              index === 1 ? [styles.activeTab] : [styles.inactiveTab],
            ]}
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
                backgroundColor: COLORS.gray,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              },
            ]}
            buttonStyle={[
              { padding: 3 },
              index === 2 ? [styles.activeTab] : [styles.inactiveTab],
            ]}
          />
        </Tab>
      </View>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item
          style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 10 }}>
          <OrderTracing current={item.state} trace={trace} />
        </TabView.Item>
        <TabView.Item style={{ width: '100%', paddingHorizontal: 20 }}>
          <Detail item={item} />
        </TabView.Item>
        <TabView.Item style={{ width: '100%', paddingHorizontal: 20 }}>
          <PackageList item={item} />
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
    borderRadius: 16,
  },
  inactiveTab: {
    backgroundColor: '#F1F1FA',
    margin: 8,
    marginHorizontal: 5,
    borderRadius: 20,
  },
});
