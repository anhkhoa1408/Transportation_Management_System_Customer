import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  Text,
  Icon,
  CheckBox,
  ListItem,
  Rating,
  Avatar,
  Divider,
  Button,
  Overlay,
} from 'react-native-elements';
import { container, header, shadowCard } from '../../styles/layoutStyle';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import {
  backdropColor,
  danger,
  primary,
  success,
  warning,
} from '../../styles/color';
import { COLORS, FONTS } from '../../styles';
import OrderIndicator from '../../components/StepIndicator/OrderIndicator';
import { InfoField } from '../../components/InfoField';
import OrderRating from './OrderRating';

export default function OrderDetail({ navigation }) {
  const [stepExpand, setStepExpand] = useState(true);
  const [infoExpand, setInfoExpand] = useState(true);
  const [packageExpand, setPackageExpand] = useState(false);
  const [option, setOption] = useState(false);
  const [rating, setRating] = useState(false);
  const [data, setData] = useState([
    {
      id: '#FOIJOJOF123',
      quantity: 10,
      current_address: 'kho Hà Nội',
    },
    {
      id: '#FOIJOJOF121',
      quantity: 10,
      current_address: 'kho Hà Nội',
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText="Chi tiết"
      />
      <View
        style={[
          styles.rowContainer,
          { paddingHorizontal: 25, position: 'relative' },
        ]}>
        <Avatar
          size="medium"
          rounded
          source={{
            uri: 'https://res.cloudinary.com/dfnoohdaw/image/upload/v1638692549/avatar_default_de42ce8b3d.png',
          }}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={[FONTS.BigBold]}>Nguyễn Anh Khoa</Text>
          <Text style={[FONTS.Smol]}>SDT: 0909145830</Text>
        </View>
        <Icon
          name="chat"
          color={COLORS.primary}
          size={30}
          containerStyle={{
            padding: 10,
            backgroundColor: '#FFF',
            elevation: 5,
            borderRadius: 15,
            marginRight: 10,
          }}
        />
        <Icon
          size={30}
          name="more-horiz"
          color={COLORS.primary}
          containerStyle={{
            padding: 10,
            backgroundColor: '#FFF',
            elevation: 5,
            borderRadius: 15,
          }}
          onPress={() => setOption(!option)}
        />
        {/* {option && ( */}
        <Overlay
          overlayStyle={{
            position: 'absolute',
            right: 25,
            top: 150,
            zIndex: 9999,
            backgroundColor: COLORS.white,
            elevation: 8,
            paddingHorizontal: 20,
            paddingVertical: 10,
            width: 220,
            // borderRadius: 15,
          }}
          backdropStyle={{
            backgroundColor: backdropColor,
            opacity: 0.4,
          }}
          visible={option}
          onBackdropPress={() => setOption(!option)}>
          <Button
            title="Đánh giá"
            onPress={() => {
              setRating(true);
              setOption(false);
            }}
            containerStyle={[styles.btnOption]}
            buttonStyle={[{ backgroundColor: COLORS.success }]}
          />
          <Button
            title="Chỉnh sửa"
            containerStyle={[styles.btnOption]}
            buttonStyle={[{ backgroundColor: COLORS.warning }]}
          />
          <Button
            title="Huỷ đơn hàng"
            type="outline"
            containerStyle={[styles.btnOption]}
            titleStyle={[{ color: COLORS.danger }]}
            buttonStyle={[{ borderColor: COLORS.danger, borderWidth: 2 }]}
          />
        </Overlay>
      </View>

      <ScrollView nestedScrollEnabled contentContainerStyle={{ padding: 15 }}>
        <Divider width={2} color={COLORS.primary} />
        <ListItem.Accordion
          // bottomDivider
          containerStyle={{
            paddingVertical: 20,
          }}
          activeOpacity={0.95}
          content={
            <ListItem.Content>
              <Text style={{ ...FONTS.BigBold }}>Thông tin đơn hàng</Text>
            </ListItem.Content>
          }
          isExpanded={infoExpand}
          onPress={() => {
            setInfoExpand(!infoExpand);
          }}>
          <View
            style={[
              styles.columnContainer,
              { paddingHorizontal: 15, paddingBottom: 15 },
            ]}>
            <View style={[styles.rowContainer, { paddingRight: 10 }]}>
              <InfoField
                title="Dự kiến"
                content="Thứ 6, 20 tháng 3"
                style={{ flex: 1 }}
              />
              <InfoField
                title="Trạng thái"
                content={
                  <Text style={{ color: COLORS.success, fontWeight: 'bold' }}>
                    Đang vận chuyển
                  </Text>
                }
                style={{ flex: 1 }}
              />
            </View>
            <View style={[styles.rowContainer, { paddingRight: 10 }]}>
              <InfoField
                title="Từ"
                content="183/14 Bùi Viện, Phạm Ngũ Lão, Quận 1"
                style={{ flex: 1 }}
              />
              <InfoField
                title="Người nhận"
                content="Chonky shibe"
                style={{ flex: 1 }}
              />
            </View>
            <View style={[styles.rowContainer, { paddingRight: 10 }]}>
              <InfoField
                title="Đến"
                content="823 Pham Van Dong, Thu Duc"
                style={{ flex: 1 }}
              />
              <InfoField
                title="SDT người nhận"
                content="0909145830"
                style={{ flex: 1 }}
              />
            </View>
            <View style={[styles.rowContainer, { paddingRight: 10 }]}>
              <InfoField
                title="Phí cần trả"
                content="1 000 000 VND"
                style={{ flex: 1 }}
              />
              <InfoField
                title="Tổng trọng lượng"
                content="5000 kg"
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </ListItem.Accordion>

        <Divider width={2} color={COLORS.primary} />

        <ListItem.Accordion
          bottomDivider
          containerStyle={{
            paddingVertical: 20,
          }}
          activeOpacity={0.95}
          content={
            <ListItem.Content>
              <Text style={{ ...FONTS.BigBold }}>Theo dõi đơn hàng</Text>
            </ListItem.Content>
          }
          isExpanded={stepExpand}
          onPress={() => {
            setStepExpand(!stepExpand);
          }}>
          <View style={[styles.rowContainer, { padding: 10 }]}>
            <View style={{ flex: 1 }}>
              <OrderIndicator direction="vertical" current={3} />
            </View>
            <View
              style={[
                styles.columnContainer,
                { alignItems: 'flex-start', marginLeft: 10, flex: 7 },
              ]}>
              <View
                style={[
                  styles.rowContainer,
                  {
                    alignItems: 'flex-start',
                    flex: 1,
                  },
                ]}>
                <Icon
                  name="content-paste"
                  size={40}
                  containerStyle={{ marginRight: 10 }}
                />
                <View style={styles.columnContainer}>
                  <Text style={[FONTS.BigBold, { fontSize: 19 }]}>
                    Đặt hàng
                  </Text>
                  <Text style={FONTS.Smol}>Đơn hàng đã được nhận và xử lý</Text>
                </View>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  { alignItems: 'flex-start', flex: 1 },
                ]}>
                <Icon
                  name="truck"
                  type="feather"
                  size={40}
                  containerStyle={{ marginRight: 10 }}
                />
                <View style={styles.columnContainer}>
                  <Text style={[FONTS.BigBold, { fontSize: 19 }]}>
                    Vận chuyển tới kho
                  </Text>
                  <Text style={FONTS.Smol}>
                    Các kiện hàng đã được chuyển tới kho
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  { alignItems: 'flex-start', flex: 1 },
                ]}>
                <Icon
                  name="truck"
                  type="feather"
                  size={40}
                  containerStyle={{ marginRight: 10 }}
                />
                <View style={styles.columnContainer}>
                  <Text style={[FONTS.BigBold, { fontSize: 19 }]}>
                    Chuyển tới kho trung chuyển
                  </Text>
                  <Text style={[FONTS.Smol, { width: '80%' }]}>
                    Các kiện hàng sẽ tới kho trung chuyển tại Bình Dương
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  { alignItems: 'flex-start', flex: 1 },
                ]}>
                <Icon
                  name="truck"
                  type="feather"
                  size={40}
                  containerStyle={{ marginRight: 10 }}
                />
                <View style={styles.columnContainer}>
                  <Text style={[FONTS.BigBold, { fontSize: 19 }]}>
                    Vận chuyển đến
                  </Text>
                  <Text style={FONTS.Smol}>
                    Các kiện hàng sẽ đến kho tại Hà Nội
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  { alignItems: 'flex-start', flex: 1 },
                ]}>
                <Icon
                  name="airport-shuttle"
                  size={40}
                  containerStyle={{ marginRight: 10 }}
                />
                <View style={styles.columnContainer}>
                  <Text style={[FONTS.BigBold, { fontSize: 19 }]}>
                    Giao hàng
                  </Text>
                  <Text style={FONTS.Smol}>
                    Các kiện hàng sẽ được chuyển đến người nhận
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ListItem.Accordion>

        <ListItem.Accordion
          bottomDivider
          containerStyle={{
            paddingVertical: 20,
          }}
          activeOpacity={0.95}
          content={
            <ListItem.Content>
              <Text style={{ ...FONTS.BigBold }}>Kiện hàng của bạn</Text>
            </ListItem.Content>
          }
          isExpanded={packageExpand}
          onPress={() => {
            setPackageExpand(!packageExpand);
          }}>
          {/* <ScrollView
            nestedScrollEnabled
            contentContainerStyle={{ padding: 10 }}> */}
          {data.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.96}
              key={item.id}
              onPress={() => navigation.navigate('EditPackage')}>
              <View
                key={item.id}
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  marginVertical: 15,
                  borderRadius: 20,
                  backgroundColor: '#FFF',
                  elevation: 2,
                }}>
                <View style={{ ...styles.vehicle }}>
                  <Icon
                    containerStyle={{
                      margin: 0,
                      marginRight: 5,
                      backgroundColor: '#FFF',
                      padding: 15,
                      elevation: 5,
                      borderRadius: 20,
                    }}
                    name="archive"
                    type="font-awesome"
                    color={COLORS.primary}
                  />
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 10,
                      alignItems: 'flex-start',
                    }}>
                    <Text style={{ ...FONTS.BigBold }}>ID: {item.id}</Text>
                    <Text style={{ ...FONTS.Medium }}>
                      Số lượng:{' '}
                      <Text style={{ ...styles.info }}>
                        {item.quantity}/100
                      </Text>
                    </Text>
                    <Text style={{ ...FONTS.Medium }}>
                      Địa điểm hiện tại:{' '}
                      <Text style={{ ...styles.info }}>
                        {item.current_address}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          {/* </ScrollView> */}
        </ListItem.Accordion>
      </ScrollView>

      <OrderRating visible={rating} onSwipeComplete={() => setRating(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
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
  vehicle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  btnOption: {
    marginVertical: 5,
  },
});
