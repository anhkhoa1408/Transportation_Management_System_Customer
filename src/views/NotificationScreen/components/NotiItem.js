import React from 'react';
import { ListItem } from 'react-native-elements';
import { primary } from '../../../styles/color';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import NotiIcon from './NotiIcon';

const NotiItem = ({ item, navigation }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <NotiIcon type={item.type} icon={item.icon} />
      <View style={{ flex: 1, paddingHorizontal: 5 }}>
        <View style={styles.notiHeader}>
          <ListItem.Title style={[styles.title]}>{item.title}</ListItem.Title>
          <Text style={[styles.highlightText]}>{item.time}</Text>
        </View>
        {item.content && <ListItem.Subtitle>{item.subTitle}</ListItem.Subtitle>}
        <Text style={[styles.content]}>
          {item.content ? `"${item.content}"` : item.subTitle}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SendMessage')}>
          <Text style={[styles.highlightText]}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotiItem;

const styles = StyleSheet.create({
  notiHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  highlightText: {
    color: primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subTitle: {
    color: 'rgba(0,0,0,0.5)',
  },
  content: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 10,
  },
});
