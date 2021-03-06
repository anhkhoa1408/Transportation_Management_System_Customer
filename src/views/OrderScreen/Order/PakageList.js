import React, { useState, memo } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { container } from '../../../styles/layoutStyle';
import { joinAddress, simplifyString } from '../../../utils/address';
import { COLORS, FONTS } from './../../../styles';
import { useTranslation } from 'react-i18next';

const PackageList = ({ navigation, item, trace, ...props }) => {
  const { t, i18n } = useTranslation('common');
  const [data, setData] = useState(item.packages || []);

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
      {data.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.5}
          key={item.id}
          onPress={() => {
            navigation.navigate('PackageMap', {
              trace,
              id: item.id,
            });
          }}>
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
                  {item.name || t('orderScreen.unnamed')}
                </Text>
                <Text style={{ ...FONTS.Medium }}>
                  {t('orderScreen.quantity')}:{' '}
                  <Text style={{ ...styles.info }}>
                    {item.quantity + t('orderScreen.package')}
                  </Text>
                </Text>
                <Text style={{ ...FONTS.Medium }}>
                  {t('orderScreen.currentLocation')}:{' '}
                  <Text style={{ ...styles.info }}>
                    {item?.current_address &&
                      simplifyString(joinAddress(item?.current_address), 20)}
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
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    elevation: 10,
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
    shadowColor: COLORS.primary,
    borderRadius: 20,
  },
});
