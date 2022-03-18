import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, Text } from 'react-native-elements';
import templateApi from '../../../api/templateApi';
import CustomSearch from '../../../components/CustomSearch/CustomSearch';
import Header from '../../../components/Header';
import { COLORS } from '../../../styles';
import { danger, primary } from '../../../styles/color';
import { container, header } from '../../../styles/layoutStyle';
import PrimaryButton from './../../../components/CustomButton/PrimaryButton';
import Loading from './../../../components/Loading';
import Template from './TemplateItem/Template';

const OrderTemplateList = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [_start, setStart] = useState(0);
  const [loading, setLoading] = useState(null);
  const [deleteList, setDelList] = useState([]);

  const [check, setCheck] = useState(
    Array.from({ length: data.length }, (_, index) => false),
  );

  const handleCheck = useCallback(
    index => {
      check[index] = !check[index];
      setCheck([...check]);
      if (check[index]) {
        setDelList([...deleteList, data[index].id]);
      } else {
        setDelList([
          ...deleteList.filter(item => {
            return item !== data[index].id;
          }),
        ]);
      }
    },
    [data, deleteList],
  );

  const handleCheckAll = () => {
    setCheck(Array.from({ length: data.length }, (_, index) => true));
    setDelList(data.map(item => item.id));
  };

  const handleUnCheckAll = () => {
    setCheck(Array.from({ length: data.length }, (_, index) => false));
    setDelList([]);
  };

  const handleDelete = () => {
    templateApi
      .deleteOrder({ deleteList: deleteList })
      .then(response => {
        setData(response);
        setDelList([]);
        setCheck(Array.from({ length: data.length }, (_, index) => false));
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(<Loading />);
      templateApi
        .getOrders()
        .then(response => {
          setLoading(null);
          setData(response);
        })
        .catch(error => {
          console.log(error);
          setLoading(null);
        });
    });
    return unsubscribe;
  }, []);

  const renderItem = ({ item, index }) => (
    <Template
      index={index}
      check={check}
      item={item}
      navigation={navigation}
      onCheck={handleCheck}
      route={route}
    />
  );

  return (
    <SafeAreaView style={style.container}>
      {loading}
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Mẫu đơn hàng'}
      />
      <View
        style={{
          alignSelf: 'flex-end',
          paddingHorizontal: 10,
          display: 'flex',
        }}>
        {check.some(item => item === true) ? (
          <TouchableOpacity onPress={handleUnCheckAll}>
            <Text
              style={{
                alignSelf: 'flex-end',
                color: danger,
                marginRight: 10,
                fontSize: 17,
              }}>
              Huỷ
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleCheckAll}>
            <Text
              style={{
                alignSelf: 'flex-end',
                color: primary,
                marginRight: 10,
                fontSize: 17,
              }}>
              Chọn tất cả
            </Text>
          </TouchableOpacity>
        )}

        <CustomSearch />
      </View>

      <FlatList
        style={{
          alignSelf: 'stretch',
          marginBottom: 10,
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        ListEmptyComponent={
          <View
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '50%',
            }}>
            <Text>Chưa có mẫu</Text>
          </View>
        }
      />
      {check.some(item => item === true) ? (
        <View style={{ padding: 20 }}>
          <PrimaryButton
            title="Xoá"
            buttonStyle={{
              backgroundColor: COLORS.danger,
            }}
            onPress={handleDelete}
          />
        </View>
      ) : (
        <View style={{ padding: 20 }}>
          <PrimaryButton
            title="Thêm mẫu đơn hàng"
            buttonStyle={{
              backgroundColor: COLORS.primary,
            }}
            onPress={() =>
              navigation.navigate('EditOrderInfo', {
                action: 'add',
              })
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: { ...container, alignItems: 'stretch' },
  header: { ...header },
  reportItem: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: COLORS.gray,
    marginVertical: 15,
    flexDirection: 'column',
  },
  time: {
    alignSelf: 'flex-end',
    color: 'rgba(0,0,0,0.5)',
  },
});

export default OrderTemplateList;
