import React, { useState, useRef, useEffect, memo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Text, Icon, Button } from 'react-native-elements';
import { COLORS, FONTS } from './../../../styles';
import { container } from '../../../styles/layoutStyle';
import OrderIndicator from '../../../components/StepIndicator/OrderIndicator';
import * as Animatable from 'react-native-animatable';

const OrderTracing = props => {
  const stageRef = useRef([]);
  const heightRef = useRef([]);
  const indiRef = useRef([]);
  const { current = 2, index } = props;
  const [stage, setStage] = useState(current);
  const [data, setData] = useState([
    {
      title: 'Đặt hàng',
      subTitle: 'Đơn hàng đã được nhận và xử lý',
      content: 'Nhân viên đang đến lấy hàng',
    },
    {
      title: 'Vận chuyển tới kho',
      subTitle: 'Các kiện hàng đã được chuyển tới',
      content: 'An toàn để vận chuyển',
    },
    {
      title: 'Chuyển tới kho trung chuyển',
      subTitle: 'Các kiện hàng sẽ tới kho trung chuyển tại Bình Dương',
      content: 'Nhập kho thành công',
    },
    {
      title: 'Vận chuyển đến',
      subTitle: 'Các kiện hàng sẽ đến kho tại Hà Nội',
      content: 'Nhập kho thành công',
    },
    {
      title: 'Giao hàng',
      subTitle: 'Các kiện hàng sẽ được chuyển đến người nhận vào hôm nay',
      content: 'Sẵn sàng giao hàng',
    },
  ]);

  const heightAnimate = {
    from: {
      height: '0%',
    },
    to: {
      height: '100%',
    },
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.columnContainer,
        { alignItems: 'flex-start', paddingHorizontal: 5, paddingBottom: 25 },
      ]}>
      {Array.from({ length: current }, (_, index) => (
        <>
          <Animatable.View
            delay={index * 1500}
            animation="fadeIn"
            easing={'linear'}
            ref={ele => (stageRef[index] = ele)}
            key={index * Math.random() * 100}
            style={styles.rowContainer}>
            <View style={styles.rowContainer}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: 100,
                  marginRight: 20,
                }}>
                <Icon
                  size={20}
                  color={COLORS.header}
                  name="fiber-manual-record"
                  containerStyle={{ alignSelf: 'flex-start' }}
                />
                {index !== current - 1 && (
                  <Animatable.View
                    style={{
                      borderColor: COLORS.header,
                      borderWidth: 1,
                    }}
                    ref={ele => (heightRef[index] = ele)}
                    delay={index * 1500}
                    animation={heightAnimate}
                  />
                )}
              </View>

              <View style={{ width: '80%' }}>
                <Text style={[FONTS.BigBold, { marginBottom: 5 }]}>
                  {data[index].title}
                </Text>
                <Text style={[FONTS.Big]}>{data[index].subTitle}</Text>
                {data[index].content && (
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Icon name="check-circle" color={COLORS.success} />
                    <Text
                      style={[
                        FONTS.BigBold,
                        { color: COLORS.success, marginLeft: 10 },
                      ]}>
                      {data[index].content}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </Animatable.View>
          {index !== current - 1 && (
            <Animatable.View
              ref={ele => (indiRef[index] = ele)}
              animation="fadeOut"
              delay={index * 1400}>
              <ActivityIndicator color={COLORS.header} />
            </Animatable.View>
          )}
        </>
      ))}
    </ScrollView>
  );
};

export default memo(OrderTracing);

const styles = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'stretch',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  vehicle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  btnOption: {
    marginVertical: 5,
  },
});
