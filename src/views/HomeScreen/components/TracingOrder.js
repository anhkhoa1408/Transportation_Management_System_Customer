import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { COLORS } from '../../../styles';
import { joinAddress, simplifyString } from '../../../utils/address';
import { convertOrderState, mapStateToStyle } from '../../../utils/order';
import nothing_img from './../../../assets/images/nothing.png';

const TracingOrder = ({ orders }) => {
  const { t } = useTranslation('common');
  const navigation = useNavigation();

  return (
    <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: '800',
            letterSpacing: 1,
          }}>
          {t('homeScreen.tracing')}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('HomeOrderHistory', {
              homeNav: true,
            })
          }>
          <View
            style={{
              padding: 6,
              backgroundColor: COLORS.gray,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'row',
              borderRadius: 10,
            }}>
            <Text style={{ fontWeight: '800' }}>{t('homeScreen.detail')}</Text>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
      </View>
      {orders.length ? (
        orders.map(item => {
          let { icon, neutralColor, color } = mapStateToStyle(item.state);
          return (
            <View key={item.id} style={styles.trackItem}>
              <View
                style={[
                  styles.trackItemIcon,
                  { backgroundColor: neutralColor },
                ]}>
                <Icon name={icon} color={color} />
              </View>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 15,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    letterSpacing: 1,
                  }}>
                  {item.name || 'Chưa đặt tên'}
                </Text>
                <Text
                  style={{
                    opacity: 0.5,
                  }}>
                  {t('homeScreen.to')}:{' '}
                  {simplifyString(joinAddress(item.to_address), 22)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderRadius: 5,
                      padding: 3,
                      marginRight: 6,
                      backgroundColor: neutralColor,
                    }}></View>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontWeight: 'bold',
                      color: color,
                    }}>
                    {t(convertOrderState(item.state))}
                  </Text>
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <View style={styles.nothing}>
          <Image source={nothing_img} style={styles.nothingImg} />
          <Text style={{ opacity: 0.5 }}>{t('homeScreen.noOrder')}</Text>
        </View>
      )}
    </View>
  );
};

export default TracingOrder;

const styles = StyleSheet.create({
  trackItem: {
    backgroundColor: '#FFF',
    elevation: 4,
    shadowColor: COLORS.primary,
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  trackItemIcon: {
    padding: 20,
    borderRadius: 15,
  },
  nothing: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nothingImg: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
