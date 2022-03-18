import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { Avatar, ListItem, Icon, Divider, Button } from 'react-native-elements';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Header from '../../components/Header';
import { container } from '../../styles/layoutStyle';
import img from './../../assets/images/icon.png';
import { danger, primary } from '../../styles/color';

const NotificationScreen = ({ navigation }) => {
  const appList = [
    {
      id: 1,
      title: 'Shober of Justice',
      subTitle: 'Bạn có tin nhắn mới từ khách hàng',
      type: 'chat',
      time: '09:45 sáng',
      content: 'Hãy giao cho tôi vào lúc 11h sáng',
    },
    {
      id: 2,
      title: 'Hệ thống',
      subTitle: 'Bạn có đơn vận chuyển mới',
      type: 'delivery',
      time: '09:46 sáng',
    },
    {
      id: 3,
      title: 'Hệ thống',
      subTitle: 'Bạn có đơn vận chuyển mới',
      type: 'delivery',
      time: '09:46 sáng',
    },
    {
      id: 4,
      title: 'Hệ thống',
      subTitle: 'Bạn có đơn vận chuyển mới',
      type: 'delivery',
      time: '09:46 sáng',
    },
    {
      id: 5,
      title: 'Uchiha',
      subTitle: 'Bạn có tin nhắn mới từ khách hàng',
      type: 'chat',
      time: '09:45 sáng',
      content: 'Hãy giao cho tôi vào lúc 11h sáng',
    },
    {
      id: 6,
      title: 'Uchiha',
      subTitle: 'Bạn có đơn vận chuyển mới',
      type: 'chat',
      time: '09:45 sáng',
      content: 'Hãy giao cho tôi vào lúc 11h sáng',
    },
    {
      id: 7,
      title: 'Shober of Justice',
      subTitle: 'Bạn có tin nhắn mới từ khách hàng',
      type: 'chat',
      time: '09:45 sáng',
      content: 'Hãy giao cho tôi vào lúc 11h sáng',
    },
    {
      id: 8,
      title: 'Hệ thống',
      subTitle: 'Bạn có đơn vận chuyển mới',
      type: 'delivery',
      time: '09:46 sáng',
    },
    {
      id: 9,
      title: 'Hệ thống',
      subTitle: 'Bạn có đơn vận chuyển mới',
      type: 'delivery',
      time: '09:46 sáng',
    },
    {
      id: 10,
      title: 'Hệ thống',
      subTitle: 'Bạn có đơn vận chuyển mới',
      type: 'delivery',
      time: '09:48 sáng',
    },
  ];

  const [count, setCount] = useState(5);
  const [data, setData] = useState(appList.slice(0, count));
  const [deleteData, setDeleteData] = useState(appList);
  const [refreshing, setRefreshing] = useState(false);

  const ref = useRef();

  const keyExtractor = (item, index) => item.id;

  const handleShowMore = () => {
    if (count <= appList.length - 3) {
      setCount(count + 3);
    } else {
      setCount(count + appList.length - data.length);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
    // setTimeout(
    //   () =>
    //     ref.current.scrollToIndex({
    //       index: 0,
    //       animated: true,
    //     }),
    //   500,
    // );
  }, [data]);

  const handleDeleteNotify = id => {
    let newData = deleteData.filter((item, index) => item.id !== id);
    setDeleteData(newData);
    setData(newData.slice(0, count));
  };

  useEffect(() => {
    setData(appList.slice(0, count));
  }, [count]);

  const renderItem = ({ item, index }) => {
    return (
      <ListItem.Swipeable
        containerStyle={{
          width: '100%',
          display: 'flex',
          paddingVertical: 20,
        }}
        rightContent={
          <Button
            onPress={() => handleDeleteNotify(item.id)}
            title="Xoá"
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
          />
        }
        bottomDivider>
        <ListItem.Content>
          {item.type === 'chat' ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Avatar
                containerStyle={[styles.icon]}
                source={img}
                rounded
                size="medium"
              />
              <View style={{ flex: 1, paddingHorizontal: 5 }}>
                <ListItem.Title style={[styles.title]}>
                  {item.title}
                </ListItem.Title>
                <ListItem.Subtitle style={{ marginBottom: 15 }}>
                  {item.subTitle}
                </ListItem.Subtitle>
                <Text style={[styles.content]}>{`"${item.content}"`}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SendMessage')}>
                  <Text style={[styles.highlightText]}>Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={[styles.highlightText]}>{item.time}</Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Icon
                containerStyle={[{ margin: 0 }, styles.icon]}
                reverse
                reverseColor="#FFF"
                color={primary}
                size={25}
                name="package"
                type="feather"
              />
              <View style={{ flex: 1 }}>
                <ListItem.Title style={[styles.title]}>
                  {item.title}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={[{ marginBottom: 15 }, styles.subTitle]}>
                  {item.subTitle}
                </ListItem.Subtitle>
                <TouchableOpacity
                  onPress={() => navigation.navigate('OrderDetail')}>
                  <Text style={[styles.highlightText]}>Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={[styles.highlightText]}>{item.time}</Text>
              </View>
            </View>
          )}
        </ListItem.Content>
      </ListItem.Swipeable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText="Thông báo"
        rightElement={
          <TouchableOpacity
            onPress={() => {
              setData([]);
              setDeleteData([]);
            }}>
            <Icon name="delete" color={danger} />
          </TouchableOpacity>
        }
      />
      <Divider />
      <FlatList
        ref={ref}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        persistentScrollbar={true}
        refreshing
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onContentSizeChange={() => ref.current.scrollToEnd({ animated: true })}
        onScrollBeginDrag={() => ref.current.flashScrollIndicators()}
        ListFooterComponent={() =>
          deleteData.length > 3 &&
          count < deleteData.length && (
            <View>
              <Icon name="more-horiz" color={primary} size={30} />
              <Button
                title={`Xem thêm (${deleteData.length - count})`}
                buttonStyle={{ backgroundColor: primary }}
                onPress={handleShowMore}
              />
            </View>
          )
        }
      />
      {/* {deleteData.length > 3 && count < deleteData.length && (
       
      )} */}
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
  },
  icon: {
    marginRight: 15,
  },
  highlightText: { color: primary, fontWeight: 'bold', fontSize: 16 },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  subTitle: {
    color: 'rgba(0,0,0,0.5)',
  },
  content: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 10,
  },
});
