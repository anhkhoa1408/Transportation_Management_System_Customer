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
import { FONTS } from '../../../styles';

const EditOrderAddress = ({ navigation }) => {
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
        headerText={'Mẫu đơn hàng'}
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
        <Text style={[FONTS.BigBold, { marginBottom: 10 }]}>Nhập địa chỉ</Text>
        <TextField title="Đường" />
        <Select title="Thành phố" data={packageType} />
        <Select title="Quận/Huyện" data={packageType} />
        <Select title="Phường/Xã" data={packageType} />
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

export default EditOrderAddress;
