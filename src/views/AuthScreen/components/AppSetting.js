import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, ListItem, Switch } from 'react-native-elements';
import { COLORS, FONTS } from '../../../styles';
import { success } from '../../../styles/color';
import { container } from '../../../styles/layoutStyle';

function AppSetting({ item, toggleSwitch }) {
  return (
    <View style={{ width: '100%' }}>
      <ListItem
        containerStyle={{
          width: '100%',
          display: 'flex',
          paddingVertical: 15,
        }}
        bottomDivider>
        <View
          style={{
            backgroundColor: item.neutral,
            padding: 10,
            borderRadius: 12,
          }}>
          <Icon name={item.icon} color={item.color} size={22} />
        </View>
        <ListItem.Title
          style={[
            FONTS.Medium,
            {
              flex: 1,
              marginLeft: 10,
            },
          ]}>
          {item.title}
        </ListItem.Title>

        <View
          style={
            item.state
              ? [styles.switchContainer, styles.switchOn]
              : [styles.switchContainer, styles.switchOff]
          }>
          <Switch
            onValueChange={e => toggleSwitch(e, item)}
            thumbColor="#FFF"
            trackColor={{ false: COLORS.gray, true: success }}
            value={item.state}
          />
        </View>
      </ListItem>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
  },
  scrollContainer: {
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginTop: 30,
    marginHorizontal: 15,
    elevation: 15,
    shadowColor: COLORS.primary,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  smallText: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  editBtn: {
    marginVertical: 20,
    marginRight: 20,
    fontSize: 20,
    color: COLORS.primary,
  },
  statusText: {
    color: success,
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionText: {
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  switchOn: {
    backgroundColor: success,
  },
  switchOff: {
    backgroundColor: COLORS.gray,
  },
});

export default AppSetting;
