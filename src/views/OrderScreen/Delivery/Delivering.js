import React, { memo } from 'react';
import { View, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Text, Icon, ListItem } from 'react-native-elements';
import { FONTS, COLORS } from '../../../styles';
import { convertOrderState, mapStateToStyle } from '../../../utils/order';
import OrderIndicator from '../../../components/StepIndicator/OrderIndicator';
import { useTranslation } from 'react-i18next';

const Delivering = ({ item, navigation }) => {
  const { t, i18n } = useTranslation("common")
  const { color } = mapStateToStyle(item.state)
  return (
    <TouchableHighlight
      underlayColor={COLORS.gray}
      onPress={() =>
        navigation.navigate('OrderDetail', {
          item,
        })
      }>
      <ListItem containerStyle={styles.deliveringContainer}>
        <ListItem.Content
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 20,
            alignItems: 'flex-start',
          }}>
          <View>
            <Icon
              size={25}
              name="inventory"
              iconStyle={{
                color: '#FFF',
              }}
              containerStyle={[
                styles.wrapperIcon,
                {
                  marginRight: 10,
                },
              ]}
            />
          </View>
          <ListItem.Content style={{ flex: 1 }}>
            <Text style={[FONTS.BigBold]}>{item?.name || t("orderScreen.unnamed")}</Text>
            <Text style={[FONTS.SmolBold, { color: color }]}>
              {t(convertOrderState(item.state))}
            </Text>
          </ListItem.Content>
          <View>
            <Icon
              size={25}
              name="check-circle"
              iconStyle={{
                color: COLORS.success,
              }}
            />
          </View>
        </ListItem.Content>

        <View style={{ width: '110%', alignSelf: 'center' }}>
          <OrderIndicator
            current={item.state}
            // name={item?.packages[0]?.current_address?.city}
          />
        </View>
      </ListItem>
    </TouchableHighlight>
  );
};

export default memo(Delivering);

const styles = StyleSheet.create({
  wrapperIcon: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 25,
  },
  deliveringContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#FFF',
    marginVertical: 15,
    display: 'flex',
    flexDirection: 'column',
    elevation: 10,
    zIndex: -99,
    shadowColor: COLORS.primary,
  },
});
