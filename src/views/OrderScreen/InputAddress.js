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

const InputAddress = ({ navigation }) => {
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
      <View style={[style.form, { flex: 1 }]}>
        <View style={{ flex: 1 }}>
          <Text style={[FONTS.SmolBold, { marginBottom: 15 }]}>
            Nhập địa chỉ người nhận
          </Text>
          <TextField title="Tên đường" />
          <TextField title="Thành phố" />
          <TextField title="Quận" />
          <TextField title="Huyện" />
        </View>
        <PillButton
          title="Tiếp tục"
          onPress={() => navigation.goBack()}
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

export default InputAddress;
