import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import {
  Text,
  Icon,
  Tab,
  TabView,
  ListItem,
  Rating,
} from 'react-native-elements';
import { FONTS, COLORS } from '../../../styles';
import { convertOrderState } from '../../../utils/order';

const Delivered = ({ item, navigation }) => {
  return (
    <TouchableOpacity>
      <ListItem containerStyle={styles.deliveredContainer}>
        <ListItem.Content style={{ flex: 2 }}>
          <ListItem.Title>{item.carId}</ListItem.Title>
          <ListItem.Subtitle style={{ flex: 1 }}>
            {item.dateTime}
          </ListItem.Subtitle>
          <Text
            style={{
              ...FONTS.SmolBold,
              color: COLORS.danger,
            }}>
            Đã giao vào 22 tháng 12
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
              size={30}
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
              Đánh giá
            </Text>
            <Rating type="custom" imageSize={18} tintColor={COLORS.gray} />
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
  },
});
