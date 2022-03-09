import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Text, Icon, Divider, ListItem } from 'react-native-elements';
import { container } from '../../../styles/layoutStyle';
import Header from '../../../components/Header';
import { COLORS, FONTS } from '../../../styles';
import OrderStep from '../../../components/StepIndicator/OrderStep';
import PrimaryButton from '../../../components/CustomButton/PrimaryButton';
import ModalMess from '../../../components/ModalMess';

const InputPackage = ({ route, navigation }) => {
  const { pack } = route?.params;
  const [listPackage, setListPackage] = useState([]);
  const [alert, setAlert] = useState(null);

  const handleDelete = idx => {
    setListPackage([...listPackage.filter((item, index) => index !== idx)]);
  };

  useEffect(() => {
    if (
      pack &&
      !listPackage.some(item => {
        return JSON.stringify(item) === JSON.stringify(pack);
      })
    ) {
      setListPackage([...listPackage, pack]);
    }
  }, [pack]);

  const renderItem = ({ item, index }) => (
    <ListItem style={style.item} key={index}>
      <Icon reverse name="inventory" size={20} color={COLORS.primary} />
      <ListItem.Content>
        <ListItem.Title>{item.name || 'Chưa có tên'}</ListItem.Title>
        <ListItem.Subtitle>{'Số lượng: ' + item.quantity}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        name="delete"
        color={COLORS.danger}
        onPress={() => handleDelete(index)}
      />
    </ListItem>
  );
  return (
    <SafeAreaView style={style.container}>
      {alert && (
        <ModalMess
          type="warning"
          message="Bạn chưa thêm kiện hàng nào"
          alert={alert}
          setAlert={setAlert}
        />
      )}
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
            <PrimaryButton
              title="Thêm kiện hàng"
              backgroundColor={COLORS.success}
              onPress={() =>
                navigation.navigate('EditPackage', {
                  ...route.params,
                  order: true,
                })
              }
              containerStyle={{ flex: 1, marginRight: 5 }}
            />
            <PrimaryButton
              title="Chọn mẫu"
              backgroundColor={COLORS.warning}
              onPress={() =>
                navigation.navigate('PackageTemplateList', {
                  ...route.params,
                  useTemplate: true,
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
              Để
            </Text>
            <Divider style={{ flex: 1 }} color={COLORS.primary} width={2} />
          </View>
          <PrimaryButton
            title="Tiếp tục"
            onPress={() => {
              listPackage.length
                ? navigation.navigate('OrderSummary', {
                    ...route.params,
                    packages: listPackage,
                  })
                : setAlert(true);
            }}
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
    borderRadius: 12,
    shadowColor: COLORS.primary,
    elevation: 20,
    marginBottom: 25,
  },
});

export default InputPackage;
