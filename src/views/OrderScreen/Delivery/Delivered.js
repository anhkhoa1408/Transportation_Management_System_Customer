import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon, ListItem, Rating } from 'react-native-elements';
import { FONTS, COLORS } from '../../../styles';
import { convertOrderState } from '../../../utils/order';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const Delivered = ({ item, navigation }) => {
  const { t, i18n } = useTranslation('common');
  return (
    <TouchableOpacity
      onPress={(e) =>
       {
        navigation.navigate('OrderDetail', {
          item,
        })
       }
      }>
      <ListItem containerStyle={styles.deliveredContainer}>
        <ListItem.Content style={{ flex: 2 }}>
          <ListItem.Title style={[FONTS.Big]}>
            {item.name || item.id || t('orderScreen.noName')}
          </ListItem.Title>
          <ListItem.Subtitle style={{ flex: 1, marginTop: 3 }}>
            {t('orderScreen.order')}:{' '}
            {moment(item.createdAt).format('DD/MM/YYYY')}
          </ListItem.Subtitle>
          <Text
            style={{
              ...FONTS.SmolBold,
              color: item.state === 5 ? COLORS.danger : COLORS.success,
            }}>
            {item.state !== 5
              ? t('orderScreen.deliveredIn') +
                ' ' +
                moment(item.updatedAt).format('DD/MM/YYYY')
              : t('utils.canceled')}{' '}
          </Text>
        </ListItem.Content>

        <ListItem.Content
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-end',
          }}>
          <View style={{ flex: 1 }}>
            <Icon
              size={22}
              name="inventory"
              iconStyle={{
                color: '#FFF',
              }}
              containerStyle={styles.wrapperIcon}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={[
                FONTS.Smol,
                { marginRight: 10, color: 'rgba(0,0,0,0.5)' },
              ]}>
              {t('orderScreen.rate')}
            </Text>

            <Rating
              readonly
              type="custom"
              startingValue={item.rating_point || 0}
              imageSize={18}
              tintColor={COLORS.gray}
            />
          </View>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default memo(Delivered);

const styles = StyleSheet.create({
  wrapperIcon: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 25,
  },
  deliveredContainer: {
    padding: 20,
    height: 120,
    marginHorizontal: 20,
    borderRadius: 12,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: COLORS.gray,
    marginVertical: 15,
    display: 'flex',
    zIndex: 99999
  },
});
