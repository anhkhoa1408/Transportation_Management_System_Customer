import moment from 'moment';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import { COLORS, FONTS } from './../../../../styles';
import { primary } from './../../../../styles/color';
import { useTranslation } from 'react-i18next';

const Template = ({ check, index, item, navigation, onCheck, route }) => {
  const { t, i18n } = useTranslation("common")
  const useTemplate = route?.params?.useTemplate;
  return (
    <TouchableOpacity
      onLongPress={() => onCheck(index)}
      onPress={() =>
        check.some(item => item === true)
          ? onCheck(index)
          : navigation.navigate('EditPackage', { item, type: 'edit' })
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
            <ListItem.Title>{item.name || t("templateScreen.unnamed")}</ListItem.Title>
            <ListItem.Subtitle>
              {t("templateScreen.dateCreated")+': ' + moment(item.createdAt).format('DD/MM/YYYY')}
            </ListItem.Subtitle>
          </ListItem.Content>
          {check.some(item => item === true) ? (
            <ListItem.CheckBox
              containerStyle={{ alignSelf: 'center' }}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={check[index]}
              checkedColor={primary}
            />
          ) : (
            !useTemplate && <ListItem.Chevron size={30} />
          )}
        </View>
        {useTemplate && (
          <TouchableOpacity
            style={{ alignSelf: 'flex-end' }}
            onPress={() => {
              if (item['size']) {
                delete item['size'].id;
                delete item['size']._id;
                delete item['size'].__v;
              }
              delete item['id'];
              delete item['_id'];
              delete item['__v'];
              navigation.navigate('InputPackage', {
                ...route.params,
                pack: item,
              });
            }}>
            <Text style={[FONTS.BigBold, { color: COLORS.primary }]}>
              {t("templateScreen.use")}
            </Text>
          </TouchableOpacity>
        )}
      </ListItem>
    </TouchableOpacity>
  );
};

export default Template;

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
