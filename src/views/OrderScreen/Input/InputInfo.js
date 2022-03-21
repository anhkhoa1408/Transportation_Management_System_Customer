import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import PrimaryButton from '../../../components/CustomButton/PrimaryButton';
import Header from '../../../components/Header';
import OrderStep from '../../../components/StepIndicator/OrderStep';
import TextField from '../../../components/TextField';
import { FONTS } from '../../../styles';
import { container } from '../../../styles/layoutStyle';
import { joinAddress, simplifyString } from '../../../utils/address';

const InputInfo = ({ navigation, route }) => {
  const [name, setName] = useState('');

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
        contentContainerStyle={{ padding: 30, height: '100%' }}>
        <View style={{ flex: 1 }}>
          <Text style={[FONTS.SmolBold, { marginVertical: 15 }]}>
            Nhập thông tin vận chuyển
          </Text>
          <TextField
            title="Tên đơn hàng (tuỳ chọn)"
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate('InputAddress', {
                ...route.params,
                type: 'from_address',
                previousScreen: 'InputInfo',
              })
            }>
            <TextField
              title="Từ"
              value={
                route?.params?.from_address
                  ? simplifyString(joinAddress(route?.params?.from_address), 30)
                  : ''
              }
              placeholder="Nhấn để thêm"
              editable={false}
              afterComponent={<ListItem.Chevron size={30} />}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate('InputAddress', {
                ...route.params,
                type: 'to_address',
                previousScreen: 'InputInfo',
              })
            }>
            <TextField
              value={
                route?.params?.to_address
                  ? simplifyString(joinAddress(route?.params?.to_address), 30)
                  : ''
              }
              title="Đến"
              placeholder="Nhấn để thêm"
              editable={false}
              afterComponent={<ListItem.Chevron size={30} />}
            />
          </TouchableOpacity>
        </View>
        <PrimaryButton
          title="Nhập thông tin người nhận"
          disabled={!route?.params?.from_address || !route?.params?.to_address}
          onPress={() => {
            route?.params?.type && delete route.params['type'];
            navigation.navigate('InputReceiver', {
              ...route.params,
              name: name,
            });
          }}
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
    height: '100%',
  },
});

export default InputInfo;
