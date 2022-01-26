import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  MaskedViewComponent,
} from 'react-native';
import { Text, ListItem, Icon, CheckBox, Avatar } from 'react-native-elements';
import CustomSearch from '../../components/CustomSearch/CustomSearch';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import { primary, danger } from '../../styles/color';
import { COLORS } from '../../styles';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

const VoucherScreen = ({ navigation }) => {
  const [data, setData] = useState([
    {
      id: '#afoqijfoasdada'.toLocaleUpperCase(),
      discount: '10%',
      title: 'Cho kiện hàng có khối lượng trên 1000kg',
      expire: '20/12/2022',
    },
    {
      id: '#bmiweopkrejgoi'.toLocaleUpperCase(),
      discount: '10%',
      title: 'Cho kiện hàng có khối lượng trên 1000kg',
      expire: '20/12/2022',
    },
    {
      id: '#opkopjqwoiasdd'.toLocaleUpperCase(),
      discount: '10%',
      title: 'Cho kiện hàng có khối lượng trên 1000kg',
      expire: '20/12/2022',
    },
    {
      id: '#fmppoekpokrope'.toLocaleUpperCase(),
      discount: '10%',
      title: 'Cho kiện hàng có khối lượng trên 1000kg',
      expire: '20/12/2022',
    },
  ]);

  const ref = useRef([]);

  const handlePress = async index => {
    await ref[index].animate({
      0: {
        scale: 1,
      },
      0.5: {
        scale: 0.9,
      },
      1: {
        scale: 1,
      },
    });
  };

  const renderItem = ({ item, index }) => (
    <Animatable.View
      ref={ele => (ref[index] = ele)}
      duration={500}
      easing="ease">
      <TouchableWithoutFeedback onPress={() => handlePress(index)}>
        <ListItem containerStyle={style.storeItem}>
          <ListItem.Content
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flex: 1 }}>
              <MaskedView
                maskElement={
                  <Text style={[style.discountText]}>Giảm {item.discount}</Text>
                }>
                <LinearGradient
                  colors={['#EF3D3D', '#FFB800']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text style={[style.discountText, { opacity: 0 }]}>
                    Giảm {item.discount}
                  </Text>
                </LinearGradient>
              </MaskedView>
              <ListItem.Subtitle style={{ width: '75%' }}>
                {item.title}
              </ListItem.Subtitle>
            </View>
            <Avatar
              size="medium"
              source={{
                uri: 'https://res.cloudinary.com/dfnoohdaw/image/upload/v1638692549/avatar_default_de42ce8b3d.png',
              }}
            />
          </ListItem.Content>
          <ListItem.Subtitle
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
              color: primary,
              fontWeight: 'bold',
            }}>
            Đến {item.expire}
          </ListItem.Subtitle>
        </ListItem>
      </TouchableWithoutFeedback>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={style.container}>
      <Header headerText={'Voucher của bạn'} />

      <View style={{ width: '100%', paddingHorizontal: 10, display: 'flex' }}>
        <CustomSearch />
      </View>

      <FlatList
        contentContainerStyle={{ paddingVertical: 20 }}
        style={{
          alignSelf: 'stretch',
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
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: { ...container },
  storeItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: '#F0F1F5',
    marginVertical: 15,
  },
  chatList: {
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'rgba(0,0,0,0.5)',
  },
  discountText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default VoucherScreen;
