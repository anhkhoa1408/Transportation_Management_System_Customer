import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Avatar, Text, Icon, Divider, ListItem } from 'react-native-elements';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import PillButton from '../../components/CustomButton/PillButton';
import { COLORS, FONTS } from '../../styles';
import OrderStep from '../../components/StepIndicator/OrderStep';

const InputPackage = ({ route, navigation }) => {
  const [listPackage, setListPackage] = useState([]);

  const handleDelete = id => {
    setListPackage([...listPackage.filter(item => item.id !== id)]);
  };

  useEffect(() => {
    if (route.params?.listPackage) {
      setListPackage([...listPackage, ...route.params?.listPackage]);
    }
  }, [route.params?.listPackage]);

  console.log(listPackage);
  const renderItem = ({ item, index }) => (
    // <TouchableOpacity>
    <ListItem style={style.item}>
      <Icon reverse name="archive" size={20} color={COLORS.primary} />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{'Số lượng: ' + item.count}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        name="delete"
        color={COLORS.danger}
        onPress={() => handleDelete(item.id)}
      />
    </ListItem>
    // </TouchableOpacity>
  );
  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Vận chuyển'}
      />
      {/* <OrderStep current={0} /> */}

      <View style={[style.form, { flex: 1 }]}>
        <Text
          style={{
            textAlign: 'center',
            paddingHorizontal: 15,
            marginBottom: 15,
          }}>
          Nhấn thêm kiện hàng để tạo mới hoặc chọn kiện hàng mẫu từ danh sách
        </Text>

        <FlatList
          contentContainerStyle={{ padding: 5 }}
          data={listPackage}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

        <View style={{ marginBottom: 10, paddingTop: 15 }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <PillButton
              title="Thêm kiện hàng"
              onPress={() =>
                navigation.navigate('EditPackage', {
                  order: true,
                  ...route.params,
                })
              }
              containerStyle={{ flex: 1, marginRight: 5 }}
            />
            <PillButton
              title="Chọn mẫu"
              onPress={() =>
                navigation.navigate('PackageTemplateList', {
                  useTemplate: true,
                  ...route.params,
                })
              }
              containerStyle={{ flex: 1, marginLeft: 5 }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Divider style={{ flex: 1 }} color={COLORS.primary} width={2} />
            <Text style={{ marginHorizontal: 10, color: COLORS.primary }}>
              Hoặc
            </Text>
            <Divider style={{ flex: 1 }} color={COLORS.primary} width={2} />
          </View>
          <PillButton
            title="Tiếp tục"
            onPress={() => navigation.navigate('OrderSummary')}
            buttonStyle={{ backgroundColor: COLORS.primary }}
          />
        </View>
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
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 20,
    elevation: 5,
    marginBottom: 25,
  },
});

export default InputPackage;
