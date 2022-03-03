import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  Text,
  Icon,
  CheckBox,
  ListItem,
  Rating,
  Avatar,
  Divider,
  Button,
  Overlay,
} from 'react-native-elements';
import { container } from '../../../styles/layoutStyle';
import { COLORS, FONTS } from './../../../styles';
import { InfoField } from '../../../components/InfoField';

const Detail = ({ navigation, ...props }) => {
  const [data, setData] = useState([
    {
      id: '#FOIJOJOF123',
      quantity: 10,
      current_address: 'kho Hà Nội',
    },
    {
      id: '#FOIJOJOF121',
      quantity: 10,
      current_address: 'kho Hà Nội',
    },
  ]);

  return (
    <View
      style={[
        styles.columnContainer,
        { padding: 15, backgroundColor: '#F3F3FA', borderRadius: 10 },
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
              Đang vận chuyển
            </Text>
          }
          style={{ flex: 1 }}
        />
      </View>
      <View style={[styles.rowContainer, { paddingRight: 10 }]}>
        <InfoField
          title="Từ"
          content="183/14 Bùi Viện, Phạm Ngũ Lão, Quận 1"
          style={{ flex: 1 }}
        />
        <InfoField
          title="Người nhận"
          content="Chonky shibe"
          style={{ flex: 1 }}
        />
      </View>
      <View style={[styles.rowContainer, { paddingRight: 10 }]}>
        <InfoField
          title="Đến"
          content="823 Pham Van Dong, Thu Duc"
          style={{ flex: 1 }}
        />
        <InfoField
          title="SDT người nhận"
          content="0909145830"
          style={{ flex: 1 }}
        />
      </View>
      <View style={[styles.rowContainer, { paddingRight: 10 }]}>
        <InfoField
          title="Phí cần trả"
          content="1 000 000 VND"
          style={{ flex: 1 }}
        />
        <InfoField
          title="Tổng trọng lượng"
          content="5000 kg"
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

export default Detail;

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
