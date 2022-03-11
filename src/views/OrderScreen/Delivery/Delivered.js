import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon, ListItem, Rating } from 'react-native-elements';
import { FONTS, COLORS } from '../../../styles';
import { convertOrderState } from '../../../utils/order';
import moment from 'moment';

const Delivered = ({ item, navigation }) => {
  console.log(JSON.stringify(item));
  return (
    // <TouchableOpacity>
    <ListItem containerStyle={styles.deliveredContainer}>
      <ListItem.Content style={{ flex: 2 }}>
        <ListItem.Title style={[FONTS.Big]}>
          {item.name || item.id || 'Không có tên'}
        </ListItem.Title>
        <ListItem.Subtitle style={{ flex: 1, marginTop: 3 }}>
          Đặt hàng: {moment(item.createdAt).format('DD/MM/YYYY')}
        </ListItem.Subtitle>
        <Text
          style={{
            ...FONTS.SmolBold,
            color: COLORS.success,
          }}>
          Đã giao vào {moment(item.updatedAt).format('DD/MM/YYYY')}
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
            style={[FONTS.Smol, { marginRight: 10, color: 'rgba(0,0,0,0.5)' }]}>
            Đánh giá
          </Text>
          <Rating
            readonly
            type="custom"
            startingValue={item?.rating_point}
            imageSize={18}
            tintColor={COLORS.gray}
          />
        </View>
      </ListItem.Content>
    </ListItem>
    // </TouchableOpacity>
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
  },
});
