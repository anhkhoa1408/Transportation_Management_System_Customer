import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  MaskedViewComponent,
} from 'react-native';
import { Text, ListItem, Icon, CheckBox, Avatar } from 'react-native-elements';
import CustomSearch from '../../components/CustomSearch/CustomSearch';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import { primary, danger } from '../../styles/color';
import { COLORS } from '../../styles';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import PillButton from '../../components/CustomButton/PillButton';
import voucherApi from '../../api/voucherApi';
import { formatCash } from '../../utils/order';
import moment from 'moment';
import { MAIN_URL } from '../../api/config';
import voucherImg from './../../assets/images/voucher_alt.jpg';

const VoucherScreen = ({ route, navigation }) => {
  const useVoucher = route?.params?.useVoucher;

  const [data, setData] = useState([]);

  const ref = useRef([]);

  const handlePress = async index => {
    await ref[index].animate({
      0: {
        scale: 1,
      },
      0.5: {
        scale: 0.9,
      },
      1: {
        scale: 1,
      },
    });
  };

  const renderItem = ({ item, index }) => (
    <Animatable.View
      ref={ele => (ref[index] = ele)}
      duration={500}
      easing="ease">
      <TouchableWithoutFeedback onPress={() => handlePress(index)}>
        <ListItem containerStyle={style.storeItem}>
          <ListItem.Content
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flex: 1 }}>
              <View style={{ width: '90%' }}>
                <MaskedView
                  maskElement={
                    <Text style={[style.discountText]}>
                      Giảm{' '}
                      {item && item.sale_type === 'value'
                        ? formatCash(item.sale.toString())
                        : item.sale + ' %'}
                    </Text>
                  }>
                  <LinearGradient
                    colors={['#EF3D3D', '#FFB800']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text style={[style.discountText, { opacity: 0 }]}>
                      Giảm{' '}
                      {item && item.sale_type === 'value'
                        ? formatCash(item.sale.toString())
                        : item.sale + ' %'}
                    </Text>
                  </LinearGradient>
                </MaskedView>
                <MaskedView
                  maskElement={
                    <Text>
                      Tối đa: {formatCash(item.sale_max.toString())} - đơn tối
                      thiểu:{' '}
                      {item.minimum_order &&
                        formatCash(item.minimum_order.toString())}
                    </Text>
                  }>
                  <LinearGradient
                    colors={['#EF3D3D', '#FFB800']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text style={[{ opacity: 0 }]}>
                      Tối đa: {formatCash(item.sale_max.toString())} - đơn tối
                      thiểu:{' '}
                      {item.minimum_order &&
                        formatCash(item.minimum_order.toString())}
                    </Text>
                  </LinearGradient>
                </MaskedView>
              </View>
            </View>
            {item.voucher_img && item.voucher_img.url ? (
              <Avatar
                size="medium"
                avatarStyle={{ borderRadius: 8 }}
                source={{
                  uri: MAIN_URL.concat(item.voucher_img.url),
                }}
              />
            ) : (
              <Avatar
                size="medium"
                avatarStyle={{ borderRadius: 8 }}
                source={voucherImg}
              />
            )}
          </ListItem.Content>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <View style={{ flex: 1 }}>
              {useVoucher && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('OrderSummary', {
                      ...route.params,
                      voucher: {
                        title: `Giảm phí vận chuyển ${item.sale_type === 'value'
                        ? formatCash(item.sale.toString())
                        : item.sale + " %"}`,
                        data: item
                      }
                        
                    })
                  }>
                  <Text
                    style={[
                      {
                        color: COLORS.primary,
                        fontWeight: 'bold',
                        fontSize: 15,
                      },
                    ]}>
                    Dùng ngay
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <ListItem.Subtitle
              style={{
                alignSelf: 'flex-end',
                color: primary,
                fontWeight: 'bold',
              }}>
              Đến {moment(item.expired).format('DD/MM/YYYY')}
            </ListItem.Subtitle>
          </View>
        </ListItem>
      </TouchableWithoutFeedback>
    </Animatable.View>
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route?.params?.fee) {
        voucherApi
          .getList({
            minimum_order_lte: route.params.fee,
          })
          .then(response => {
            setData(response);
          });
      } else {
        voucherApi.getList().then(response => {
          setData(response);
        });
      }
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <Header
        headerText={'Voucher của bạn'}
        leftElement={
          useVoucher && (
            <Icon name="west" size={30} onPress={() => navigation.goBack()} />
          )
        }
      />

      <View style={{ width: '100%', paddingHorizontal: 10, display: 'flex' }}>
        <CustomSearch />
      </View>

      <FlatList
        contentContainerStyle={{ paddingBottom: 10 }}
        style={{
          alignSelf: 'stretch',
        }}
        data={data}
        renderItem={renderItem}
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
            <Text>Không có mã giảm giá đạt điều kiện</Text>
          </View>
        }
      />
      {/* {order && (
        <View style={{ margin: 20 }}>
          <PillButton title="Chọn" />
        </View>
      )} */}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: { ...container, alignItems: 'stretch' },
  storeItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: '#F3F3FA',
    marginVertical: 15,
  },
  chatList: {
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'rgba(0,0,0,0.5)',
  },
  discountText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default VoucherScreen;
