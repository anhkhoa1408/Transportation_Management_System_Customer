import React, { useMemo, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { container } from '../../../styles/layoutStyle';
import { COLORS, FONTS } from './../../../styles';
import { InfoField } from '../../../components/InfoField';
import { convertOrderState, formatCash } from '../../../utils/order';
import { joinAddress } from '../../../utils/address';

const Detail = ({ navigation, item, ...props }) => {
  const quantity = useMemo(() => {
    return item.packages.reduce(
      (total, item) => total + item.weight * item.quantity,
      0,
    );
  }, [item]);

  return (
    <View
      style={[
        styles.columnContainer,
        { padding: 20, backgroundColor: COLORS.gray, borderRadius: 10 },
      ]}>
      <View style={[styles.rowContainer, { paddingRight: 10 }]}>
        <InfoField
          title="Dự kiến"
          content="Thứ 6, 20 tháng 3"
          style={{ flex: 1 }}
        />
        <InfoField
          title="Trạng thái"
          content={
            <Text style={{ color: COLORS.success, fontWeight: 'bold' }}>
              {convertOrderState(item.state)}
            </Text>
          }
          style={{ flex: 1 }}
        />
      </View>
      <View style={[styles.rowContainer, { paddingRight: 10 }]}>
        <InfoField
          title="Từ"
          content={item?.from_address && joinAddress(item?.from_address)}
          style={{ flex: 1 }}
        />
        <InfoField
          title="Người nhận"
          content={item?.receiver_name}
          style={{ flex: 1 }}
        />
      </View>
      <View style={[styles.rowContainer, { paddingRight: 10 }]}>
        <InfoField
          title="Đến"
          content={item?.to_address && joinAddress(item?.to_address)}
          style={{ flex: 1 }}
        />
        <InfoField
          title="SDT người nhận"
          content={item?.receiver_phone}
          style={{ flex: 1 }}
        />
      </View>
      <View style={[styles.rowContainer, { paddingRight: 10 }]}>
        <InfoField
          title="Phí cần trả"
          content={formatCash(item?.remain_fee.toString())}
          style={{ flex: 1 }}
        />
        <InfoField
          title="Tổng trọng lượng"
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
