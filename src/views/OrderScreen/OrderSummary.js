import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text, Icon, ListItem, Divider } from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import PillButton from '../../components/CustomButton/PillButton';
import { COLORS, FONTS } from '../../styles';
import OrderStep from '../../components/StepIndicator/OrderStep';
import { InfoField } from '../../components/InfoField';

const OrderSummary = ({ route, navigation }) => {
  const voucher = route?.params?.voucher;
  const payment = route?.params?.payment;

  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Vận chuyển'}
      />
      <OrderStep current={payment ? 2 : 1} />
      <Text
        style={[
          {
            textAlign: 'center',
            paddingHorizontal: 20,
            marginTop: 15,
            opacity: 0.6,
          },
        ]}>
        Xin hãy kiểm tra lại thông tin vận chuyển của đơn hàng và nhấn tiếp tục
        để tiến hành thanh toán
      </Text>
      <View style={[style.form, { flex: 1 }]}>
        <ScrollView
          persistentScrollbar
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
          style={[style.columnContainer, { flex: 1 }]}>
          <View style={[style.rowContainer, { paddingRight: 10 }]}>
            <InfoField
              title="Dự kiến"
              content="Thứ 6, 20 tháng 3"
              style={{ flex: 1 }}
            />
            <InfoField
              title="Người nhận"
              content="Albert Shober"
              style={{ flex: 1 }}
            />
          </View>
          <View style={[style.rowContainer, { paddingRight: 10 }]}>
            <InfoField
              title="Từ"
              content="183/14 Bùi Viện, Phạm Ngũ Lão, Quận 1"
              style={{ flex: 1 }}
            />
            <InfoField
              title="SDT người nhận"
              content="129090213"
              style={{ flex: 1 }}
            />
          </View>
          <View style={[style.rowContainer, { paddingRight: 10 }]}>
            <InfoField
              title="Đến"
              content="823 Pham Van Dong, Thu Duc"
              style={{ flex: 1 }}
            />
            <InfoField
              title="Tổng khối lượng"
              content="5000 kg"
              style={{ flex: 1 }}
            />
          </View>
          <View style={[style.rowContainer, { paddingRight: 10 }]}>
            <InfoField
              title="Tổng số loại hàng"
              content="3"
              style={{ flex: 1 }}
            />
            <InfoField
              title="Tổng số lượng"
              content="500"
              style={{ flex: 1 }}
            />
          </View>
          <View style={{ marginVertical: 8 }}>
            <Text style={[FONTS.BigBold]}>Phương thức thanh toán</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
              <View
                style={[
                  style.select,
                  style.rowContainer,
                  { alignItems: 'center' },
                ]}>
                <Text style={[{ flex: 1 }]}>
                  {payment ? payment : 'Nhấn để chọn'}
                </Text>
                <ListItem.Chevron size={30} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 8 }}>
            <Text style={[FONTS.BigBold]}>Mã giảm giá</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('VoucherScreen', {
                  ...route.params,
                  useVoucher: true,
                })
              }>
              <View
                style={[
                  style.select,
                  style.rowContainer,
                  { alignItems: 'center' },
                ]}>
                <Text style={[{ flex: 1 }]}>
                  {voucher ? voucher : 'Nhấn để chọn'}
                </Text>
                <ListItem.Chevron size={30} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View>
          <Divider
            style={{ marginVertical: 15 }}
            color={COLORS.primary}
            width={2}
          />
          <View style={[style.rowContainer]}>
            <Text style={[{ flex: 1 }, FONTS.Big]}>Tổng cộng</Text>
            <Text style={[FONTS.BigBold]}>1 000 000 VND</Text>
          </View>
        </View>
        <PillButton
          title="Xác nhận"
          disabled={payment ? false : true}
          buttonStyle={{ backgroundColor: COLORS.primary }}
          onPress={() => navigation.navigate('HomeScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
  },
  input: {
    padding: 15,
    backgroundColor: '#FFF',
  },
  form: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
  select: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
  },
});

export default OrderSummary;
