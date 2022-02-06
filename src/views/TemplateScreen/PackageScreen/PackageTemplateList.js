import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Avatar, Icon, Text, ListItem, CheckBox } from 'react-native-elements';
import CustomSearch from '../../../components/CustomSearch/CustomSearch';
import { container, header } from '../../../styles/layoutStyle';
import img from '../../../assets/images/download.jpg';
import { store } from '../../../config/configureStore';
import Header from '../../../components/Header';
import { primary, danger } from '../../../styles/color';
import { COLORS, FONTS } from '../../../styles';
import PillButton from '../../../components/CustomButton/PillButton';

const PackageTemplateList = ({ route, navigation }) => {
  const [data, setData] = useState([
    {
      id: '#afoqijfoasdada'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
    {
      id: '#bmiweopkrejgoi'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
    {
      id: '#opkopjqwoiasdd'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
    {
      id: '#fmppoekpokrope'.toLocaleUpperCase(),
      dateTime: '12/20/2019 3:36 PM',
    },
  ]);

  const [check, setCheck] = useState(
    Array.from({ length: data.length }, (_, index) => false),
  );

  const handleCheck = index => {
    check[index] = !check[index];
    setCheck([...check]);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onLongPress={() => handleCheck(index)}
      onPress={() =>
        check.some(item => item === true)
          ? handleCheck(index)
          : navigation.navigate('EditPackage')
      }>
      <ListItem containerStyle={style.reportItem}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.6)',
              padding: 10,
              borderRadius: 15,
              marginRight: 10,
            }}>
            <Icon
              size={30}
              name="archive"
              iconStyle={{
                color: '#FFF',
              }}
              containerStyle={{
                backgroundColor: COLORS.header,
                padding: 10,
                borderRadius: 25,
              }}
            />
          </View>
          <ListItem.Content>
            <ListItem.Title>{item.id}</ListItem.Title>
            <ListItem.Subtitle>{item.dateTime}</ListItem.Subtitle>
          </ListItem.Content>
          {check.some(item => item === true) ? (
            <ListItem.CheckBox
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={check[index]}
              checkedColor={primary}
            />
          ) : (
            <ListItem.Chevron size={30} />
          )}
        </View>
        {route.params?.useTemplate && (
          <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
            <Text style={[FONTS.BigBold, { color: COLORS.primary }]}>
              Sử dụng
            </Text>
          </TouchableOpacity>
        )}
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={style.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Mẫu kiện hàng'}
      />
      <View
        style={{
          alignSelf: 'flex-end',
          paddingHorizontal: 10,
          display: 'flex',
        }}>
        {check.some(item => item === true) ? (
          <TouchableOpacity
            onPress={() =>
              setCheck(Array.from({ length: data.length }, (_, index) => false))
            }>
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
          <TouchableOpacity
            onPress={() =>
              setCheck(Array.from({ length: data.length }, (_, index) => true))
            }>
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
            <Text>Chưa có lịch sử nhập xuất</Text>
          </View>
        }
      />
      {check.some(item => item === true) ? (
        <View style={{ padding: 20 }}>
          <PillButton
            title="Xoá"
            buttonStyle={{
              backgroundColor: COLORS.danger,
            }}
          />
        </View>
      ) : (
        <View style={{ padding: 20 }}>
          <PillButton
            // ViewComponent={() => (
            //   <View
            //     style={{
            //       backgroundColor: COLORS.primary,
            //       height: 55,
            //       display: 'flex',
            //       flexDirection: 'row',
            //       justifyContent: 'center',
            //       alignItems: 'center',
            //       paddingHorizontal: 100,
            //       paddingVertical: 20,
            //     }}>
            //     <Icon
            //       size={20}
            //       name="add"
            //       color={COLORS.primary}
            //       reverse
            //       reverseColor={COLORS.white}
            //       containerStyle={{
            //         opacity: 0.5,
            //         backgroundColor: '#f2fbff',
            //       }}
            //     />
            //   </View>
            // )}
            title="Thêm mẫu kiện hàng"
            buttonStyle={{
              backgroundColor: COLORS.primary,
            }}
            onPress={() => navigation.navigate('EditPackage', route.params)}
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
    backgroundColor: '#F0F1F5',
    marginVertical: 15,
    flexDirection: 'column',
  },
  time: {
    alignSelf: 'flex-end',
    color: 'rgba(0,0,0,0.5)',
  },
});

export default PackageTemplateList;
