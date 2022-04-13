import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Icon, ListItem, Text } from 'react-native-elements';
import mastercard from '../../assets/images/mastercard.png';
import momo from '../../assets/images/momo.png';
import PillButton from '../../components/CustomButton/PillButton';
import Header from '../../components/Header';
import { COLORS, FONTS } from '../../styles';
import { container } from '../../styles/layoutStyle';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { useTranslation } from 'react-i18next';

const Payment = ({ navigation, route }) => {
  const { t, i18n } = useTranslation("common")
  const [offlineExpand, setOffline] = useState(true);
  const [onlineExpand, setOnline] = useState(true);
  const [check, setCheck] = useState({
    sender: false,
    receiver: false,
    momo: false,
  });

  const handleCheck = name => {
    setCheck({
      sender: false,
      receiver: false,
      momo: false,
      [name]: !check[name],
    });
  };

  const handleSubmit = async () => {
    let result = Object.keys(check).reduce((acc, ele) => {
      if (check[ele]) {
        let title = '',
          value = '';
        switch (ele) {
          case 'sender':
            title = t("orderScreen.payBySender");
            value = 'direct';
            break;
          case 'receiver':
            title = t("orderScreen.payByReceiver");
            value = 'direct';
            break;
          case 'momo':
            title = t("orderScreen.momoE-wallet");
            value = 'momo';
            break;
        }
        acc['payment'] = {
          value,
          title,
        };
      }
      return acc;
    }, {});
    navigation.navigate('OrderSummary', {
      ...route.params,
      ...result,
    });
  };

  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={t("orderScreen.paymentMethods")}
      />
      <Text
        style={[
          {
            textAlign: 'center',
            paddingHorizontal: 20,
            opacity: 0.6,
          },
        ]}>
        {t("orderScreen.pleaseChooseOneOfTheFollowingPaymentMethods")}
      </Text>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20 }}
        style={[style.form]}>
        <View>
          <ListItem.Accordion
            underlayColor={COLORS.gray}
            content={
              <ListItem.Content>
                <Text style={{ ...FONTS.Big, fontWeight: '600' }}>
                  {t("orderScreen.offlinePayment")}
                </Text>
              </ListItem.Content>
            }
            isExpanded={offlineExpand}
            onPress={() => {
              setOffline(!offlineExpand);
            }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleCheck('sender')}
              style={[style.rowContainer, style.item]}>
              <Icon
                name="send"
                color={COLORS.header}
                containerStyle={{
                  backgroundColor: '#FFF',
                  shadowColor: COLORS.primary,
                  elevation: 15,
                  padding: 10,
                  marginRight: 10,
                  borderRadius: 15,
                }}
              />
              <Text style={{ flex: 1 }}>{t("orderScreen.payByReceiver")}</Text>
              <ListItem.CheckBox
                checked={check.sender}
                checkedIcon={<Icon name="check-box" color={COLORS.primary} />}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleCheck('receiver')}
              style={[style.rowContainer, style.item]}>
              <Icon
                name="send"
                color={COLORS.header}
                containerStyle={{
                  backgroundColor: '#FFF',
                  shadowColor: COLORS.primary,
                  elevation: 15,
                  padding: 10,
                  marginRight: 10,
                  borderRadius: 15,
                }}
              />
              <Text style={{ flex: 1 }}>{t("orderScreen.payBySender")}</Text>
              <ListItem.CheckBox
                checked={check.receiver}
                checkedIcon={<Icon name="check-box" color={COLORS.primary} />}
              />
            </TouchableOpacity>
          </ListItem.Accordion>
          <ListItem.Accordion
            underlayColor={COLORS.gray}
            content={
              <ListItem.Content>
                <Text style={{ ...FONTS.Big, fontWeight: '600' }}>
                  {t("orderScreen.onlinePayment")}
                </Text>
              </ListItem.Content>
            }
            isExpanded={onlineExpand}
            onPress={() => {
              setOnline(!onlineExpand);
            }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleCheck('momo')}
              style={[style.rowContainer, style.item]}>
              <Avatar
                source={momo}
                size="medium"
                containerStyle={{
                  backgroundColor: '#FFF',
                  shadowColor: COLORS.primary,
                  elevation: 15,
                  padding: 8,
                  marginRight: 10,
                  borderRadius: 15,
                }}
              />
              <Text style={{ flex: 1 }}>{t("orderScreen.momoE-wallet")}</Text>
              <ListItem.CheckBox
                checked={check.momo}
                checkedIcon={<Icon name="check-box" color={COLORS.primary} />}
              />
            </TouchableOpacity>
          </ListItem.Accordion>
        </View>
      </ScrollView>
      <View style={{ padding: 20 }}>
        <PrimaryButton
          title={t("orderScreen.agree")}
          buttonStyle={{ backgroundColor: COLORS.primary }}
          onPress={handleSubmit}
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
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
  select: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
  },
  item: {
    borderRadius: 15,
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.white,
    height: 90,
  },
});

export default Payment;
