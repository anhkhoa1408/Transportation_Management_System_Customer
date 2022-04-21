import React, { useMemo, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { container } from '../../../styles/layoutStyle';
import { COLORS, FONTS } from './../../../styles';
import { InfoField } from '../../../components/InfoField';
import {
  convertOrderState,
  formatCash,
  mapStateToStyle,
} from '../../../utils/order';
import { joinAddress } from '../../../utils/address';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const Detail = ({ navigation, item, ...props }) => {
  const { t, i18n } = useTranslation('common');
  const { color } = mapStateToStyle(item.state);
  let date = new Date(item.createdAt.toString());
  let expected = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 6,
  );

  const quantity = useMemo(() => {
    return item.packages
      ? item.packages.reduce(
          (total, item) => total + item.weight * item.quantity,
          0,
        )
      : 0;
  }, [item]);

  return (
    <View
      style={[
        styles.columnContainer,
        { padding: 20, backgroundColor: COLORS.gray, borderRadius: 10 },
      ]}>
      <View style={[styles.rowContainer, { paddingRight: 10 }]}>
        <InfoField
          title={t('orderScreen.expected')}
          content={moment(expected).format("DD/MM/YYYY")}
          style={{ flex: 1 }}
        />
        <InfoField
          title={t('orderScreen.status')}
          content={
            <Text style={{ color: color, fontWeight: 'bold' }}>
              {t(convertOrderState(item.state))}
            </Text>
          }
          style={{ flex: 1 }}
        />
      </View>
      <View style={[styles.rowContainer, { paddingRight: 10 }]}>
        <InfoField
          title={t('orderScreen.from')}
          content={item?.from_address && joinAddress(item?.from_address)}
          style={{ flex: 1 }}
        />
        <InfoField
          title={t('orderScreen.receiver')}
          content={item?.receiver_name}
          style={{ flex: 1 }}
        />
      </View>
      <View style={[styles.rowContainer, { paddingRight: 10 }]}>
        <InfoField
          title={t('orderScreen.to')}
          content={item?.to_address && joinAddress(item?.to_address)}
          style={{ flex: 1 }}
        />
        <InfoField
          title={t("orderScreen.receiver'sPhoneNumber")}
          content={item?.receiver_phone}
          style={{ flex: 1 }}
        />
      </View>
      <View style={[styles.rowContainer, { paddingRight: 10 }]}>
        <InfoField
          title={t('orderScreen.feesToBePaid')}
          content={formatCash(item?.remain_fee.toString())}
          style={{ flex: 1 }}
        />
        <InfoField
          title={t('orderScreen.totalWeight')}
          content={quantity + ' kg'}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

export default memo(Detail);

const styles = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
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
});
