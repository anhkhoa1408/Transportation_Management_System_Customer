import React, { useState, useRef, useEffect, memo } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { COLORS, FONTS } from './../../../styles';
import { container } from '../../../styles/layoutStyle';
import * as Animatable from 'react-native-animatable';
import { convertTracingState } from '../../../utils/order';
import moment from 'moment';

const OrderTracing = props => {
  const stageRef = useRef([]);
  const heightRef = useRef([]);
  const indiRef = useRef([]);
  const { current = 1, trace } = props;

  const [data, setData] = useState([]);

  const [step, setStep] = useState([
    {
      title: 'Đặt hàng',
      subTitle: 'Đơn hàng đã được nhận và xử lý',
      content: 'Tiến hành lấy hàng',
    },
    {
      title: 'Chuyển tới kho nội thành',
      subTitle: 'Các kiện hàng đang được chuẩn bị',
      content: 'Chuẩn bị vận chuyển',
    },
    {
      title: 'Giao hàng',
      subTitle: 'Các kiện hàng sẽ được chuyển đến người nhận vào hôm nay',
      content: 'Sẵn sàng giao hàng',
    },
    {
      title: 'Giao hàng thành công',
      subTitle: 'Các kiện hàng sẽ được chuyển đến người nhận',
      content: 'Nhận hàng thành công',
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

  useEffect(() => {
    if (
      trace &&
      trace.tracingResult &&
      Array.isArray(trace.tracingResult) &&
      trace.tracingResult.length
    ) {
      if (!trace.lastStage) {
        let temp = Array.from(
          { length: trace.tracingResult.length },
          (item, index) => {
            return {
              title: 'Chuyển tới kho trung chuyển',
              subTitle: `Các kiện hàng được trung chuyển đến ${
                Object.values(trace.tracingResult[index])[0]
              }`,
              content: `${convertTracingState(
                trace.tracingResult[index].status,
              )} - ${moment(
                Object.values(trace.tracingResult[index])[2],
              ).format('DD/MM/YYYY HH:mm')}`,
            };
          },
        );
        setData([...step.slice(0, 2), ...temp]);
      } else {
        let temp = Array.from(
          { length: trace.tracingResult.length - 1 },
          (item, index) => {
            return {
              title: 'Chuyển tới kho trung chuyển',
              subTitle: `Các kiện hàng đang được trung chuyển đến ${
                Object.values(trace.tracingResult[index])[0]
              }`,
              content: `${convertTracingState(
                trace.tracingResult[index].status,
              )} - ${moment(
                Object.values(trace.tracingResult[index])[2],
              ).format('DD/MM/YYYY HH:mm')}`,
            };
          },
        );
        temp.push({
          title: 'Vận chuyển đến kho nội thành',
          subTitle: `Các kiện hàng sẽ đến ${
            Object.values(
              trace.tracingResult[trace.tracingResult.length - 1],
            )[0]
          }`,
          content: `${convertTracingState(
            trace.tracingResult[trace.tracingResult.length - 1].status,
          )} - ${moment(
            Object.values(
              trace.tracingResult[trace.tracingResult.length - 1],
            )[2],
          ).format('DD/MM/YYYY HH:mm')}`,
        });
        setData([...step.slice(0, 2), ...temp, step[2]]);
      }
    } else {
      if (current <= 2) setData(step.slice(0, current));
    }
  }, [trace]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.columnContainer,
        { alignItems: 'flex-start', paddingHorizontal: 0, paddingBottom: 25 },
      ]}>
      {Array.from({ length: data?.length }, (_, index) => (
        <View key={index} style={{ alignItems: 'flex-start' }}>
          <Animatable.View
            delay={index * 1300}
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
                  height: 105,
                  marginRight: 20,
                }}>
                <Icon
                  size={20}
                  color={COLORS.header}
                  name="fiber-manual-record"
                  containerStyle={{ alignSelf: 'flex-start' }}
                />
                {index !== data.length - 1 && (
                  <Animatable.View
                    style={{
                      borderColor: COLORS.header,
                      borderWidth: 1,
                      borderStyle: 'dashed',
                    }}
                    ref={ele => (heightRef[index] = ele)}
                    delay={index * 1600}
                    animation={heightAnimate}
                  />
                )}
              </View>

              <View style={{ width: '85%' }}>
                <Text style={[FONTS.BigBold, { marginBottom: 5 }]}>
                  {data[index]?.title}
                </Text>
                <Text style={[FONTS.Big]}>{data[index]?.subTitle}</Text>
                {data[index]?.content && (
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Icon name="check-circle" color={COLORS.success} />
                    <Text
                      style={[
                        FONTS.BigBold,
                        { color: COLORS.success, marginLeft: 10 },
                      ]}>
                      {data[index]?.content}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </Animatable.View>
          {index !== data.length - 1 && (
            <Animatable.View
              ref={ele => (indiRef[index] = ele)}
              animation="fadeOut"
              delay={index * 1300}>
              <ActivityIndicator color={COLORS.header} />
            </Animatable.View>
          )}
        </View>
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