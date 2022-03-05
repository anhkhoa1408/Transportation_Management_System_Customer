import React, { useState, memo } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { container } from '../../../styles/layoutStyle';
import { joinAddress } from '../../../utils/address';
import { COLORS, FONTS } from './../../../styles';

const PackageList = ({ navigation, item, ...props }) => {
  const [data, setData] = useState(item.packages);

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
      {data.map((item, index) => (
        <TouchableOpacity
          activeOpacity={1}
          key={item.id}
          onPress={() => navigation.navigate('EditPackage')}>
          <View key={item.id} style={styles.package}>
            <View style={{ ...styles.vehicle }}>
              <Icon
                containerStyle={styles.icon}
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
                <Text style={{ ...FONTS.BigBold }}>
                  {item.name || 'Chưa có tên'}
                </Text>
                <Text style={{ ...FONTS.Medium }}>
                  Số lượng:{' '}
                  <Text style={{ ...styles.info }}>
                    {item.quantity + ' kiện'}
                  </Text>
                </Text>
                <Text style={{ ...FONTS.Medium }}>
                  Địa điểm hiện tại:{' '}
                  <Text style={{ ...styles.info }}>
                    {joinAddress(item?.current_address)}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default memo(PackageList);

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
  package: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 15,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    elevation: 12,
    shadowColor: COLORS.primary,
  },
  btnOption: {
    marginVertical: 5,
  },
  icon: {
    margin: 0,
    marginRight: 5,
    backgroundColor: '#FFF',
    padding: 15,
    elevation: 5,
    borderRadius: 20,
  },
});
