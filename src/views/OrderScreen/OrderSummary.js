import React, { memo, useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider, Icon, ListItem, Text } from 'react-native-elements';
import { v4 as uuidv4 } from 'uuid';
import orderApi from '../../api/orderApi';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import Header from '../../components/Header';
import { InfoField } from '../../components/InfoField';
import OrderStep from '../../components/StepIndicator/OrderStep';
import { store } from '../../config/configureStore';
import { handleRequestPayment } from '../../services/momo';
import { COLORS, FONTS } from '../../styles';
import { container } from '../../styles/layoutStyle';
import { formatCash } from '../../utils/order';
import Loading from './../../components/Loading';
import ModalMess from './../../components/ModalMess';
import { joinAddress } from './../../utils/address';
import { useTranslation } from 'react-i18next';

const OrderSummary = ({ route, navigation }) => {
  const { t, i18n } = useTranslation("common")
  const [loading, setLoading] = useState(null);
  const [alert, setAlert] = useState(null);
  const [fee, setFee] = useState(1000000);
  const initialFee = 1000000;

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
      (total, item) => total + Number.parseInt(item.quantity),
      0,
    );
  }, [packages]);

  const handleOrder = () => {
    // TODO: - calculate shipment fee service
    setLoading(<Loading />);
    let payer_name = '',
      payer_phone = '';

    switch (payment.title) {
      case t("orderScreen.payBySender"):
        payer_name = userInfo.name;
        payer_phone = userInfo.phone;
        break;
      case t("orderScreen.momoE-wallet"):
        payer_name = userInfo.name;
        payer_phone = userInfo.phone;
        break;
      case t("orderScreen.bankCard"):
        payer_name = userInfo.name;
        payer_phone = userInfo.phone;
        break;
      case t("orderScreen.payByReceiver"):
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
      fee: fee,
      remain_fee: fee,
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
          setLoading(null);
          let id = JSON.stringify({
            id: response.id,
          });
          if (payment.value === 'momo') {
            return handleRequestPayment(1000, orderIdForMomo, id);
          } else {
            setAlert({
              type: 'success',
              message: t("orderScreen.ordersuccess"),
              btnText: t("orderScreen.goToHomepage"),
            });
            if (alert) navigation.navigate('HomeScreen');
          }
        } else {
          setAlert({
            type: 'danger',
            message: t("orderScreen.orderFailed"),
          });
        }
      })
      .catch(error => {
        console.log(error);
        setAlert({
          type: 'danger',
          message: t("orderScreen.orderFailed"),
        });
        setLoading(null);
      });
  };

  const setAlertDeco = _alert => {
    setAlert(_alert);
    if (alert.type === 'success') navigation.navigate('HomeScreen');
  };

  useEffect(() => {
    if (voucher && voucher.data) {
      let { sale_type, sale, sale_max } = voucher.data;
      let tempFee = initialFee;
      if (sale_type === 'value') {
        if (tempFee > sale) {
          tempFee = tempFee - sale;
        }
      } else if (sale_type === 'percentage') {
        let discount = tempFee - (tempFee * sale) / 100;
        if (discount > sale_max) {
          discount = sale_max;
        }
        tempFee = tempFee - discount;
      }
      setFee(tempFee);
    }
  }, [voucher]);

  return (
    <SafeAreaView style={style.container}>
      {loading}
      {alert && (
        <ModalMess
          type={alert.type}
          message={alert.message}
          alert={alert}
          setAlert={setAlertDeco}
        />
      )}
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={t("orderScreen.shipment")}
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
            {t("orderScreen.pleaseCheckYourOrder'sShipmentInformationAndClickConfirmToProceedWithPayment")}
          </Text>
          <View style={[style.rowContainer]}>
            <InfoField
              title={t("orderScreen.expected")}
              content="Thứ 6, 20 tháng 3"
              style={{ flex: 1 }}
            />
            <InfoField
              title={t("orderScreen.receiver")}
              content={receiver_name || t("orderScreen.notYet")}
              style={{ flex: 1 }}
            />
          </View>
          <View style={[style.rowContainer]}>
            <InfoField
              title={t("orderScreen.from")}
              content={from_address && joinAddress(from_address)}
              style={{ flex: 1 }}
            />
            <InfoField
              title={t("orderScreen.receiver'sPhoneNumber")}
              content={receiver_phone}
              style={{ flex: 1 }}
            />
          </View>
          <View style={[style.rowContainer]}>
            <InfoField
              title={t("orderScreen.to")}
              content={to_address && joinAddress(to_address)}
              style={{ flex: 1 }}
            />
            <InfoField
              title={t("orderScreen.totalWeight")}
              content={total_weight + ' kg'}
              style={{ flex: 1 }}
            />
          </View>
          <View style={[style.rowContainer]}>
            <InfoField
              title={t("orderScreen.totalTypeOfGoods")}
              content={packages.length}
              style={{ flex: 1 }}
            />
            <InfoField
              title={t("orderScreen.totalOfGoods")}
              content={total_quantity + ' '+ t("orderScreen.package")}
              style={{ flex: 1 }}
            />
          </View>
          <View style={{ marginVertical: 8 }}>
            <Text style={[FONTS.BigBold]}>{t("orderScreen.paymentMethods")}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Payment', route.params)}>
              <View style={[style.select, style.rowContainer]}>
                <Text style={[{ flex: 1 }]}>
                  {payment ? payment.title : t("orderScreen.tapToSelect")}
                </Text>
                <ListItem.Chevron size={30} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 8 }}>
            <Text style={[FONTS.BigBold]}>{t("orderScreen.discountCode")}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('VoucherScreen', {
                  ...route.params,
                  useVoucher: true,
                  fee: initialFee,
                })
              }>
              <View style={[style.select, style.rowContainer]}>
                <Text style={[{ flex: 1 }]}>
                  {voucher && voucher.title ? voucher.title : t("orderScreen.tapToSelect")}
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
            <Text style={[{ flex: 1 }, FONTS.Big]}>{t("orderScreen.total")}</Text>
            <Text style={[FONTS.BigBold]}>{formatCash(fee.toString())}</Text>
          </View>
          <PrimaryButton
            title={t("orderScreen.confirm")}
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
