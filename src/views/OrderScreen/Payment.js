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

const Payment = ({ navigation, route }) => {
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
            title = 'Thanh toán bởi người nhận';
            value = 'direct';
            break;
          case 'receiver':
            title = 'Thanh toán bởi người gửi';
            value = 'direct';
            break;
          case 'momo':
            title = 'Ví điện tử Momo';
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
        headerText={'Phương thức thanh toán'}
      />
      <Text
        style={[
          {
            textAlign: 'center',
            paddingHorizontal: 20,
            opacity: 0.6,
          },
        ]}>
        Xin hãy chọn một trong các phương thức thanh toán sau đây
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
                  Thanh toán offline
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
              <Text style={{ flex: 1 }}>Thanh toán bởi người nhận</Text>
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
              <Text style={{ flex: 1 }}>Thanh toán bởi người gửi</Text>
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
                  Thanh toán online
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
              <Text style={{ flex: 1 }}>Ví điện tử Momo</Text>
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
          title="Đồng ý"
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
