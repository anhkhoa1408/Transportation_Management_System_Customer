import MaskedView from '@react-native-community/masked-view';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Avatar, Icon, ListItem, Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { MAIN_URL } from '../../api/config';
import voucherApi from '../../api/voucherApi';
import CustomSearch from '../../components/CustomSearch/CustomSearch';
import Header from '../../components/Header';
import { COLORS } from '../../styles';
import { primary } from '../../styles/color';
import { container } from '../../styles/layoutStyle';
import { formatCash } from '../../utils/order';
import voucherImg from './../../assets/images/voucher_alt.jpg';
import { useSelector, useDispatch } from 'react-redux';

const VoucherScreen = ({ route, navigation }) => {
  const { t, i18n } = useTranslation('common');
  const userInfo = useSelector(state => state.userInfo.user);

  const useVoucher = route?.params?.useVoucher;
  const fee = route?.params?.fee;
  const [field, setField] = useState('_q');
  const [value, setValue] = useState('');

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

  const handleSearch = () => {
    voucherApi
      .getList({ [field]: value })
      .then(response => {
        console.log(response);
        setData(response);
      })
      .catch(error => {
        setLoading(null);
      });
  };

  const handleCancel = () => {
    setValue('');
  };

  const handleClear = () => {
    setValue('');
    voucherApi
      .getList()
      .then(response => {
        setData(response);
      })
      .catch(error => {
        setLoading(null);
      });
  };

  const renderItem = ({ item, index }) => {
    let disabled =
      fee <= item.minimum_order ||
      (item.customer_type !== 'All' && item.customer_type !== userInfo.type);
    return (
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
                        {t('voucherScreen.discount')}{' '}
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
                        {t('voucherScreen.discount')}{' '}
                        {item && item.sale_type === 'value'
                          ? formatCash(item.sale.toString())
                          : item.sale + ' %'}
                      </Text>
                    </LinearGradient>
                  </MaskedView>
                  <MaskedView
                    maskElement={
                      <Text>
                        {t('voucherScreen.max')}:{' '}
                        {formatCash(item.sale_max.toString())} -{' '}
                        {t('voucherScreen.minimumOrder')}:{' '}
                        {item.minimum_order &&
                          formatCash(item.minimum_order.toString())}
                      </Text>
                    }>
                    <LinearGradient
                      colors={['#EF3D3D', '#FFB800']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}>
                      <Text style={[{ opacity: 0 }]}>
                        {t('voucherScreen.max')}:{' '}
                        {formatCash(item.sale_max.toString())} -{' '}
                        {t('voucherScreen.minimumOrder')}:{' '}
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
                    uri: item.voucher_img.url,
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
                    disabled={disabled}
                    onPress={() =>
                      navigation.navigate('OrderSummary', {
                        ...route.params,
                        voucher: {
                          title: `${t('voucherScreen.reducedShippingFees')} ${
                            item.sale_type === 'value'
                              ? formatCash(item.sale.toString())
                              : item.sale + ' %'
                          }`,
                          data: item,
                        },
                      })
                    }>
                    {
                      disabled ? <Text style={style.disqualify}>Không đủ điều kiện</Text> : <Text
                      style={[
                        {
                          color: COLORS.primary,
                          fontWeight: 'bold',
                          fontSize: 15,
                        },
                      ]}>
                      {t('voucherScreen.useItNow')}
                    </Text>
                    }
                  </TouchableOpacity>
                )}
              </View>

              <ListItem.Subtitle
                style={{
                  alignSelf: 'flex-end',
                  color: primary,
                  fontWeight: 'bold',
                }}>
                {t('voucherScreen.to')}{' '}
                {moment(item.expired).format('DD/MM/YYYY')}
              </ListItem.Subtitle>
            </View>
          </ListItem>
        </TouchableWithoutFeedback>
      </Animatable.View>
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route?.params?.fee) {
        voucherApi
          .getList({
            _start: 0,
            _limit: 100,
            // minimum_order_lte: route.params.fee,
          })
          .then(response => {
            setData(response);
          });
      } else {
        voucherApi
          .getList({
            _start: 0,
            _limit: 100,
          })
          .then(response => {
            setData(response);
          });
      }
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <Header
        headerText={t('voucherScreen.yourVoucher')}
        leftElement={
          useVoucher && (
            <Icon name="west" size={30} onPress={() => navigation.goBack()} />
          )
        }
      />

      <View style={{ width: '100%', paddingHorizontal: 10, display: 'flex' }}>
        <CustomSearch
          value={value}
          onChangeText={setValue}
          onSubmitEditing={handleSearch}
          onClear={handleClear}
          onCancel={handleCancel}
        />
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
            <Text>{t('voucherScreen.noQualifyingVoucher')}</Text>
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
    borderRadius: 8,
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
  disqualify: {
    color: COLORS.danger,
    fontWeight: '700'
  }
});

export default VoucherScreen;
