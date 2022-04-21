import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button, Icon, Overlay,
  Tab,
  TabView, Text
} from 'react-native-elements';
import { v4 } from 'uuid';
import orderApi from '../../api/orderApi';
import Confirm from '../../components/Confirm';
import Header from '../../components/Header';
import ModalMess from '../../components/ModalMess';
import { handleRequestPayment } from '../../services/momo';
import { COLORS, FONTS } from '../../styles';
import { container } from '../../styles/layoutStyle';
import Detail from './Order/Detail';
import OrderRating from './Order/OrderRating';
import OrderTracing from './Order/OrderTracing';
import PackageList from './Order/PakageList';

export default function OrderDetail({ navigation, route }) {
  const { t, i18n } = useTranslation('common');
  const [index, setIndex] = useState(0);
  const [option, setOption] = useState(false);
  const [rating, setRating] = useState(false);
  const [trace, setTrace] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [alert, setAlert] = useState(null);
  const [item, setItem] = useState(route?.params.item);

  useEffect(() => {
    if (item.id && item.state !== 5) {
      orderApi
        .tracing(item.id)
        .then(response => setTrace(response))
        .catch(err => console.log(err, 'aaaaa'));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      orderApi
        .orderInfo(item.id)
        .then(response => {
          setItem(response);
        })
        .catch(err => {
          console.log(err);
        });
    });

    return unsubscribe;
  }, []);

  const handleCancel = () => {
    setConfirm(null);
    if (item.state === 0) {
      orderApi
        .update(item.id, {
          state: 5,
        })
        .then(response => {
          navigation.goBack();
        })
        .catch(err => console.log(err));
    } else {
      setAlert({
        type: 'danger',
        message: 'Đơn hàng đã được nhận, không thể hủy',
      });
    }
  };

  const handlePayment = () => {
    setConfirm(null);
    let id = JSON.stringify({
      id: item.id,
    });
    handleRequestPayment(1000, v4(), id);
  };

  const handleConfirm = type => {
    if (type === 'pay') {
      setConfirm({
        type: 'warning',
        message: 'Bạn có muốn thanh toán toàn bộ chi phí còn lại theo Momo?',
        confirmBtnText: 'Thanh toán',
        onConfirm: handlePayment,
      });
    } else if (type === 'cancel') {
      setConfirm({
        type: 'warning',
        message: 'Bạn có muốn hủy đơn hàng ?',
        confirmBtnText: 'Đồng ý',
        onConfirm: handleCancel,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {confirm && (
        <Confirm
          type={confirm.type}
          message={confirm.message}
          onCancel={() => setConfirm(null)}
          onConfirm={confirm.onConfirm}
          confirmBtnText={confirm.confirmBtnText}
        />
      )}
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
        headerText={t('orderScreen.detail')}
      />

      {/* Customer info and option */}
      <View
        style={[
          styles.rowContainer,
          {
            paddingHorizontal: 25,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          },
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
            elevation: 8,
            shadowColor: COLORS.primary,
            borderRadius: 10,
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
            elevation: 8,
            shadowColor: COLORS.primary,
            borderRadius: 10,
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
            borderRadius: 8,
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
            title={
              item.rating_note || item.rating_point
                ? 'Đã đánh giá'
                : t('orderScreen.rate')
            }
            disabled={item.rating_note || item.rating_point}
            onPress={() => {
              setRating(true);
              setOption(false);
            }}
            containerStyle={[styles.btnOption]}
            buttonStyle={[{ backgroundColor: COLORS.success, borderRadius: 8 }]}
          />
          <Button
            disabled={!item.remain_fee || item.state === 5}
            onPress={() => handleConfirm('pay')}
            title={t('orderIndicator.pay')}
            containerStyle={[styles.btnOption]}
            buttonStyle={[{ backgroundColor: COLORS.warning, borderRadius: 8 }]}
          />
          <Button
            disabled={item.state === 5}
            title={t('orderScreen.cancelOrder')}
            type="outline"
            onPress={() => handleConfirm('cancel')}
            containerStyle={[styles.btnOption]}
            titleStyle={[{ color: COLORS.danger }]}
            buttonStyle={[
              { borderColor: COLORS.danger, borderWidth: 2, borderRadius: 8 },
            ]}
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
            title={t('orderScreen.follow')}
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
            title={t('orderScreen.detail')}
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
            title={t('orderScreen.package')}
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
      <OrderRating
        item={item}
        onChangeItem={setItem}
        visible={rating}
        onSwipeComplete={() => setRating(false)}
      />
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
