import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ListItem, Icon, Divider, Button } from 'react-native-elements';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Header from '../../components/Header';
import { container } from '../../styles/layoutStyle';
import { danger, primary } from '../../styles/color';
import { connect } from 'react-redux';
import NotiItem from './components/NotiItem';
import { cleanNotification, removeNotification } from '../../actions/actions';
import { useTranslation } from 'react-i18next';

const NotificationScreen = props => {
  const { t, i18n } = useTranslation("common")
  const { noties, navigation } = props;

  const [count, setCount] = useState(5);
  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);

  const ref = useRef();

  const keyExtractor = (item, index) => index.toString();

  const handleShowMore = () => {
    // if (count <= appList.length - 3) {
    //   setCount(count + 3);
    // } else {
    //   setCount(count + appList.length - data.length);
    // }
  };

  useEffect(() => {
    setData(Object.values(noties).sort((a, b) => b.sentTime - a.sentTime));
  }, [noties]);

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
            onPress={() => {
              props.removeNoti(item.id);
            }}
            title={t("notificationScreen.delete")}
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
          />
        }
        bottomDivider>
        <ListItem.Content>
          <NotiItem item={item} navigation={navigation} />
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
        headerText={t("notificationScreen.notify")}
        rightElement={
          <TouchableOpacity
            onPress={() => {
              props.cleanNoti();
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
        // onContentSizeChange={() => ref.current.scrollToEnd({ animated: true })}
        onScrollBeginDrag={() => ref.current.flashScrollIndicators()}
        ListFooterComponent={() =>
          deleteData.length > 3 &&
          count < deleteData.length && (
            <View>
              <Icon name="more-horiz" color={primary} size={30} />
              <Button
                title={`${t("notificationScreen.seeMore")} (${deleteData.length - count})`}
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

const mapStateToProps = state => ({
  noties: state.notification,
});

const mapDispatchToProps = dispatch => ({
  cleanNoti: () => dispatch(cleanNotification()),
  removeNoti: id => dispatch(removeNotification(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);

const styles = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
  },
});
