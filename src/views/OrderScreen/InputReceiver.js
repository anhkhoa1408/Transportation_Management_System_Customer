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

const InputReceiver = ({ navigation }) => {
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
        headerText={'Vận chuyển'}
      />
      <OrderStep current={0} />
      <View
        style={[style.form, { flex: 1 }]}
        contentContainerStyle={{ padding: 30, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={[FONTS.SmolBold, { marginVertical: 15 }]}>
            Nhập thông tin người nhận
          </Text>
          <TextField title="Tên người nhận" />
          <TextField title="Số điện thoại" keyboardType="numeric" />
        </View>
        <PillButton
          title="Tiếp tục"
          onPress={() => navigation.navigate('OrderSummary')}
          buttonStyle={{ backgroundColor: COLORS.primary }}
          containerStyle={{ marginTop: '50%' }}
        />
      </View>
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

export default InputReceiver;
