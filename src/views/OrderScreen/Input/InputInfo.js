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
import { useTranslation } from 'react-i18next';

const InputInfo = ({ navigation, route }) => {
  const { t, i18n } = useTranslation("common")
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={t("orderScreen.transport")}
      />
      <OrderStep current={0} />
      <View
        style={[style.form, { flex: 1 }]}
        contentContainerStyle={{ padding: 30, height: '100%' }}>
        <View style={{ flex: 1 }}>
          <Text style={[FONTS.SmolBold, { marginVertical: 15 }]}>
            {t("orderScreen.enterShippingInformation")}
          </Text>
          <TextField
            title={t("orderScreen.orderName(optional)")}
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
              title={t("orderScreen.from")}
              value={
                route?.params?.from_address
                  ? simplifyString(joinAddress(route?.params?.from_address), 30)
                  : ''
              }
              placeholder={t("orderScreen.tapToAdd")}
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
              title={t("orderScreen.to")}
              placeholder={t("orderScreen.tapToAdd")}
              editable={false}
              afterComponent={<ListItem.Chevron size={30} />}
            />
          </TouchableOpacity>
        </View>
        <PrimaryButton
          title={t("orderScreen.enterReceiverInformation")}
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
