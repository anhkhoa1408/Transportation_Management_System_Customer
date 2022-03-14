import moment from 'moment';
import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import { COLORS, FONTS } from '../../../../styles';

const Template = ({ check, index, item, navigation, onCheck, route }) => {
  const useTemplate = route?.params?.useTemplate;
  return (
    <TouchableOpacity
      onLongPress={() => onCheck(index)}
      onPress={() =>
        check.some(item => item === true)
          ? onCheck(index)
          : navigation.navigate('EditOrderInfo', {
              item,
              action: 'update',
            })
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
            <ListItem.Title>{item.name || 'Chưa đặt tên'}</ListItem.Title>
            <ListItem.Subtitle>
              Ngày tạo: {moment(item.createdAt).format('DD/MM/YYYY')}
            </ListItem.Subtitle>
          </ListItem.Content>
          {check.some(item => item === true) ? (
            <ListItem.CheckBox
              containerStyle={{ alignSelf: 'center' }}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={check[index]}
              checkedColor={COLORS.primary}
            />
          ) : (
            !useTemplate && <ListItem.Chevron size={30} />
          )}
        </View>
        {useTemplate && (
          <TouchableOpacity
            style={{ alignSelf: 'flex-end' }}
            onPress={() => {
              if (item['from_address']) {
                delete item['from_address'].id;
                delete item['from_address']._id;
                delete item['from_address'].__v;
              }
              if (item['to_address']) {
                delete item['to_address'].id;
                delete item['to_address']._id;
                delete item['to_address'].__v;
              }
              console.log(JSON.stringify(item));
              navigation.navigate('InputPackage', {
                ...item,
              });
            }}>
            <Text style={[FONTS.BigBold, { color: COLORS.primary }]}>
              Sử dụng
            </Text>
          </TouchableOpacity>
        )}
      </ListItem>
    </TouchableOpacity>
  );
};

export default memo(Template);

const style = StyleSheet.create({
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
