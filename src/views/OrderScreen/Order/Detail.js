import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { InfoField } from '../../../components/InfoField';
import { container } from '../../../styles/layoutStyle';
import { joinAddress } from '../../../utils/address';
import { getPredictDate } from '../../../utils/dateUtils';
import {
  convertOrderState,
  formatCash,
  mapStateToStyle,
} from '../../../utils/order';
import { COLORS } from './../../../styles';

const Detail = ({ navigation, item, ...props }) => {
  const { t, i18n } = useTranslation('common');
  const { color } = mapStateToStyle(item.state);

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
      <View style={[styles.rowContainer]}>
        <InfoField
          title={t('orderScreen.expected')}
          content={getPredictDate(5, new Date(item.createdAt))}
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
      <View style={[styles.rowContainer]}>
        <InfoField
          title={t('orderScreen.from')}
          content={item?.from_address && joinAddress(item?.from_address)}
          style={{ flex: 1, paddingRight: 5 }}
        />
        <InfoField
          title={t('orderScreen.to')}
          content={item?.to_address && joinAddress(item?.to_address)}
          style={{ flex: 1, paddingRight: 5 }}
        />
      </View>
      <View style={[styles.rowContainer]}>
        <InfoField
          title={t('orderScreen.receiver')}
          content={item?.receiver_name}
          style={{ flex: 1 }}
        />
        <InfoField
          title={t("orderScreen.receiver'sPhoneNumber")}
          content={item?.receiver_phone}
          style={{ flex: 1 }}
        />
      </View>
      <View style={[styles.rowContainer]}>
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
      <View style={[styles.rowContainer, { paddingRight: 10 }]}>
        <InfoField
          title={t('orderScreen.note')}
          content={item.note || 'Không có ghi chú'}
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
