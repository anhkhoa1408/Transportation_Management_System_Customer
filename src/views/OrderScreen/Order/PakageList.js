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
import { container } from '../../../styles/layoutStyle';
import { COLORS, FONTS } from './../../../styles';

const PackageList = ({ navigation, ...props }) => {
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
    // <ListItem.Accordion
    //   bottomDivider
    //   containerStyle={{
    //     paddingVertical: 20,
    //   }}
    //   activeOpacity={0.95}
    //   content={
    //     <ListItem.Content>
    //       <Text style={{ ...FONTS.BigBold }}>Kiện hàng của bạn</Text>
    //     </ListItem.Content>
    //   }
    //   isExpanded={packageExpand}
    //   onPress={() => {
    //     setPackageExpand(!packageExpand);
    //   }}>
    <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
      {data.map((item, index) => (
        <TouchableOpacity
          activeOpacity={1}
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
                  <Text style={{ ...styles.info }}>{item.quantity}/100</Text>
                </Text>
                <Text style={{ ...FONTS.Medium }}>
                  Địa điểm hiện tại:{' '}
                  <Text style={{ ...styles.info }}>{item.current_address}</Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>

    // </ListItem.Accordion>
  );
};

export default PackageList;

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
