import React, { useCallback, useEffect, useState, useMemo, memo } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  Linking,
} from 'react-native';
import { Text, Icon, ListItem, Divider } from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { COLORS, FONTS } from '../../styles';
import OrderStep from '../../components/StepIndicator/OrderStep';
import { InfoField } from '../../components/InfoField';
import { joinAddress, simplifyString } from './../../utils/address';
import { store } from '../../config/configureStore';
import orderApi from '../../api/orderApi';
import { v4 as uuidv4 } from 'uuid';
import { handleRequestPayment } from '../../services/momo';
import Loading from './../../components/Loading';
import ModalMess from './../../components/ModalMess';

const OrderSummary = ({ route, navigation }) => {
  const [loading, setLoading] = useState(null);
  const [alert, setAlert] = useState(null);

  const {
    voucher,
    payment,
    from_address,
    to_address,
    receiver_name,
    receiver_phone,
    packages,
    name,
  } = route?.params;

  const userInfo = store.getState().userInfo.user;

  const orderIdForMomo = useMemo(() => {
    return uuidv4();
  }, []);

  const total_weight = useMemo(() => {
    return packages.reduce(
      (total, item) => total + item.quantity * item.weight,
      0,
    );
  }, [packages]);

  const total_quantity = useMemo(() => {
    return packages.reduce(
      (total, item) => total + Number.parseInt(item.weight),
      0,
    );
  }, [packages]);

  const handleOrder = () => {
    // TODO: - calculate shipment fee
    setLoading(<Loading />);

    let payer_name = '',
      payer_phone = '';
    switch (payment.title) {
      case 'Thanh toán bởi người gửi':
        payer_name = userInfo.name;
        payer_phone = userInfo.phone;
        break;
      case 'Ví điện tử Momo':
        payer_name = userInfo.name;
        payer_phone = userInfo.phone;
        break;
      case 'Thẻ ngân hàng':
        payer_name = userInfo.name;
        payer_phone = userInfo.phone;
        break;
      case 'Thanh toán bởi người nhận':
        payer_name = receiver_name;
        payer_phone = receiver_phone;
        break;
    }

    let order = {
      sender_phone: userInfo.phone,
      sender_name: userInfo.name,
      receiver_phone,
      receiver_name,
      method: payment.value,
      fee: 1000,
      remain_fee: 1000,
      from_address,
      to_address,
      name,
      packages,
      payer_name,
      payer_phone,
    };

    orderApi
      .newOrder(order)
      .then(response => response)
      .then(response => {
        if (response) {
          let id = JSON.stringify({
            id: response.id,
          });
          if (payment.value === 'momo') {
            setLoading(null);
            return handleRequestPayment(1000, orderIdForMomo, id);
          } else {
            setLoading(null);
            setAlert({
              type: 'success',
              message: 'Đặt hàng thành công',
            });
            navigation.navigate('HomeScreen');
          }
        } else {
          setAlert({
            type: 'danger',
            message: 'Đặt hàng thất bại',
          });
        }
      })
      .catch(error => {
        console.log(error);
        setAlert({
          type: 'danger',
          message: 'Đặt hàng thất bại',
        });
      });
  };

  return (
    <SafeAreaView style={style.container}>
      {loading}
      {alert && (
        <ModalMess
          type={alert.type}
          message={alert.message}
          alert={alert}
          setAlert={setAlert}
        />
      )}
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Vận chuyển'}
      />
      <OrderStep current={payment ? 2 : 1} />

      <View style={[style.form, { flex: 1 }]}>
        <ScrollView
          persistentScrollbar
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 18 }}
          style={[style.columnContainer, { flex: 1 }]}>
          <Text
            style={[
              {
                textAlign: 'center',
                paddingHorizontal: 20,
                marginTop: 15,
                marginBottom: 25,
                opacity: 0.6,
              },
            ]}>
            Xin hãy kiểm tra lại thông tin vận chuyển của đơn hàng và nhấn xác
            nhận để tiến hành thanh toán
          </Text>
          <View style={[style.rowContainer]}>
            <InfoField
              title="Dự kiến"
              content="Thứ 6, 20 tháng 3"
              style={{ flex: 1 }}
            />
            <InfoField
              title="Người nhận"
              content={receiver_name || 'Chưa có'}
              style={{ flex: 1 }}
            />
          </View>
          <View style={[style.rowContainer]}>
            <InfoField
              title="Từ"
              content={from_address && joinAddress(from_address)}
              style={{ flex: 1 }}
            />
            <InfoField
              title="SDT người nhận"
              content={receiver_phone}
              style={{ flex: 1 }}
            />
          </View>
          <View style={[style.rowContainer]}>
            <InfoField
              title="Đến"
              content={to_address && joinAddress(to_address)}
              style={{ flex: 1 }}
            />
            <InfoField
              title="Tổng khối lượng"
              content={total_weight + ' kg'}
              style={{ flex: 1 }}
            />
          </View>
          <View style={[style.rowContainer]}>
            <InfoField
              title="Tổng số loại hàng"
              content={packages.length}
              style={{ flex: 1 }}
            />
            <InfoField
              title="Tổng số lượng"
              content={total_quantity + ' kiện'}
              style={{ flex: 1 }}
            />
          </View>
          <View style={{ marginVertical: 8 }}>
            <Text style={[FONTS.BigBold]}>Phương thức thanh toán</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Payment', route.params)}>
              <View style={[style.select, style.rowContainer]}>
                <Text style={[{ flex: 1 }]}>
                  {payment ? payment.title : 'Nhấn để chọn'}
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
              <View style={[style.select, style.rowContainer]}>
                <Text style={[{ flex: 1 }]}>
                  {voucher ? voucher : 'Nhấn để chọn'}
                </Text>
                <ListItem.Chevron size={30} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 15 }}>
          <Divider
            style={{ marginVertical: 15 }}
            color={COLORS.primary}
            width={2}
          />
          <View style={[style.rowContainer]}>
            <Text style={[{ flex: 1 }, FONTS.Big]}>Tổng cộng</Text>
            <Text style={[FONTS.BigBold]}>1 000 000 VND</Text>
          </View>
          <PrimaryButton
            title="Xác nhận"
            disabled={payment ? false : true}
            disabledStyle={{
              backgroundColor: COLORS.gray,
              color: '#FFF',
            }}
            onPress={handleOrder}
          />
        </View>
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
    padding: 15,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    borderRadius: 0,
    backgroundColor: COLORS.gray,
  },
});

export default memo(OrderSummary);
