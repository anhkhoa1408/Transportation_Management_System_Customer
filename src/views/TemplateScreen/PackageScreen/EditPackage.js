import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Text, Icon } from 'react-native-elements';
import { container } from '../../../styles/layoutStyle';
import Header from '../../../components/Header';
import TextField from '../../../components/TextField';
import { DatePicker } from '../../../components/DatePicker';
import CustomInput from '../../../components/CustomInput/CustomInput';
import PillButton from '../../../components/CustomButton/PillButton';
import Select from '../../../components/Select/Select';
import { success } from '../../../styles/color';
import { COLORS } from '../../../styles';

const EditPackage = ({ navigation }) => {
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
        headerText={'Chỉnh sửa'}
        rightElement={
          <Icon
            name="check"
            size={30}
            color={COLORS.primary}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <ScrollView contentContainerStyle={style.form}>
        <TextField title="Tên (Không bắt buộc)" />
        <TextField title="Chiều dài" keyboardType="numeric" />
        <TextField title="Chiều rộng" keyboardType="numeric" />
        <TextField title="Chiều cao" keyboardType="numeric" />
        <TextField title="Khối lượng" keyboardType="numeric" />
        <TextField title="Số lượng" keyboardType="numeric" />
        <Select title="Loại hàng hoá" data={packageType} />
        <CustomInput title="Ghi chú" placeholder="Ghi chú của bạn..." />
        {/* <PillButton
          title="Lưu"
          buttonStyle={{
            backgroundColor: success,
          }}
        /> */}
      </ScrollView>
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
  },
});

export default EditPackage;
