import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Text, Icon } from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import TextField from '../../components/TextField';
import { DatePicker } from '../../components/DatePicker';
import CustomInput from '../../components/CustomInput/CustomInput';
import PillButton from '../../components/CustomButton/PillButton';
import Select from '../../components/Select/Select';
import { success } from '../../styles/color';
import { COLORS, FONTS } from '../../styles';
import OrderStep from '../../components/StepIndicator/OrderStep';

const InputInfo = ({ navigation }) => {
  const packageType = [
    {
      label: 'Thường',
      value: 1,
    },
    {
      label: 'Quần áo',
      value: 2,
    },
    {
      label: 'Gia dụng',
      value: 3,
    },
  ];
  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Đặt hàng'}
      />
      <OrderStep current={0} />
      <View style={[style.form, { flex: 1 }]}>
        <View style={{ flex: 1 }}>
          <Text style={[FONTS.SmolBold, { marginVertical: 15 }]}>
            Nhập thông tin đặt hàng
          </Text>
          <TextField title="Tên đơn hàng (tuỳ chọn)" />
          <TouchableOpacity activeOpacity={0.9}>
            <TextField title="Từ" editable={false} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}>
            <TextField title="Đến" editable={false} />
          </TouchableOpacity>
        </View>
        <PillButton
          title="Tiếp tục"
          buttonStyle={{ backgroundColor: COLORS.primary }}
        />
      </View>

      {/* <ScrollView contentContainerStyle={style.form}>
        <TextField title="Tên (Không bắt buộc)" />
        <TextField title="Chiều dài" keyboardType="numeric" />
        <TextField title="Chiều rộng" keyboardType="numeric" />
        <TextField title="Chiều cao" keyboardType="numeric" />
        <TextField title="Khối lượng" keyboardType="numeric" />
        <TextField title="Số lượng" keyboardType="numeric" />
        <Select title="Loại hàng hoá" data={packageType} />
        <CustomInput title="Ghi chú" placeholder="Ghi chú của bạn..." />
        
      </ScrollView> */}
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
    paddingHorizontal: 30,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'column',
  },
});

export default InputInfo;
