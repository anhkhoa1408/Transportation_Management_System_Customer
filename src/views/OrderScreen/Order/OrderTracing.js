import React, { useState, useRef, useEffect, memo } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { COLORS, FONTS } from './../../../styles';
import { container } from '../../../styles/layoutStyle';
import * as Animatable from 'react-native-animatable';
import { convertTracingState } from '../../../utils/order';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const OrderTracing = props => {
  const { t, i18n } = useTranslation('common');
  const stageRef = useRef([]);
  const heightRef = useRef([]);
  const indiRef = useRef([]);
  const { current = 1, trace } = props;

  const [data, setData] = useState([]);

  const [step, setStep] = useState([
    {
      title: t('orderScreen.order'),
      subTitle: t('orderScreen.ordersAreBeingReceivedAndPending'),
      content:
        current >= 1 && current !== 5
          ? t('orderScreen.handle')
          : t('orderScreen.orderProcessing'),
      color: current >= 1 && current !== 5 ? COLORS.success : COLORS.warning,
      icon: current >= 1 && current !== 5 ? 'check-circle' : 'hourglass-bottom',
    },
    {
      title: t('orderScreen.moveToInnerCityWarehouse'),
      subTitle: t('orderScreen.packagesAreBeingPrepared'),
      content:
        current >= 2
          ? t('orderScreen.collect')
          : t('orderScreen.preparingForShipping'),
      color: COLORS.success,
      icon: 'check-circle',
    },
    {
      title: t('orderScreen.delivery'),
      subTitle: t('orderScreen.packagesWillBeDeliveredToRecipientsToday'),
      content: t('orderScreen.readyToDeliver'),
      color: COLORS.success,
      icon: 'check-circle',
    },
    {
      title: t('orderScreen.deliverySccessful'),
      subTitle: t('orderScreen.packagesWillBeDeliveredToTheReceiver'),
      content: t('orderScreen.receivedGoodsSuccessfully'),
      color: COLORS.success,
      icon: 'check-circle',
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
              title: t('orderScreen.transferToTransitWarehouse'),
              subTitle: `${t('orderScreen.packagesAreShippedTo')} ${
                Object.values(trace.tracingResult[index])[0]
              }`,
              content: `${t(
                convertTracingState(trace.tracingResult[index].status),
              )} ${
                Object.values(trace.tracingResult[index])[2]
                  ? '- ' +
                    moment(Object.values(trace.tracingResult[index])[2]).format(
                      'DD/MM/YYYY HH:mm',
                    )
                  : ''
              }`,
              color: [0, 2].includes(trace.tracingResult[index].status)
                ? COLORS.warning
                : COLORS.success,
              icon: [0, 2].includes(trace.tracingResult[index].status)
                ? 'hourglass-bottom'
                : 'check-circle',
            };
          },
        );
        setData([...step.slice(0, 2), ...temp]);
      } else {
        let temp = Array.from(
          { length: trace.tracingResult.length - 1 },
          (item, index) => {
            return {
              title: t('orderScreen.transferToTransitWarehouse'),
              subTitle: `${t('orderScreen.packagesAreBeingShippedTo')} ${
                Object.values(trace.tracingResult[index])[0]
              }`,
              content: `${t(
                convertTracingState(trace.tracingResult[index].status),
              )} ${
                Object.values(trace.tracingResult[index])[2]
                  ? '- ' +
                    moment(Object.values(trace.tracingResult[index])[2]).format(
                      'DD/MM/YYYY HH:mm',
                    )
                  : ''
              }`,
              color: [0, 2].includes(trace.tracingResult[index].status)
                ? COLORS.warning
                : COLORS.success,
              icon: [0, 2].includes(trace.tracingResult[index].status)
                ? 'hourglass-bottom'
                : 'check-circle',
            };
          },
        );
        temp.push({
          title: t('orderScreen.shippingToInnerCityWarehouse'),
          subTitle: `${t('orderScreen.packagesWillArrive')} ${
            Object.values(
              trace.tracingResult[trace.tracingResult.length - 1],
            )[0]
          }`,
          content: `${t(
            convertTracingState(
              trace.tracingResult[trace.tracingResult.length - 1].status,
            ),
          )} - ${moment(
            Object.values(
              trace.tracingResult[trace.tracingResult.length - 1],
            )[2],
          ).format('DD/MM/YYYY HH:mm')}`,
          color: COLORS.success,
          icon: 'check-circle',
        });
        if (current === 4) {
          setData([...step.slice(0, 2), ...temp, ...step.slice(2, 4)]);
        } else {
          setData([...step.slice(0, 2), ...temp, step[2]]);
        }
      }
    } else {
      if (current < 2) setData(step.slice(0, current + 1));
      else if (current === 5)
        setData([
          step[0],
          {
            title: 'Hủy đơn hàng',
            subTitle: 'Đơn hàng đã được người dùng tiến hành hủy',
            content: 'Hủy đơn hàng thành công',
            icon: 'cancel',
            color: COLORS.danger,
          },
        ]);
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
                    <Icon name={data[index].icon} color={data[index].color} />
                    <Text
                      style={[
                        FONTS.BigBold,
                        { color: data[index].color, marginLeft: 10 },
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
